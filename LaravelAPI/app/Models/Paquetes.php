<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paquetes extends Model
{ 
    protected $table = "paquetes";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
    public function aseguradoras()
    {
        return $this->hasOne(Aseguradoras::class,'id','aseguradora_id')->select(['id','nombre']);
    }
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre','descripcion','aseguradora_id','estado'
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

