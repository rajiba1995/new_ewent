<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\User;

class CustomerIndex extends Component
{
    use WithPagination;

    public $search = '';

    /**
     * Search button click handler to reset pagination.
     */
    public function searchButtonClicked()
    {
        $this->resetPage(); // Reset to the first page
    }

    /**
     * Refresh button click handler to reset the search input and reload data.
     */
    public function resetSearch(){
        $this->reset('search'); // Reset the search term
        $this->resetPage();     // Reset pagination
    }
    public function toggleStatus($id){
        $user = User::findOrFail($id);
        $user->status = !$user->status;
        $user->save();
        session()->flash('message', 'Customer status updated successfully.');
    }

    public function render()
    {
        // Query users based on the search term
        $users = User::query()
            ->when($this->search, function ($query) {
                $searchTerm = '%' . $this->search . '%';
                $query->where('name', 'like', $searchTerm)
                      ->orWhere('mobile', 'like', $searchTerm)
                      ->orWhere('email', 'like', $searchTerm);
            })
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return view('livewire.admin.customer-index', [
            'users' => $users
        ]);
    }
}
