<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{ 
    protected $table = "clientes";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
public function estados_civil()
{
return $this->hasOne(EstadosCivil::class,'id','estado_civil_id')->select(['id','nombre']);
}
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'identificacion','celular','nombres','apellidos','estado_civil_id','ciudad_id','edad','genero','terminos_condiciones'
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

