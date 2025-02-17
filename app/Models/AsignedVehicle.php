<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AsignedVehicle extends Model
{
    use HasFactory;
    protected $table = "assigned_vehicles";
    protected $fillable = [
        'order_item_id', 'vehicle_id', 'status', 'assigned_at',
    ];
    public function order_item(){
        return $this->belongsTo(OrderItem::class,'order_item_id','id');
    }
}
