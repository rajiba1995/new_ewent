<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Models\User;
use App\Models\Payment;
use App\Models\PaymentItem;

class UserPaymentHistory extends Component
{
    public $filterData = [];
    public $selected_rider,$selected_product_type,$selected_payment_status,$start_date,$end_date;
    public function mount(){

        $this->filterData = [
            'rider' => User::select('id', 'name')->get()->toArray(),
            'product_type' => Payment::select('order_type')->distinct()->pluck('order_type')->toArray(),
            'payment_status' => Payment::select('payment_status')->distinct()->pluck('payment_status')->toArray(),
        ];
    }
    public function updateFilters($value,$field){
        $this->$field = $value;
    }
    public function resetPageField(){
        $this->reset(['selected_rider','selected_product_type','selected_payment_status','start_date','end_date']);
    }
    public function render()
    {
        $data = Payment::when($this->selected_rider, function ($query) {
            $query->where('user_id', $this->selected_rider);
        })
        ->when($this->selected_product_type, function ($query) {
            $query->where('order_type', $this->selected_product_type);
        })
        ->when($this->selected_payment_status, function ($query) {
            $query->where('payment_status', $this->selected_payment_status);
        })
        ->when($this->start_date && $this->end_date, function ($query) {
            $query->whereBetween('created_at', [$this->start_date, $this->end_date]);
        })
        ->when($this->start_date && !$this->end_date, function ($query) {
            $query->whereDate('created_at', '>=', $this->start_date);
        })
        ->when(!$this->start_date && $this->end_date, function ($query) {
            $query->whereDate('created_at', '<=', $this->end_date);
        })
        ->orderBy('id', 'DESC')
        ->paginate(25);
         
        return view('livewire.admin.user-payment-history', [
            'data' => $data,
        ]);
    }
}
