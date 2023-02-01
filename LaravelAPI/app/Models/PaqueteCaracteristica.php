<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaqueteCaracteristica extends Model
{ 
    protected $table = "paquete_caracteristica";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
public function paquetes()
{
return $this->hasOne(Paquetes::class,'id','paquete_id')->select(['id','nombre']);
}
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'paquete_id','caracteristica_id'
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        
    ];

    use HasFactory;
}

