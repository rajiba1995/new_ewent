<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CustomerDetails extends Component
{
    public $user;
    public $activeTab = 'overview'; // Default active tab
    public $newPassword; // Correct naming convention
    public $confirmPassword;
    public $userId;
    public $showEditModal = false;
    public $documents = [];

    // Rules for updating the password
    protected $rules = [
        'newPassword' => 'required|min:6|regex:/[A-Z]/|regex:/[\W_]/', // Minimum 6 characters, at least one uppercase and one special character
        'confirmPassword' => 'required|same:newPassword',
    ];

    public function mount($id)
    {
        // Fetch the user by ID or fail
        $this->user = User::findOrFail($id);
        $this->userId = $id;
        $this->GetDocumentStatus();
    }

    public function GetDocumentStatus()
    {
        $this->documents = [
            [
                'name' => 'Driving License',
                'tag' => 'driving_license_status',
                'icon' => 'ri-roadster-line',
                'doc' => $this->user->driving_license,
                'status' => $this->user->driving_license_status,
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

    /**
     * Render the Livewire component.
     */
    public function render()
    {
        return view('livewire.admin.customer-details');
    }
}
