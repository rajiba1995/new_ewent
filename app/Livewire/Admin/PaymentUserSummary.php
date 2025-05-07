<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Models\AsignedVehicle;
use App\Models\ExchangeVehicle;

class PaymentUserSummary extends Component
{
    public function render()
    {
        // Fetching the assigned vehicle
        $assignedVehicle = AsignedVehicle::where('status', 'assigned')
        ->where('user_id', $this->userId)
        ->first();

        $exchangeVehicles  = ExchangeVehicle::with('stock')
        // ->whereIn('status', ['renewal', 'returned'])
        ->where('user_id', $this->userId)->orderBy('id', 'DESC')->paginate(10);

        // Adding assigned vehicle at the start (if it exists)
        if ($assignedVehicle) {
            $assignedVehicle->exchanged_by = $assignedVehicle->assigned_by;
            $exchangeVehicles->getCollection()->prepend($assignedVehicle);
        }
   
        return view('livewire.admin.payment-user-summary',[
            'history'=>$exchangeVehicles ,
        ]);
    }
}
