<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Models\User;
use App\Models\Payment;
use App\Models\PaymentItem;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UserPaymentSummaryExport;

class UserPaymentHistory extends Component
{
    public $filterData = [];
    public $expandedRows = [];
    public $transaction_details = [];
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

   public function toggleRow($key, $razorpay_payment_id)
    {
        $this->transaction_details[$key] = $this->paymentFetch($razorpay_payment_id);

        if (in_array($key, $this->expandedRows)) {
            $this->expandedRows = array_diff($this->expandedRows, [$key]);
        } else {
            $this->expandedRows[] = $key;
        }
    }

    public function paymentFetch($razorpay_payment_id)
    {
        $api_key = env('RAZORPAY_KEY_ID');
        $api_secret = env('RAZORPAY_KEY_SECRET');
        
        $curl = curl_init();
        $url = "https://api.razorpay.com/v1/payments/$razorpay_payment_id";

        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_USERPWD => $api_key . ":" . $api_secret,
            CURLOPT_HTTPHEADER => [
                "Content-Type: application/json"
            ],
        ]);

        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        if ($httpCode == 200) {
            return json_decode($response, true);
        } else {
            return [
                'status' => false,
                'message' => "Failed to capture payment.",
                'error' => json_decode($response, true)
            ];
        }
    }

     public function exportAll()
    {
        return Excel::download(new UserPaymentSummaryExport($this->selected_rider, $this->selected_product_type, $this->selected_payment_status, $this->start_date, $this->end_date), 'user_payment_history.xlsx');
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
            $query->whereBetween('payment_date', [$this->start_date. ' 00:00:00', $this->end_date . ' 23:59:59']);
        })
        ->when($this->start_date && !$this->end_date, function ($query) {
            $query->whereDate('payment_date', '>=', $this->start_date);
        })
        ->when(!$this->start_date && $this->end_date, function ($query) {
            $query->whereDate('payment_date', '<=', $this->end_date);
        })
        ->orderBy('id', 'DESC')
        ->paginate(25);
         
        return view('livewire.admin.user-payment-history', [
            'data' => $data,
        ]);
    }
}
