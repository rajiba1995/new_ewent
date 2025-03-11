<?php

namespace App\Livewire\Product;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Stock;

class VehicleList extends Component
{
    use WithPagination;

    public $search = '';
    public $active_tab = 1;
    public $vehicles = [];
    public $isModalOpen = false; // Track modal visibility

    /**
     * Search button click handler to reset pagination.
     */
    public function btn_search()
    {
        $this->resetPage(); // Reset to the first page
    }


    public function closeModal()
    {
        $this->isModalOpen = false;
    }

    /**
     * Refresh button click handler to reset the search input and reload data.
     */
    public function reset_search(){
        $this->reset('search'); // Reset the search term
        $this->resetPage();     // Reset pagination
    }

    public function tab_change($value){
        $this->active_tab = $value;
        $this->search = "";
    }
    public function render()
    {
        // Fetch all vehicles (with or without assigned vehicles)
        $all_vehicles = Stock::with('product')
        ->when($this->search, function ($query) {
            $searchTerm = '%' . $this->search . '%';
            $query->where('vehicle_number', 'like', $searchTerm)
                ->orWhere('imei_number', 'like', $searchTerm)
                ->orWhere('chassis_number', 'like', $searchTerm)
                ->orWhere('friendly_name', 'like', $searchTerm);
        })
        ->orderBy('id', 'DESC')
        ->orderBy('product_id', 'DESC')
        ->paginate(20);

        // Fetch only assigned vehicles (having an entry in the assigned_vehicles table)
        $assigned_vehicles = Stock::with('assignedVehicle')
        ->whereHas('assignedVehicle') // Ensures only assigned vehicles are fetched
        ->when($this->search, function ($query) {
            $searchTerm = '%' . $this->search . '%';
            $query->where('vehicle_number', 'like', $searchTerm)
                ->orWhere('imei_number', 'like', $searchTerm)
                ->orWhere('chassis_number', 'like', $searchTerm)
                ->orWhere('friendly_name', 'like', $searchTerm);
        })
        ->orderBy('id', 'DESC')
        ->orderBy('product_id', 'DESC')
        ->paginate(20);
        $unassigned_vehicles = Stock::whereDoesntHave('assignedVehicle', function ($query) {
            $query->whereIn('status', ['assigned','sold']); // Ensure it's truly unassigned
        })
        ->when($this->search, function ($query) {
            $searchTerm = '%' . $this->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('vehicle_number', 'like', $searchTerm)
                    ->orWhere('imei_number', 'like', $searchTerm)
                    ->orWhere('chassis_number', 'like', $searchTerm)
                    ->orWhere('friendly_name', 'like', $searchTerm);
            });
        })
        ->orderBy('id', 'DESC')
        ->paginate(20);
        return view('livewire.product.vehicle-list', [
            'all_vehicles' => $all_vehicles,
            'unassigned_vehicles' => $unassigned_vehicles,
            'assigned_vehicles' => $assigned_vehicles,
        ]);
    }
}
