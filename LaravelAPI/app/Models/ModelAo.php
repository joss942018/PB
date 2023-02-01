<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelAo extends Model
{ 
    protected $table = "model_año";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
public function año()
{
return $this->hasOne(Ao::class,'id','año_id')->select(['id','descripcion']);
}
public function modelos()
{
return $this->hasOne(Modelos::class,'id','modelo_id')->select(['id','nombre']);
}
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'año_id','modelo_id','estado'
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

