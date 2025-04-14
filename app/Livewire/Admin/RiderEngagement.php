<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\User;
use App\Models\order;
use App\Models\Stock;
use App\Models\AsignedVehicle;
use App\Models\UserKycLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;


class RiderEngagement extends Component
{
    use WithPagination;

    public $search = '';
    public $remarks,$field,$document_type,$id,$vehicle_model;
    public $active_tab = 1;
    public $vehicles = [];
    public $customers = [];
    public $selectedCustomer = null; // Stores the selected customer data
    public $isModalOpen = false; // Track modal visibility
    public $isRejectModal = false;
    public $isAssignedModal = false;
    public $isExchangeModal = false;
    public $closeAssignedtModal = false;
    public $isPreviewimageModal = false;
    public $targetRiderId;
    public $targetOrderId;
    public $preview_front_image, $preview_back_image;

    /**
     * Search button click handler to reset pagination.
     */
    public function mount(){

    }
    public function btn_search()
    {
        $this->resetPage(); // Reset to the first page
    }
    public function updateLog($status,$field,$document_type,$id){
        $user = User::find($id);
        if (!$user) {
            session()->flash('modal_message', 'User not found.');
            return false;
        }

        // Check if the provided field exists in the User model
        if (!Schema::hasColumn('users', $field)) {
            session()->flash('modal_message', 'Invalid field name.');
            return false;
        }
        $remarks = null;
        $message = $document_type." is successfully verified for KYC.";
        if($status==3){
            if(empty($this->remarks)){
                session()->flash('remarks', 'Please enter a remark for the rejection reason.');
                return false;
            }
            $remarks = $this->remarks;
            $message = $document_type." has been rejected. Please upload a valid document.";
        }

        $log = UserKycLog::create([
            'user_id' => $user->id,
            'document_type' => $document_type,
            'status' => $status,
            'remarks' => $remarks,
            'message' => $message,
            'created_by' => Auth::guard('admin')->user()->id, // Corrected Auth syntax
        ]);
        // Update the field value and save
        $user->$field = $status;
        $user->save();
        $this->showCustomerDetails($user->id);
        $this->closeRejectModal();
        session()->flash('modal_message', 'Status updated successfully.');
    }

    public function OpenRejectForm($field, $document_type, $id)
    {
        $this->field = $field;
        $this->document_type = $document_type;
        $this->id = $id; // Changed from $this->id to avoid conflicts
        $this->isRejectModal = true;
    }
    public function OpenAssignedForm($rider_id,$product_id,$order_id)
    {
        $this->targetRiderId = $rider_id;
        $this->targetOrderId = $order_id;
        $this->vehicles = Stock::whereDoesntHave('assignedVehicle')->where('product_id', $product_id)->orderBy('vehicle_number')->get();
        $this->isAssignedModal = true;
    }
    public function OpenExchangeForm($rider_id,$product_id,$order_id,$vehicle_number)
    {
        $this->targetRiderId = $rider_id;
        $this->targetOrderId = $order_id;
        $this->vehicles = Stock::where('product_id', $product_id)
        ->where('vehicle_number', '!=', $vehicle_number)
        ->whereDoesntHave('assignedVehicle')
        ->orderBy('vehicle_number')
        ->get();
        $this->isExchangeModal = true;
    }

    public function closeExchangeModal()
    {
        $this->isExchangeModal = false;
        $this->reset(['vehicle_model']);
    }

    public function updateAssignRider(){
        try {
            if (!$this->vehicle_model) {
                session()->flash('assign_error', 'Please select vehicle model first.');
                    return false;
            }
            $assignRider = AsignedVehicle::where('order_id', $this->targetOrderId)->first();
            if ($assignRider) {
                session()->flash('assign_error', 'Sorry! A vehicle has already been assigned for this rider.');
                return false;
            }

            $order = Order::find($this->targetOrderId);
           
            if (!$order) {
                session()->flash('assign_error', 'Sorry! Something went wrong. Please reload the page and try again.');
                return false;
            }
            if (!$order->rent_duration) {
                session()->flash('assign_error', 'Sorry! Rent duration not found. Please set the rent duration before proceeding.');
                return false;
            }
            DB::beginTransaction();

                $startDate = Carbon::now();
                $endDate = $startDate->copy()->addDays($order->rent_duration);

                $log = AsignedVehicle::create([
                    'user_id' => $this->targetRiderId,
                    'order_id' => $this->targetOrderId,
                    'vehicle_id' => $this->vehicle_model,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'assigned_at' => $startDate,
                    'assigned_by' => Auth::guard('admin')->user()->id, // Corrected Auth syntax
                ]); 

                $order->rent_status = "active";
                $order->rent_start_date = $startDate;
                $order->rent_end_date = $endDate;
                $order->save();

            DB::commit();

            session()->flash('message', 'Vehicle assigned to rider successfully.');
            $this->isAssignedModal = false;
            $this->active_tab = 4;
            $this->reset(['vehicle_model','targetOrderId','targetRiderId']);

        } catch (\Exception $e) {
            DB::rollBack();
        //    dd($e->getMessage());
            session()->flash('assign_error', 'An unexpected error occurred. Please try again later.');
            return false;
        }

    }
    public function updateExchangeModel(){
        try {
            if (!$this->vehicle_model) {
                session()->flash('exchange_error', 'Please select vehicle model first.');
                    return false;
            }

            DB::beginTransaction();

            $assignRider = AsignedVehicle::where('order_id', $this->targetOrderId)->first();

                DB::table('exchange_vehicles')->insert([
                    'user_id'      => $assignRider->user_id,
                    'order_id'     => $assignRider->order_id,
                    'vehicle_id'   => $assignRider->vehicle_id,
                    'start_date'   => $assignRider->start_date,
                    'end_date'     => $assignRider->end_date,
                    'exchanged_by' => Auth::guard('admin')->user()->id, // Fixed typo (extra space)
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ]); 

                $assignRider->vehicle_id = $this->vehicle_model;
                $assignRider->assigned_by = Auth::guard('admin')->user()->id;
                $assignRider->save();

            DB::commit();

            session()->flash('message', 'Vehicle exchange to rider successfully.');
            $this->isExchangeModal = false;
            $this->active_tab = 4;
            $this->reset(['vehicle_model','targetOrderId','targetRiderId']);

        } catch (\Exception $e) {
            DB::rollBack();
        //    dd($e->getMessage());
            session()->flash('exchange_error', 'An unexpected error occurred. Please try again later.');
            return false;
        }

    }
    public function OpenPreviewImage($front_image, $back_image,$document_type)
    {   
        $this->preview_front_image = $front_image;
        $this->preview_back_image = $back_image;
        $this->document_type = $document_type;
        $this->isPreviewimageModal = true;
    }

    public function VerifyKyc($status, $id){
        $user = User::find($id);
        if($user){
            if($status=="vefiry"){
                $user->kyc_uploaded_at = date('Y-m-d h:i:s');
                $user->kyc_verified_by = Auth::guard('admin')->user()->id;
                $user->is_verified = "verified";
            }else{
                $user->kyc_uploaded_at = date('Y-m-d h:i:s');
                $user->kyc_verified_by = Auth::guard('admin')->user()->id;
                $user->is_verified = "unverified";
            }
            $user->save();
            $this->showCustomerDetails($id);
            // Optionally, show a confirmation message
            session()->flash('modal_message', 'KYC status updated successfully.');
        }
    }

    public function closePreviewImage()
    {
        $this->isPreviewimageModal = false;
        $this->reset(['preview_front_image', 'preview_back_image','document_type']);
    }
    public function closeRejectModal()
    {
        $this->isRejectModal = false;
        $this->reset(['remarks', 'field','document_type', 'id']);
    }
   
    public function closeAssignedModal()
    {
        $this->isAssignedModal = false;
        $this->reset(['vehicle_model']);
    }

    public function showCustomerDetails($customerId)
    {
        $this->selectedCustomer = User::with('doc_logs')->find($customerId);
        $this->isModalOpen = true;
    }

    public function closeModal()
    {
        $this->isModalOpen = false;
    }

    public function updateStatus($id, $document_type, $status)
    {
        $update = User::where('id', $id)->first();
        $update->$document_type = $status;
        $update->save();
        $this->showCustomerDetails($id);
        // Optionally, show a confirmation message
        session()->flash('modal_message', 'Status updated successfully.');
    }
    /**
     * Refresh button click handler to reset the search input and reload data.
     */
    public function reset_search(){
        $this->reset('search'); // Reset the search term
        $this->resetPage();     // Reset pagination
    }
    public function toggleStatus($id){
        $user = User::findOrFail($id);
        $user->status = !$user->status;
        $user->save();
        session()->flash('message', 'Customer status updated successfully.');
    }

    public function tab_change($value){
        $this->active_tab = $value;
        $this->search = "";
    }

    public function confirmDeallocate($id){
        $this->dispatch('showConfirm', ['itemId' => $id]);
    }
    public function suspendRiderWarning($id, $orderId){
        $this->dispatch('showWarningConfirm', ['itemId' => $id, 'orderId'=>$orderId]);
    }
    public function updateUserData($itemId)
    {
        $user = User::find($itemId);
        if ($user) {
            $user->vehicle_assign_status = $user->vehicle_assign_status=="deallocate"?NULL:"deallocate";
            $user->suspended_by = Auth::guard('admin')->user()->id;
            $user->save();
            $this->reset_search();
            $message = $user->vehicle_assign_status=="deallocate"?"deallocated":"reallocated";
            session()->flash('success', 'The vehicle has been '.$message.' deallocated for this user!');
        } 
    }

    public function suspendRider($itemId, $order_id){
        if($itemId){
            $user = User::find($itemId);
            $user->vehicle_assign_status = 'suspended';
            $user->suspended_by = Auth::guard('admin')->user()->id;
            $user->save();
            $order = Order::find($order_id);
            $order->rent_status = "deallocated";
            $order->save();
            $AsignedVehicle = AsignedVehicle::where('order_id', $order_id)->first();
            $AsignedVehicle->status = "deallocated";
            $AsignedVehicle->assigned_by = Auth::guard('admin')->user()->id;
            $AsignedVehicle->save();
            session()->flash('success', 'The rider has been suspended and deallocated for this vehicle.');
        }
    }
    public function render()
    {
         // Query users based on the search term
         $all_users = User::when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'like', $searchTerm)
                    ->orWhere('mobile', 'like', $searchTerm)
                    ->orWhere('email', 'like', $searchTerm)
                    ->orWhere('customer_id', 'like', $searchTerm);
                });
            })->whereHas('latest_order')
            ->where('is_verified', 'verified')
            ->orderBy('id', 'DESC')
            ->paginate(20);

         $await_users = User::when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'like', $searchTerm)
                    ->orWhere('mobile', 'like', $searchTerm)
                    ->orWhere('email', 'like', $searchTerm)
                    ->orWhere('customer_id', 'like', $searchTerm);
                });
            })->whereHas('await_order')
            ->where('is_verified', 'verified')
            ->orderBy('id', 'DESC')
            ->paginate(20);
        $ready_to_assigns = User::when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'like', $searchTerm)
                    ->orWhere('mobile', 'like', $searchTerm)
                    ->orWhere('email', 'like', $searchTerm)
                    ->orWhere('customer_id', 'like', $searchTerm);
                });
            })->whereHas('ready_to_assign_order')
            ->where('is_verified', 'verified')
            ->orderBy('id', 'DESC')
            ->paginate(20);
            
        $active_users = User::when($this->search, function ($query) {
            $searchTerm = '%' . $this->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', $searchTerm)
                ->orWhere('mobile', 'like', $searchTerm)
                ->orWhere('email', 'like', $searchTerm)
                ->orWhere('customer_id', 'like', $searchTerm);
            });
        })->whereHas('active_order')
        ->whereHas('active_vehicle')
        ->where('is_verified', 'verified')
        ->orderBy('id', 'DESC')
        ->paginate(20);

        $inactive_users = User::with('doc_logs')
            ->whereDoesntHave('accessToken')
            ->when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'like', $searchTerm)
                    ->orWhere('mobile', 'like', $searchTerm)
                    ->orWhere('email', 'like', $searchTerm)
                    ->orWhere('customer_id', 'like', $searchTerm);
                });
            })
            // ->where('is_verified', 'verified')
            ->orderBy('id', 'DESC')
            ->paginate(20);

        $suspended_users = User::with('doc_logs')
            // ->whereDoesntHave('accessToken')
            ->when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'like', $searchTerm)
                    ->orWhere('mobile', 'like', $searchTerm)
                    ->orWhere('email', 'like', $searchTerm)
                    ->orWhere('customer_id', 'like', $searchTerm);
                });
            })
            ->where('vehicle_assign_status', 'suspended')
            ->orderBy('id', 'DESC')
            ->paginate(20);

        return view('livewire.admin.rider-engagement', [
            'all_users' => $all_users,
            'await_users' => $await_users,
            'ready_to_assigns' => $ready_to_assigns,
            'active_users' => $active_users,
            'inactive_users' => $inactive_users,
            'suspended_users' => $suspended_users,
        ]);
    }
}
