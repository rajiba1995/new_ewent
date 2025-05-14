<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\User;
use App\Models\Order;
use App\Models\Stock;
use App\Models\Payment;
use App\Models\PaymentItem;
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
            $user->date_of_rejection = date('Y-m-d h:i:s');
            $user->rejected_by = Auth::guard('admin')->user()->id;
            $user->is_verified = "rejected";
            $user->save();

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

                $payment = Payment::where('order_id', $order->id)
                    ->where('order_type', $order->subscription_type)
                    ->latest('id')
                    ->first();

                if ($payment) {
                    PaymentItem::where('payment_id', $payment->id)
                        ->where('payment_for',  $order->subscription_type)
                        ->update(['vehicle_id' => $this->vehicle_model]);
                }


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

            $order = Order::find($this->targetOrderId);

                DB::table('exchange_vehicles')->insert([
                    'user_id'      => $assignRider->user_id,
                    'order_id'     => $assignRider->order_id,
                    'vehicle_id'   => $assignRider->vehicle_id,
                    'start_date'   => $assignRider->start_date,
                    'end_date'     => now(),
                    'exchanged_by' => Auth::guard('admin')->user()->id, // Fixed typo (extra space)
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ]); 

                $assignRider->vehicle_id = $this->vehicle_model;
                $assignRider->assigned_by = Auth::guard('admin')->user()->id;
                $assignRider->save();

                $payment = Payment::where('order_id', $assignRider->order_id)
                    ->where('order_type', $order->subscription_type)
                    ->latest('id')
                    ->first();

                if ($payment) {
                    PaymentItem::where('payment_id', $payment->id)
                        ->where('payment_for', $order->subscription_type)
                        ->update(['vehicle_id' => $this->vehicle_model]);
                }

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
            if($status=="verified"){
                if($user->govt_id_card_status!=2){
                    session()->flash('error_kyc_message', 'Govt. ID Card is not verified. Please verify the Govt. ID Card.');
                    return false;
                }
                if($user->cancelled_cheque_status!=2){
                    session()->flash('error_kyc_message', 'Cancelled cheque is not verified. Please verify the cancelled cheque.');
                    return false;
                }
                if($user->current_address_proof_status!=2){
                    session()->flash('error_kyc_message', 'Address proof is not verified. Please verify the current address proof.');
                    return false;
                }

                $user->kyc_uploaded_at = date('Y-m-d h:i:s');
                $user->kyc_verified_by = Auth::guard('admin')->user()->id;
                $user->is_verified = "verified";
                $user->date_of_rejection = NULL;
                $user->rejected_by = NULL;
            }elseif($status=="rejected"){
                $user->date_of_rejection = date('Y-m-d h:i:s');
                $user->rejected_by = Auth::guard('admin')->user()->id;
                $user->is_verified = "rejected";
            }else{
                $user->kyc_uploaded_at = date('Y-m-d h:i:s');
                $user->kyc_verified_by = Auth::guard('admin')->user()->id;
                $user->is_verified = "unverified";
                 $user->date_of_rejection = NULL;
                $user->rejected_by = NULL;
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

    public function confirmDeallocate($order_id){
        $this->dispatch('showConfirm', ['itemId' => $order_id]);
    }
    public function suspendRiderWarning($id){
        $this->dispatch('showWarningConfirm', ['itemId' => $id]);
    }
    public function activeRiderWarning($id){
        $this->dispatch('showactiveRiderWarning', ['itemId' => $id]);
    }
    public function updateUserData($itemId)
    {
        $order = Order::find($itemId);
        if ($order) {

            $AsignedVehicle = AsignedVehicle::where('order_id', $itemId)->first();
            // $AsignedVehicle->deallocated_at = date('Y-m-d h:i:s');
            // $AsignedVehicle->deallocated_by = Auth::guard('admin')->user()->id;
            // $AsignedVehicle->status = "returned";
            // $AsignedVehicle->save();

            $order->return_date = date('Y-m-d h:i:s');
            $order->rent_status = 'returned';
            $order->cancel_request = 'No';
            $order->save();

            DB::table('exchange_vehicles')->insert([
                'status'       => "returned",
                'user_id'      => $AsignedVehicle->user_id,
                'order_id'     => $AsignedVehicle->order_id,
                'vehicle_id'   => $AsignedVehicle->vehicle_id,
                'start_date'   => $AsignedVehicle->start_date,
                'end_date'     => $AsignedVehicle->end_date,
                'exchanged_by' => Auth::guard('admin')->user()->id, 
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
            $AsignedVehicle->delete();
            $this->reset_search();
            // $message = $user->vehicle_assign_status=="deallocate"?"deallocated":"reallocated";
            session()->flash('success', 'The vehicle has been deallocated deallocated for this user!');
        } 
    }

    public function suspendRider($itemId){
        if($itemId){
            $user = User::find($itemId);
            $user->vehicle_assign_status = 'suspended';
            $user->suspended_by = Auth::guard('admin')->user()->id;
            $user->save();

            // dd($user);
            // $order = Order::find($order_id);
            // $order->rent_status = "deallocated";
            // $order->save();
            // $AsignedVehicle = AsignedVehicle::where('order_id', $order_id)->first();
            // $AsignedVehicle->status = "deallocated";
            // $AsignedVehicle->assigned_by = Auth::guard('admin')->user()->id;
            // $AsignedVehicle->save();
            session()->flash('success', 'The rider has been suspended and deallocated for this vehicle.');
        }
    }
    public function activeRider($itemId){
        if($itemId){
            $user = User::find($itemId);
            $user->vehicle_assign_status = NULL;
            $user->suspended_by = NULL;
            $user->save();
            session()->flash('success', 'The rider has been activated for ride.');
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
            })
            // ->whereHas('latest_order')
            ->where('is_verified', 'verified')
            ->whereNull('vehicle_assign_status')
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
        })
        ->doesntHave('await_order')
        ->where('is_verified', 'verified')
        ->whereNull('vehicle_assign_status')
        ->orderBy('id', 'DESC')
        ->paginate(20);

         $pending_orders = User::when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'like', $searchTerm)
                    ->orWhere('mobile', 'like', $searchTerm)
                    ->orWhere('email', 'like', $searchTerm)
                    ->orWhere('customer_id', 'like', $searchTerm);
                });
            })
            ->whereHas('pending_order')
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

        $cancel_requested_users = User::when($this->search, function ($query) {
            $searchTerm = '%' . $this->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', $searchTerm)
                ->orWhere('mobile', 'like', $searchTerm)
                ->orWhere('email', 'like', $searchTerm)
                ->orWhere('customer_id', 'like', $searchTerm);
            });
        })->whereHas('cancel_requested_order')
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
            'pending_orders' => $pending_orders,
            'ready_to_assigns' => $ready_to_assigns,
            'active_users' => $active_users,
            'inactive_users' => $inactive_users,
            'suspended_users' => $suspended_users,
            'cancel_requested_users' => $cancel_requested_users,
        ]);
    }
}
