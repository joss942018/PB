<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware' => 'api'], function($router) {
    Route::get('/', function() {
        return response()->json([
            'message' => 'This is a simple example of item returned by your APIs. Everyone can see it.'
        ]);
    })->name('api.hello');
});

Route::group(['middleware' =>  ['jwt.auth'],'prefix' => 'auth'], function ($router) {
Route::post('/upload/file','App\Http\Controllers\Api\Auth\FileUploadController@upload')->name('api.auth.upload.file');
Route::post('/upload/image','App\Http\Controllers\Api\Auth\FileUploadController@uploadimage')->name('api.auth.upload.image');
    
Route::get('/usuarios', 'App\Http\Controllers\Api\Auth\UsuariosController@index')->name('api.auth.index.usuarios');
Route::get('/usuarios/{id}', 'App\Http\Controllers\Api\Auth\UsuariosController@show')->name('api.auth.show.usuarios');
Route::post('/usuarios', 'App\Http\Controllers\Api\Auth\UsuariosController@store')->name('api.auth.store.usuarios');
Route::put('/usuarios/{id}', 'App\Http\Controllers\Api\Auth\UsuariosController@update')->name('api.auth.update.usuarios');
Route::delete('/usuarios/{id}', 'App\Http\Controllers\Api\Auth\UsuariosController@destroy')->name('api.auth.delete.usuarios');
Route::get('/usuarios/search/{search}', 'App\Http\Controllers\Api\Auth\UsuariosController@search')->name('api.auth.search.usuarios');
Route::get('/tipos_caracteristicas', 'App\Http\Controllers\Api\Auth\TiposCaracteristicasController@index')->name('api.auth.index.tipos_caracteristicas');
Route::get('/tipos_caracteristicas/{id}', 'App\Http\Controllers\Api\Auth\TiposCaracteristicasController@show')->name('api.auth.show.tipos_caracteristicas');
Route::post('/tipos_caracteristicas', 'App\Http\Controllers\Api\Auth\TiposCaracteristicasController@store')->name('api.auth.store.tipos_caracteristicas');
Route::put('/tipos_caracteristicas/{id}', 'App\Http\Controllers\Api\Auth\TiposCaracteristicasController@update')->name('api.auth.update.tipos_caracteristicas');
Route::delete('/tipos_caracteristicas/{id}', 'App\Http\Controllers\Api\Auth\TiposCaracteristicasController@destroy')->name('api.auth.delete.tipos_caracteristicas');
Route::get('/tipos_caracteristicas/search/{search}', 'App\Http\Controllers\Api\Auth\TiposCaracteristicasController@search')->name('api.auth.search.tipos_caracteristicas');
Route::get('/roles', 'App\Http\Controllers\Api\Auth\RolesController@index')->name('api.auth.index.roles');
Route::get('/roles/{id}', 'App\Http\Controllers\Api\Auth\RolesController@show')->name('api.auth.show.roles');
Route::post('/roles', 'App\Http\Controllers\Api\Auth\RolesController@store')->name('api.auth.store.roles');
Route::put('/roles/{id}', 'App\Http\Controllers\Api\Auth\RolesController@update')->name('api.auth.update.roles');
Route::delete('/roles/{id}', 'App\Http\Controllers\Api\Auth\RolesController@destroy')->name('api.auth.delete.roles');
Route::get('/roles/search/{search}', 'App\Http\Controllers\Api\Auth\RolesController@search')->name('api.auth.search.roles');
Route::get('/polizas', 'App\Http\Controllers\Api\Auth\PolizasController@index')->name('api.auth.index.polizas');
Route::get('/polizas/{id}', 'App\Http\Controllers\Api\Auth\PolizasController@show')->name('api.auth.show.polizas');
Route::get('/polizasByUser', 'App\Http\Controllers\Api\Auth\PolizasController@getPolizasByUser')->name('api.auth.show.polizasByUser');
Route::post('/polizas', 'App\Http\Controllers\Api\Auth\PolizasController@store')->name('api.auth.store.polizas');
Route::put('/polizas/{id}', 'App\Http\Controllers\Api\Auth\PolizasController@update')->name('api.auth.update.polizas');
Route::delete('/polizas/{id}', 'App\Http\Controllers\Api\Auth\PolizasController@destroy')->name('api.auth.delete.polizas');
Route::get('/polizas/search/{search}', 'App\Http\Controllers\Api\Auth\PolizasController@search')->name('api.auth.search.polizas');
Route::get('/paquete_caracteristica', 'App\Http\Controllers\Api\Auth\PaqueteCaracteristicaController@index')->name('api.auth.index.paquete_caracteristica');
Route::get('/paquete_caracteristica/{id}', 'App\Http\Controllers\Api\Auth\PaqueteCaracteristicaController@show')->name('api.auth.show.paquete_caracteristica');
Route::post('/paquete_caracteristica', 'App\Http\Controllers\Api\Auth\PaqueteCaracteristicaController@store')->name('api.auth.store.paquete_caracteristica');
Route::put('/paquete_caracteristica/{id}', 'App\Http\Controllers\Api\Auth\PaqueteCaracteristicaController@update')->name('api.auth.update.paquete_caracteristica');
Route::delete('/paquete_caracteristica/{id}', 'App\Http\Controllers\Api\Auth\PaqueteCaracteristicaController@destroy')->name('api.auth.delete.paquete_caracteristica');
Route::get('/paquete_caracteristica/search/{search}', 'App\Http\Controllers\Api\Auth\PaqueteCaracteristicaController@search')->name('api.auth.search.paquete_caracteristica');
Route::get('/paquetes', 'App\Http\Controllers\Api\Auth\PaquetesController@index')->name('api.auth.index.paquetes');
Route::get('/paquetes/{id}', 'App\Http\Controllers\Api\Auth\PaquetesController@show')->name('api.auth.show.paquetes');
Route::post('/paquetes', 'App\Http\Controllers\Api\Auth\PaquetesController@store')->name('api.auth.store.paquetes');
Route::put('/paquetes/{id}', 'App\Http\Controllers\Api\Auth\PaquetesController@update')->name('api.auth.update.paquetes');
Route::delete('/paquetes/{id}', 'App\Http\Controllers\Api\Auth\PaquetesController@destroy')->name('api.auth.delete.paquetes');
Route::get('/paquetes/search/{search}', 'App\Http\Controllers\Api\Auth\PaquetesController@search')->name('api.auth.search.paquetes');
Route::get('/model_año', 'App\Http\Controllers\Api\Auth\ModelAoController@index')->name('api.auth.index.model_año');
Route::get('/model_año/{id}', 'App\Http\Controllers\Api\Auth\ModelAoController@show')->name('api.auth.show.model_año');
Route::post('/model_año', 'App\Http\Controllers\Api\Auth\ModelAoController@store')->name('api.auth.store.model_año');
Route::put('/model_año/{id}', 'App\Http\Controllers\Api\Auth\ModelAoController@update')->name('api.auth.update.model_año');
Route::delete('/model_año/{id}', 'App\Http\Controllers\Api\Auth\ModelAoController@destroy')->name('api.auth.delete.model_año');
Route::get('/model_año/search/{search}', 'App\Http\Controllers\Api\Auth\ModelAoController@search')->name('api.auth.search.model_año');
Route::get('/modelos', 'App\Http\Controllers\Api\Auth\ModelosController@index')->name('api.auth.index.modelos');
Route::get('/modelos/{id}', 'App\Http\Controllers\Api\Auth\ModelosController@show')->name('api.auth.show.modelos');
Route::post('/modelos', 'App\Http\Controllers\Api\Auth\ModelosController@store')->name('api.auth.store.modelos');
Route::put('/modelos/{id}', 'App\Http\Controllers\Api\Auth\ModelosController@update')->name('api.auth.update.modelos');
Route::delete('/modelos/{id}', 'App\Http\Controllers\Api\Auth\ModelosController@destroy')->name('api.auth.delete.modelos');
Route::get('/modelos/search/{search}', 'App\Http\Controllers\Api\Auth\ModelosController@search')->name('api.auth.search.modelos');
Route::get('/marcas', 'App\Http\Controllers\Api\Auth\MarcasController@index')->name('api.auth.index.marcas');
Route::get('/marcas/{id}', 'App\Http\Controllers\Api\Auth\MarcasController@show')->name('api.auth.show.marcas');
Route::post('/marcas', 'App\Http\Controllers\Api\Auth\MarcasController@store')->name('api.auth.store.marcas');
Route::put('/marcas/{id}', 'App\Http\Controllers\Api\Auth\MarcasController@update')->name('api.auth.update.marcas');
Route::delete('/marcas/{id}', 'App\Http\Controllers\Api\Auth\MarcasController@destroy')->name('api.auth.delete.marcas');
Route::get('/marcas/search/{search}', 'App\Http\Controllers\Api\Auth\MarcasController@search')->name('api.auth.search.marcas');
Route::get('/historicos_pagos', 'App\Http\Controllers\Api\Auth\HistoricosPagosController@index')->name('api.auth.index.historicos_pagos');
Route::get('/historicos_pagos/{id}', 'App\Http\Controllers\Api\Auth\HistoricosPagosController@show')->name('api.auth.show.historicos_pagos');
Route::post('/historicos_pagos', 'App\Http\Controllers\Api\Auth\HistoricosPagosController@store')->name('api.auth.store.historicos_pagos');
Route::put('/historicos_pagos/{id}', 'App\Http\Controllers\Api\Auth\HistoricosPagosController@update')->name('api.auth.update.historicos_pagos');
Route::delete('/historicos_pagos/{id}', 'App\Http\Controllers\Api\Auth\HistoricosPagosController@destroy')->name('api.auth.delete.historicos_pagos');
Route::get('/historicos_pagos/search/{search}', 'App\Http\Controllers\Api\Auth\HistoricosPagosController@search')->name('api.auth.search.historicos_pagos');
Route::get('/estados_civil', 'App\Http\Controllers\Api\Auth\EstadosCivilController@index')->name('api.auth.index.estados_civil');
Route::get('/estados_civil/{id}', 'App\Http\Controllers\Api\Auth\EstadosCivilController@show')->name('api.auth.show.estados_civil');
Route::post('/estados_civil', 'App\Http\Controllers\Api\Auth\EstadosCivilController@store')->name('api.auth.store.estados_civil');
Route::put('/estados_civil/{id}', 'App\Http\Controllers\Api\Auth\EstadosCivilController@update')->name('api.auth.update.estados_civil');
Route::delete('/estados_civil/{id}', 'App\Http\Controllers\Api\Auth\EstadosCivilController@destroy')->name('api.auth.delete.estados_civil');
Route::get('/estados_civil/search/{search}', 'App\Http\Controllers\Api\Auth\EstadosCivilController@search')->name('api.auth.search.estados_civil');
Route::get('/cuentas_por_cobrar', 'App\Http\Controllers\Api\Auth\CuentasPorCobrarController@index')->name('api.auth.index.cuentas_por_cobrar');
Route::get('/cuentas_por_cobrar/{id}', 'App\Http\Controllers\Api\Auth\CuentasPorCobrarController@show')->name('api.auth.show.cuentas_por_cobrar');
Route::post('/cuentas_por_cobrar', 'App\Http\Controllers\Api\Auth\CuentasPorCobrarController@store')->name('api.auth.store.cuentas_por_cobrar');
Route::put('/cuentas_por_cobrar/{id}', 'App\Http\Controllers\Api\Auth\CuentasPorCobrarController@update')->name('api.auth.update.cuentas_por_cobrar');
Route::delete('/cuentas_por_cobrar/{id}', 'App\Http\Controllers\Api\Auth\CuentasPorCobrarController@destroy')->name('api.auth.delete.cuentas_por_cobrar');
Route::get('/cuentas_por_cobrar/search/{search}', 'App\Http\Controllers\Api\Auth\CuentasPorCobrarController@search')->name('api.auth.search.cuentas_por_cobrar');
Route::get('/clientes', 'App\Http\Controllers\Api\Auth\ClientesController@index')->name('api.auth.index.clientes');
Route::get('/clientes/{id}', 'App\Http\Controllers\Api\Auth\ClientesController@show')->name('api.auth.show.clientes');
Route::post('/clientes', 'App\Http\Controllers\Api\Auth\ClientesController@store')->name('api.auth.store.clientes');
Route::put('/clientes/{id}', 'App\Http\Controllers\Api\Auth\ClientesController@update')->name('api.auth.update.clientes');
Route::delete('/clientes/{id}', 'App\Http\Controllers\Api\Auth\ClientesController@destroy')->name('api.auth.delete.clientes');
Route::get('/clientes/search/{search}', 'App\Http\Controllers\Api\Auth\ClientesController@search')->name('api.auth.search.clientes');
Route::get('/ciudades', 'App\Http\Controllers\Api\Auth\CiudadesController@index')->name('api.auth.index.ciudades');
Route::get('/ciudades/{id}', 'App\Http\Controllers\Api\Auth\CiudadesController@show')->name('api.auth.show.ciudades');
Route::post('/ciudades', 'App\Http\Controllers\Api\Auth\CiudadesController@store')->name('api.auth.store.ciudades');
Route::put('/ciudades/{id}', 'App\Http\Controllers\Api\Auth\CiudadesController@update')->name('api.auth.update.ciudades');
Route::delete('/ciudades/{id}', 'App\Http\Controllers\Api\Auth\CiudadesController@destroy')->name('api.auth.delete.ciudades');
Route::get('/ciudades/search/{search}', 'App\Http\Controllers\Api\Auth\CiudadesController@search')->name('api.auth.search.ciudades');
Route::get('/caracteristicas', 'App\Http\Controllers\Api\Auth\CaracteristicasController@index')->name('api.auth.index.caracteristicas');
Route::get('/caracteristicas/{id}', 'App\Http\Controllers\Api\Auth\CaracteristicasController@show')->name('api.auth.show.caracteristicas');
Route::post('/caracteristicas', 'App\Http\Controllers\Api\Auth\CaracteristicasController@store')->name('api.auth.store.caracteristicas');
Route::put('/caracteristicas/{id}', 'App\Http\Controllers\Api\Auth\CaracteristicasController@update')->name('api.auth.update.caracteristicas');
Route::delete('/caracteristicas/{id}', 'App\Http\Controllers\Api\Auth\CaracteristicasController@destroy')->name('api.auth.delete.caracteristicas');
Route::get('/caracteristicas/search/{search}', 'App\Http\Controllers\Api\Auth\CaracteristicasController@search')->name('api.auth.search.caracteristicas');
Route::get('/autos', 'App\Http\Controllers\Api\Auth\AutosController@index')->name('api.auth.index.autos');
Route::get('/autos/{id}', 'App\Http\Controllers\Api\Auth\AutosController@show')->name('api.auth.show.autos');
Route::post('/autos', 'App\Http\Controllers\Api\Auth\AutosController@store')->name('api.auth.store.autos');
Route::put('/autos/{id}', 'App\Http\Controllers\Api\Auth\AutosController@update')->name('api.auth.update.autos');
Route::delete('/autos/{id}', 'App\Http\Controllers\Api\Auth\AutosController@destroy')->name('api.auth.delete.autos');
Route::get('/autos/search/{search}', 'App\Http\Controllers\Api\Auth\AutosController@search')->name('api.auth.search.autos');
Route::get('/aseguradoras', 'App\Http\Controllers\Api\Auth\AseguradorasController@index')->name('api.auth.index.aseguradoras');
Route::get('/aseguradoras/{id}', 'App\Http\Controllers\Api\Auth\AseguradorasController@show')->name('api.auth.show.aseguradoras');
Route::post('/aseguradoras', 'App\Http\Controllers\Api\Auth\AseguradorasController@store')->name('api.auth.store.aseguradoras');
Route::put('/aseguradoras/{id}', 'App\Http\Controllers\Api\Auth\AseguradorasController@update')->name('api.auth.update.aseguradoras');
Route::delete('/aseguradoras/{id}', 'App\Http\Controllers\Api\Auth\AseguradorasController@destroy')->name('api.auth.delete.aseguradoras');
Route::get('/aseguradoras/search/{search}', 'App\Http\Controllers\Api\Auth\AseguradorasController@search')->name('api.auth.search.aseguradoras');
Route::get('/administradores', 'App\Http\Controllers\Api\Auth\AdministradoresController@index')->name('api.auth.index.administradores');
Route::get('/administradores/{id}', 'App\Http\Controllers\Api\Auth\AdministradoresController@show')->name('api.auth.show.administradores');
Route::post('/administradores', 'App\Http\Controllers\Api\Auth\AdministradoresController@store')->name('api.auth.store.administradores');
Route::put('/administradores/{id}', 'App\Http\Controllers\Api\Auth\AdministradoresController@update')->name('api.auth.update.administradores');
Route::delete('/administradores/{id}', 'App\Http\Controllers\Api\Auth\AdministradoresController@destroy')->name('api.auth.delete.administradores');
Route::get('/administradores/search/{search}', 'App\Http\Controllers\Api\Auth\AdministradoresController@search')->name('api.auth.search.administradores');
Route::get('/año', 'App\Http\Controllers\Api\Auth\AoController@index')->name('api.auth.index.año');
Route::get('/año/{id}', 'App\Http\Controllers\Api\Auth\AoController@show')->name('api.auth.show.año');
Route::post('/año', 'App\Http\Controllers\Api\Auth\AoController@store')->name('api.auth.store.año');
Route::put('/año/{id}', 'App\Http\Controllers\Api\Auth\AoController@update')->name('api.auth.update.año');
Route::delete('/año/{id}', 'App\Http\Controllers\Api\Auth\AoController@destroy')->name('api.auth.delete.año');
Route::get('/año/search/{search}', 'App\Http\Controllers\Api\Auth\AoController@search')->name('api.auth.search.año');

   
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/publicregister', [AuthController::class, 'publicRegister']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

Route::get('exportExcel','App\Http\Controllers\Api\Auth\ExportDatosController@exportExcel')->name('exportExcel');

Route::get('exportPolizasAdquiridas','App\Http\Controllers\Api\Auth\ExportDatosController@exportPolizasAdquiridas')->name('exportPolizasAdquiridas');
Route::get('exportPolizasPorVencer','App\Http\Controllers\Api\Auth\ExportDatosController@exportPolizasPorVencer')->name('exportPolizasPorVencer');
Route::get('exportPolizasAprobadas','App\Http\Controllers\Api\Auth\ExportDatosController@exportPolizasAprobadas')->name('exportPolizasAprobadas');
Route::get('exportPolizasNoAprobadas','App\Http\Controllers\Api\Auth\ExportDatosController@exportPolizasNoAprobadas')->name('exportPolizasNoAprobadas');
Route::get('exportPolizasPendientes','App\Http\Controllers\Api\Auth\ExportDatosController@exportPolizasPendientes')->name('exportPolizasPendientes');
Route::get('exportPolizasTotales','App\Http\Controllers\Api\Auth\ExportDatosController@exportPolizasTotales')->name('exportPolizasTotales');
Route::get('exportPolizasPorMarca','App\Http\Controllers\Api\Auth\ExportDatosController@exportPolizasPorMarca')->name('exportPolizasPorMarca');







