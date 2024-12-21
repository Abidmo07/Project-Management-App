<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function assign_user(){
        return $this->belongsTo(User::class,"assigned_user_id");
    }
    public function createdby(){
        return $this->belongsTo(User::class,"created_by");
    }
}
