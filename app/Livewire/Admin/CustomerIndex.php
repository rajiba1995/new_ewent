<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\User;


class CustomerIndex extends Component
{
    use WithPagination;

    public $search = '';
    public $active_tab = 1;
    public $customers = [];
    public $selectedCustomer = null; // Stores the selected customer data
    public $isModalOpen = false; // Track modal visibility

    /**
     * Search button click handler to reset pagination.
     */
    public function btn_search()
    {
        $this->resetPage(); // Reset to the first page
    }

    public function showCustomerDetails($customerId)
    {
        $this->selectedCustomer = User::find($customerId);
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
    public function render()
    {
        // Query users based on the search term
        $unverified_users = User::query()
            ->when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where('name', 'like', $searchTerm)
                      ->orWhere('mobile', 'like', $searchTerm)
                      ->orWhere('email', 'like', $searchTerm)
                      ->orWhere('customer_id', 'like', $searchTerm);
            })
            ->where('is_verified', 'unverified')
            ->orderBy('id', 'DESC')
            ->paginate(20);
        $verified_users = User::query()
            ->when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where('name', 'like', $searchTerm)
                      ->orWhere('mobile', 'like', $searchTerm)
                      ->orWhere('email', 'like', $searchTerm)
                      ->orWhere('customer_id', 'like', $searchTerm);
            })
            ->where('is_verified', 'verified')
            ->orderBy('id', 'DESC')
            ->paginate(20);
        $rejected_users = User::query()
            ->when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where('name', 'like', $searchTerm)
                      ->orWhere('mobile', 'like', $searchTerm)
                      ->orWhere('email', 'like', $searchTerm)
                      ->orWhere('customer_id', 'like', $searchTerm);
            })
            ->where('is_verified', 'rejected')
            ->orderBy('id', 'DESC')
            ->paginate(20);

        return view('livewire.admin.customer-index', [
            'unverified_users' => $unverified_users,
            'verified_users' => $verified_users,
            'rejected_users' => $rejected_users
        ]);
    }
}
