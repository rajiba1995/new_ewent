<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stocks';
    protected $fillable = ['id','product_id', 'vehicle_number', 'status'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
    // Corrected relationship: A stock (vehicle) may be assigned to an order item
    public function assignedVehicle()
    {
        return $this->hasOne(AssignedVehicle::class, 'vehicle_id', 'id');
    }

    // If you want to get all assignments (history), use hasMany instead
    public function assignedVehicles()
    {
        return $this->hasMany(AssignedVehicle::class, 'vehicle_id', 'id');
    }
}
