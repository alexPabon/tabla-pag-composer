<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class User extends Model{

    protected $connection = 'main';
    protected $table="user";
    protected $perPage = 10;

    protected $fillable=[
        'numero1',
        'numero2',
    ];

    protected $hidden=[
        'created_at',
        'updated_at'
    ];

}