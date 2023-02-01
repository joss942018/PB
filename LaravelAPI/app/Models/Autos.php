<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autos extends Model
{ 
    protected $table = "autos";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
    public function marcas()
    {
    return $this->hasOne(Marcas::class,'id','marca_id')->select(['id','nombre']);
    }
    public function año()
    {
    return $this->hasOne(Ao::class,'id','año_id')->select(['id','descripcion']);
    }
    public function clientes()
    {
    return $this->hasOne(Clientes::class,'id','cliente_id')->select(['id','identificacion']);
    }
    public function modelos()
    {
    return $this->hasOne(Modelos::class,'id','modelo_id')->select(['id','nombre']);
    }
    public function polizas()
    {
        return $this->hasOne(Polizas::class,'auto_id','id')->select(['id', 'auto_id', 'paquete_id']);
    }
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','marca_id','modelo_id','año_id','cliente_id'
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


