<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\CuentasPorCobrar;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CuentasPorCobrarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
        
            $cuentas_por_cobrar = CuentasPorCobrar::with(['clientes','paquetes'])->paginate($request->paginator);
            if ($cuentas_por_cobrar) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $cuentas_por_cobrar
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
                'message' => "Failed to get cuentas_por_cobrar, please try again. {$exception->getMessage()}"
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
            $cuentas_por_cobrar = CuentasPorCobrar::create($request->all());
            $cuentas_por_cobrar->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $cuentas_por_cobrar
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store cuentas_por_cobrar, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','concepto','saldo','cliente_id','credito','debito','comprobante_id','fecha_vencimiento','fecha_emision','status','valor_comprobante','comprobante_img','fecha_comprobante','num_factura','paquete_id'];
            $cuentas_por_cobrar = CuentasPorCobrar::with(['clientes','paquetes'])->where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($cuentas_por_cobrar) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $cuentas_por_cobrar
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
                'message' => "Failed to get cuentas_por_cobrar, please try again. {$exception->getMessage()}"
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
            $cuentas_por_cobrar = CuentasPorCobrar::with(['clientes','paquetes'])->where('id', '=', $id)->first();
            if ($cuentas_por_cobrar) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $cuentas_por_cobrar
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
                'message' => "Failed to get cuentas_por_cobrar data, please try again. {$exception->getMessage()}"
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

            $cuentas_por_cobrar = CuentasPorCobrar::find($id);

           $cuentas_por_cobrar->concepto = $input['concepto'];$cuentas_por_cobrar->saldo = $input['saldo'];$cuentas_por_cobrar->cliente_id = $input['cliente_id'];$cuentas_por_cobrar->credito = $input['credito'];$cuentas_por_cobrar->debito = $input['debito'];$cuentas_por_cobrar->comprobante_id = $input['comprobante_id'];$cuentas_por_cobrar->fecha_vencimiento = $input['fecha_vencimiento'];$cuentas_por_cobrar->fecha_emision = $input['fecha_emision'];$cuentas_por_cobrar->status = $input['status'];$cuentas_por_cobrar->valor_comprobante = $input['valor_comprobante'];$cuentas_por_cobrar->comprobante_img = $input['comprobante_img'];$cuentas_por_cobrar->fecha_comprobante = $input['fecha_comprobante'];$cuentas_por_cobrar->num_factura = $input['num_factura'];$cuentas_por_cobrar->paquete_id = $input['paquete_id'];

            $res = $cuentas_por_cobrar->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $cuentas_por_cobrar
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update cuentas_por_cobrar"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update cuentas_por_cobrar, please try again. {$exception->getMessage()}"
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
            $res = CuentasPorCobrar::find($id)->delete();
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
                    'data' => "Failed to delete cuentas_por_cobrar"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete cuentas_por_cobrar, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

