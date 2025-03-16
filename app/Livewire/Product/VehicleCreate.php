<?php

namespace App\Livewire\Product;

use Livewire\Component;
use App\Models\Product;
use App\Models\Stock;
use Illuminate\Validation\Rule;

class VehicleCreate extends Component
{
    public $models = [];
    public $model,$vehicle_number,$vehicle_track_id,$imei_number,$chassis_number,$friendly_name;
    public function mount(){
        $this->models = Product::where('status', 1)->orderBy('title', 'ASC')->get();
    }

    protected $rules = [
        'model' => 'required|exists:products,id',
        'vehicle_track_id' => 'required|string|unique:stocks,vehicle_track_id',
        'friendly_name' => 'nullable|string|max:255',
        'vehicle_number' => 'required|string|unique:stocks,vehicle_number',
        'imei_number' => 'required|string|unique:stocks,imei_number',
        'chassis_number' => 'required|string|unique:stocks,chassis_number',
    ];
    public function saveVehicle()
    {
        $validatedData = $this->validate();
        Stock::create([
            'product_id' => $validatedData['model'],
            'vehicle_number' => $validatedData['vehicle_number'],
            'vehicle_track_id' => $validatedData['vehicle_track_id'],
            'imei_number' => $validatedData['imei_number'],
            'chassis_number' => $validatedData['chassis_number'],
            'friendly_name' => $validatedData['friendly_name'],
        ]);

        session()->flash('message', 'Vehicle created successfully!');
        return redirect()->route('admin.vehicle.list');
    }
    public function render()
    {
        return view('livewire.product.vehicle-create');
    }
}
