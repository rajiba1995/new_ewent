<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
       'user_id', 'order_type', 'order_number', 'total_price', 'discount_amount', 'final_amount', 'quantity', 'status', 'offer_id', 'payment_type', 'payment_mode', 'payment_status', 'shipping_address', 'rent_duration', 'rent_start_date', 'rent_end_date', 'rent_status'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function offer(){
        return $this->belongsTo(Offer::class, 'offer_id', 'id');
    }
}
