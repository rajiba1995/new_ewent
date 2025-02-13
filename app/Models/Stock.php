<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stocks';
    protected $fillable = ['product_id', 'vehicle_number', 'status'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
