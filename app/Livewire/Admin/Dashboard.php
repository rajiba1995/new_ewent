<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class Dashboard extends Component
{
    public $data;
    public function logout()
    {
        Auth::guard('admin')->logout();
        session()->invalidate();
        session()->regenerateToken();
        
        return redirect()->route('login');
    }
    public function mount(){
      // Step 2: Fetch vehicle data using the token
        $vehiclesUrl = 'https://app.loconav.sensorise.net/integration/api/v1/vehicles/';

        $ch = curl_init($vehiclesUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "User-Authentication: _kpbswcRHnxsgBCaYeLE",
            "Accept: application/json"
        ]);

        $vehiclesResponse = curl_exec($ch);
        curl_close($ch);

        $vehiclesData = json_decode($vehiclesResponse, true);

        if (!$vehiclesData) {
            $this->data = ['error' => 'Failed to fetch data'];
        } else {
            $this->data = $vehiclesData;
        }
        // dd($this->data);
    }

    public function render()
    {
        return view('livewire.admin.dashboard', [
            'data' => $this->data
        ]);
    }
}
