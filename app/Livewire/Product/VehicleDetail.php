<?php

namespace App\Livewire\Product;

use Livewire\Component;
use App\Models\Stock;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class VehicleDetail extends Component
{
    public $vehicle_id;
    public $vehicle;
    public $map;
    public $vehicle_main_details;
    public function mount($vehicle_id){

        $this->vehicle = Stock::where('vehicle_track_id', $vehicle_id)->first();
        // if(!$this->vehicle){
        //     abort(404);
        // }
        $this->vehicle_id = $vehicle_id;

        $vehiclesUrl = 'https://app.loconav.sensorise.net/integration/api/v1/vehicles/'.$this->vehicle_id;

        $ch = curl_init($vehiclesUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "User-Authentication: _kpbswcRHnxsgBCaYeLE",
            "Accept: application/json"
        ]);

        $vehiclesResponse = curl_exec($ch);
        curl_close($ch);

        $vehiclesData = json_decode($vehiclesResponse, true);
        // dd($vehiclesData);
        if (!$vehiclesData) {
            $this->vehicle_main_details = ['error' => 'Failed to fetch data'];
        } else {
            $this->vehicle_main_details = $vehiclesData;
        }
        // dd($this->vehicle_main_details);
    }
    public function LiveLocationByMap(){
        $vehiclesUrl = 'https://api.a.loconav.com/integration/api/v1/vehicles/'.$this->vehicle_id.'/live_share_link';
        
        $ch = curl_init($vehiclesUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "User-Authentication: _kpbswcRHnxsgBCaYeLE",
            "Accept: application/json"
        ]);

        $vehiclesResponse = curl_exec($ch);
        curl_close($ch);

        $this->map = json_decode($vehiclesResponse, true);
        // dd($this->map);
    }
    public function render()
    {
        $this->LiveLocationByMap();
        return view('livewire.product.vehicle-detail');
    }
}
