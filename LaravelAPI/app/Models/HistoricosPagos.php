<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoricosPagos extends Model
{ 
    protected $table = "historicos_pagos";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
public function cuentas_por_cobrar()
{
return $this->hasOne(CuentasPorCobrar::class,'id','cuentacobrar_id')->select(['id','concepto']);
}
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','cuentacobrar_id','observacion','valor','formapago_id','imagen','concepto','fecha','fecha_vencimiento','num_factura'
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

