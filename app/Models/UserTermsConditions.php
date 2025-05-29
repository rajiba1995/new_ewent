<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTermsConditions extends Model
{
    protected $table = 'users_terms_conditions';
    protected $fillable = [ 'mobile', 'email', 'document_id', 'group_id', 'request_id', 'signed_at', 'response_payload', 'status', 'accepted_at'];
}
