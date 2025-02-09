<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $fillable = [
        'user_id', 'type', 'street_address', 'city', 'country', 'pincode', 'is_default'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
