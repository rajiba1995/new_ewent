<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Models\User;
use App\Models\UserKycLog;
use App\Models\Order;
use App\Models\AsignedVehicle;
use App\Models\ExchangeVehicle;
use Illuminate\Support\Facades\Hash;
use Illuminate\Pagination\Paginator;
use Livewire\WithPagination;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UserRideSummaryExport;
use App\Exports\UserJourneyExport;

class CustomerDetails extends Component
{
    use WithPagination;
    public $user;
    public $activeTab = 'account'; // Default active tab
    public $newPassword; // Correct naming convention
    public $confirmPassword;
    public $userId;
    public $showEditModal = false;
    public $ride_history = [];
    public $documents = [];
    public $data = [];
    public $customer_total_order = 0;
    public $expandedRows = [];
    public $total_payment_amount = 0;

    // Rules for updating the password
    protected $rules = [
        'newPassword' => 'required|min:6|regex:/[A-Z]/|regex:/[\W_]/', // Minimum 6 characters, at least one uppercase and one special character
        'confirmPassword' => 'required|same:newPassword',
    ];

    public $search = '';
    protected $paginationTheme = 'bootstrap';
    // public function boot()
    // {
    //     Paginator::useBootstrap();
    // }

    public function mount($id)
    {
        // Fetch the user by ID or fail
        $this->user = User::findOrFail($id);
        $this->userId = $id;
        $this->GetDocumentStatus();
        $this->customer_total_order = Order::where('user_id', $id)->count();
        $this->total_payment_amount = Order::where('user_id', $id)->whereHas('payments', function ($query){
            $query->where('payment_status', 'completed');
        })->sum('rental_amount');
    }

    public function searchButtonClicked()
    {
        $this->resetPage(); // Reset to the first page
    }

   
    public function resetSearch()
    {
        $this->reset('search'); // Reset the search term
        $this->resetPage();     // Reset pagination
    }
    
    public function GetDocumentStatus()
    {
        $this->documents = [
            [
                'name' => 'Driving Licence',
                'tag' => 'driving_licence_status',
                'icon' => 'ri-roadster-line',
                'doc' => $this->user->driving_licence,
                'status' => $this->user->driving_licence_status,
            ],
            [
                'name' => 'Govt. ID Card',
                'tag' => 'govt_id_card_status',
                'icon' => 'ri-passport-line',
                'doc' => $this->user->govt_id_card,
                'status' => $this->user->govt_id_card_status,
            ],
            [
                'name' => 'Cancelled Cheque',
                'tag' => 'cancelled_cheque_status',
                'icon' => 'ri-bank-line',
                'doc' => $this->user->cancelled_cheque,
                'status' => $this->user->cancelled_cheque_status,
            ],
            [
                'name' => 'Current Address Proof',
                'tag' => 'current_address_proof_status',
                'icon' => 'ri-home-line',
                'doc' => $this->user->current_address_proof,
                'status' => $this->user->current_address_proof_status,
            ],
        ];
    }

    public function updateStatus($document_type, $status)
    {
        $update = User::where('id', $this->userId)->first();
        $update->$document_type = $status;
        $update->save();
        $this->mount($this->userId);
        // Optionally, show a confirmation message
        session()->flash('message', 'Status updated successfully.');
    }


    /**
     * Show the edit modal for user details.
     */
    public function activeEditModal()
    {
        $this->showEditModal = true;
    }

    /**
     * Close the edit modal.
     */
    public function closeModal()
    {
        $this->showEditModal = false;
    }

    /**
     * Update user details.
     */
    public function updateUser()
    {
        $this->validate([
            'user.email' => 'required|email|unique:users,email,' . $this->userId,
            'user.mobile' => 'required|numeric',
            'user.address' => 'nullable|string|max:255',
        ]);

        $this->user->save();

        $this->showEditModal = false;
        session()->flash('message', 'User details updated successfully!');
    }

    /**
     * Update the user's password.
     */
    public function updatePassword()
    {
        $this->validate();

        $user = User::find($this->userId);

        if (!$user) {
            session()->flash('error', 'User not found!');
            return;
        }

        // Update password
        $user->password = Hash::make($this->newPassword);
        $user->save();

        session()->flash('message', 'Password updated successfully!');

        // Reset password fields after update
        $this->reset(['newPassword', 'confirmPassword']);
    }

    /**
     * Set the active tab.
     */
    public function setActiveTab($tab)
    {
        $this->activeTab = $tab;
    }

    public function exportAll()
    {
        return Excel::download(new UserRideSummaryExport($this->userId), 'user_ride_history.xlsx');
    }
    /**
     * Render the Livewire component.
     */
    public function fetchRideData($order_id,$key){

        $this->reset(['ride_history','expandedRows']);
        if (in_array($key, $this->expandedRows)) {
            $this->expandedRows = array_diff($this->expandedRows, [$key]);
        } else {
            $this->expandedRows[] = $key;
        }

        $this->reset(['ride_history']);
        $assignedVehicle = AsignedVehicle::whereIn('status', ['assigned','overdue'])
        ->where('user_id', $this->userId)->where('order_id',$order_id)
        ->first();

        $this->ride_history  = ExchangeVehicle::with('stock')
        // ->whereIn('status', ['renewal', 'returned'])
        ->where('user_id', $this->userId)->where('order_id',$order_id)->orderBy('id', 'DESC')->get();

        // Adding assigned vehicle at the start (if it exists)
        if ($assignedVehicle) {
            $assignedVehicle->exchanged_by = $assignedVehicle->assigned_by;
            $this->ride_history->getCollection()->prepend($assignedVehicle);
        }
    }
    public function changeTab($value){
        $this->activeTab = $value;
    }
    public function exportJourney()
    {
        $userJourney = $this->getUserJourney(); // Make sure this returns the formatted array

        return Excel::download(new UserJourneyExport($userJourney), 'user-journey.xlsx');
    }

    public function getUserJourney(){
        $user = User::find($this->userId);

        $register = $user->created_at ?? null;
        $kyc_uploaded = UserKycLog::where('user_id', $this->userId)->latest()->value('created_at');
        $kyc_verified_at = $user->kyc_verified_at ?? null;

        $firstOrder = Order::where('user_id', $this->userId)->orderBy('id', 'ASC')->first();
        $lastOrder = Order::where('user_id', $this->userId)->orderBy('id', 'DESC')->first();

        $totalOrders = Order::where('user_id', $this->userId)->count();
        $totalPayment = $this->total_payment_amount;

        $lastAssigned = AsignedVehicle::where('user_id', $this->userId)
            ->whereIn('status', ['assigned', 'overdue'])
            ->orderBy('id', 'DESC')
            ->with('stock')
            ->first();

        $userJourney = [];

        if ($register) {
            $userJourney[] = [
                'title' => 'User Registered',
                'description' => 'User account created successfully.',
                'date' => $register,
            ];
        }

        if ($kyc_uploaded) {
            $userJourney[] = [
                'title' => 'KYC Uploaded',
                'description' => 'User submitted KYC documents.',
                'date' => $kyc_uploaded,
            ];
        }

        if ($kyc_verified_at) {
            $userJourney[] = [
                'title' => 'KYC Verified',
                'description' => 'KYC has been verified.',
                'date' => $kyc_verified_at,
            ];
        }

        if ($firstOrder) {
             $vehicle_number = 'N/A';

            // Check assigned vehicle
            if ($firstOrder->vehicle && $firstOrder->vehicle->stock) {
                $vehicle_number = $firstOrder->vehicle->stock->vehicle_number;
            }

            // If not found in assigned, check in exchange vehicle (assuming one-to-one or latest returned)
            if (!$firstOrder->vehicle && $firstOrder->exchange_vehicle) {
                $returnedExchange = $firstOrder->exchange_vehicle->where('status', 'returned')->first();
                if ($returnedExchange && $returnedExchange->stock) {
                    $vehicle_number = $returnedExchange->stock->vehicle_number;
                }
            }
            $firstOrder->vehicle?$firstOrder->vehicle->vehicle_id:$firstOrder->exchange_vehicle;
            $userJourney[] = [
                'title' => 'First Ride Placed',
                'description' => 'Vehicle  Number: <span class="badge bg-label-success">#' . $vehicle_number . '</span>',
                'date' => $firstOrder->created_at,
            ];
        }

        

        if ($lastOrder) {
            $vehicle_number = 'N/A';
            // Check assigned vehicle
            if ($lastOrder->vehicle && $lastOrder->vehicle->stock) {
                $vehicle_number = $lastOrder->vehicle->stock->vehicle_number;
            }

            // If not found in assigned, check in exchange vehicle (assuming one-to-one or latest returned)
            if (!$lastOrder->vehicle && $lastOrder->exchange_vehicle) {
                $returnedExchange = $lastOrder->exchange_vehicle->where('status', 'returned')->first();
                if ($returnedExchange && $returnedExchange->stock) {
                    $vehicle_number = $returnedExchange->stock->vehicle_number;
                }
            }
            $userJourney[] = [
                'title' => 'Last Ride',
                'description' => 'Vehicle Number: <span class="badge bg-label-success">#' . $vehicle_number . '</span>',
                'date' => $lastOrder->created_at,
            ];
        }
        if ($totalOrders > 0) {
            $userJourney[] = [
                'title' => 'Ride Summary',
                'description' => "Total Rides: <span class='text-primary fw-bold'>{$totalOrders}</span>, Total Rent Paid: <code>₹" . number_format($totalPayment, 2) . "</code>",
                'date' => now(), // or leave null
            ];
        }
        return $userJourney;
    }
    public function render(){
        $userJourney = $this->getUserJourney();
        $orders = Order::where('user_id',$this->userId)->whereIn('rent_status',['active','returned'])->orderBy('id','DESC')->paginate(18);
        return view('livewire.admin.customer-details',[
            'orders'=>$orders,
            'userJourney' => $userJourney,
        ]);
    }
}
