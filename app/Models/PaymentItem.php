<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentItem extends Model
{
    use HasFactory;
    protected $table = 'payment_items';
    protected $fillable = [
            'payment_for', 'payment_id', 'vehicle_id', 'duration', 'type', 'amount'
    ];
}
