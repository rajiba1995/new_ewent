<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RentalPrice extends Model
{
    protected $table = 'rental_prices';
    protected $fillable = ['product_id', 'duration', 'duration_type', 'price', 'currency'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
