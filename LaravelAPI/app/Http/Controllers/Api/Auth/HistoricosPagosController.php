<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\HistoricosPagos;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class HistoricosPagosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
        
            $historicos_pagos = HistoricosPagos::with(['cuentas_por_cobrar'])->paginate($request->paginator);
            if ($historicos_pagos) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $historicos_pagos
                ], 200);
            } else {
                return response([
                    'status' => 'error',
                    'code' => 0,
                    'data' => "No record found"
                ], 404);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to get historicos_pagos, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $historicos_pagos = HistoricosPagos::create($request->all());
            $historicos_pagos->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $historicos_pagos
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store historicos_pagos, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search($search, Request $request)
    {
        try {
            $searchQuery = trim($search);
            $requestData = ['id','cuentacobrar_id','observacion','valor','formapago_id','imagen','concepto','fecha','fecha_vencimiento','num_factura'];
            $historicos_pagos = HistoricosPagos::with(['cuentas_por_cobrar'])->where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($historicos_pagos) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $historicos_pagos
                ], 200);
            } else {
                return response([
                    'status' => 'error',
                    'code' => 0,
                    'data' => "No record found"
                ], 404);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to get historicos_pagos, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $historicos_pagos = HistoricosPagos::with(['cuentas_por_cobrar'])->where('id', '=', $id)->first();
            if ($historicos_pagos) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $historicos_pagos
                ], 200);
            } else {

                return response([
                    'status' => 'error',
                    'code' => 0,
                    'message' => "No record found"
                ], 404);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to get historicos_pagos data, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $input = $request->all();

            $historicos_pagos = HistoricosPagos::find($id);

           $historicos_pagos->id = $input['id'];$historicos_pagos->cuentacobrar_id = $input['cuentacobrar_id'];$historicos_pagos->observacion = $input['observacion'];$historicos_pagos->valor = $input['valor'];$historicos_pagos->formapago_id = $input['formapago_id'];$historicos_pagos->imagen = $input['imagen'];$historicos_pagos->concepto = $input['concepto'];$historicos_pagos->fecha = $input['fecha'];$historicos_pagos->fecha_vencimiento = $input['fecha_vencimiento'];$historicos_pagos->num_factura = $input['num_factura'];

            $res = $historicos_pagos->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $historicos_pagos
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update historicos_pagos"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update historicos_pagos, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $res = HistoricosPagos::find($id)->delete();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'message' => "Deleted successfully"
                ], 200);
            } else {
                return response([
                    'status' => 'error',
                    'code' => 0,
                    'data' => "Failed to delete historicos_pagos"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete historicos_pagos, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

