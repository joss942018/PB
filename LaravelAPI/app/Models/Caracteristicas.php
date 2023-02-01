<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caracteristicas extends Model
{ 
    protected $table = "caracteristicas";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
public function tipos_caracteristicas()
{
return $this->hasOne(TiposCaracteristicas::class,'id','tipo_id')->select(['id','nombre']);
}
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre','tipo_id','estado'
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

