<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administradores extends Model
{ 
    protected $table = "administradores";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
    
public function usuarios()
{
return $this->hasOne(Usuarios::class,'id','usuario_id')->select(['id','email']);
}
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre','apellido','usuario_id','estado'
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

