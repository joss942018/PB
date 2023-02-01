<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuentasPorCobrar extends Model
{ 
    protected $table = "cuentas_por_cobrar";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
public function clientes()
{
return $this->hasOne(Clientes::class,'id','cliente_id')->select(['id','identificacion']);
}
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
        'concepto','saldo','cliente_id','credito','debito','comprobante_id','fecha_vencimiento','fecha_emision','status','valor_comprobante','comprobante_img','fecha_comprobante','num_factura','paquete_id'
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

