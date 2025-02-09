<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
   use HasFactory;
    protected $table = 'payments';
    protected $fillable = [
            'order_id', 'payment_method', 'payment_status', 'transaction_id', 'amount', 'currency', 'payment_date'
    ];
}
