<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuario';

     protected $primaryKey = 'idUsuario';

     protected $fillable = [

        'idUsuario',
        'idTercero',
        'codigo',
        'clave',
        'estado'
    ];

  /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];
}
