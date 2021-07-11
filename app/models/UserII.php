<?php


namespace App\models;


use Illuminate\Database\Eloquent\Model;


/**
 * @method static paginate()
 */
class UserII extends Model
{
    protected $connection = 'secondary';
    protected $table="user";
    protected $perPage = 5;

    
    protected $fillable=[
        
    ];

    protected $hidden=[
        
    ];
}