<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Polizas extends Model
{ 
    protected $table = "polizas";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
    public function paquetes()
    {
        return $this->hasOne(Paquetes::class,'id','paquete_id')->select(['id','nombre']);
    }

    public function autos()
    {
        return $this->hasOne(Autos::class,'id','auto_id')->select(['id', 'marca_id', 'año_id', 'modelo_id']);
    }   

    
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'valor','fecha_vigencia','paquete_id','auto_id','user_id', 'estado'
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

