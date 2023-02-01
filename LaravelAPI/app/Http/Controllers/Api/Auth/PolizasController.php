<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Autos;
use App\Models\Polizas;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request; 
use App\Models\Clientes;

class PolizasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
        
            $polizas = Polizas::with(['paquetes'])->paginate($request->paginator);
            if ($polizas) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $polizas
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
                'message' => "Failed to get polizas, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }


    public function getPolizasByUser(Request $request)
    {
        try {
            $cliente = Clientes::where('usuario_id', auth()->user()->id)->first();
            $autosArray  = Autos::where('cliente_id', $cliente->id)
                            ->with(['marcas']) 
                            ->with(['año']) 
                            ->with(['modelos'])    
                            ->get()
                            ->toArray();
            $autoStore  = array();
            foreach($autosArray as $auto)
            {       
                if(isset($auto['id'])){
                    $auto_id = $auto['id'];
                    $polizas = Polizas::where('auto_id', $auto_id)
                                    ->with(['paquetes'])
                                    ->get()->toArray();
                    $auto['polizas'] = array();
                    $auto['polizas'] = $polizas ;
                    array_push($autoStore, $auto);
                }
                
            }
            return $autoStore;
            if ($polizas) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $autoStore
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
                'message' => "Failed to get polizas, please try again. {$exception->getMessage()}"
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
            $polizas = Polizas::create($request->all());
            $polizas->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $polizas
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store polizas, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','valor','fecha_vigencia','paquete_id','auto_id'];
            $polizas = Polizas::with(['paquetes'])->where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($polizas) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $polizas
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
                'message' => "Failed to get polizas, please try again. {$exception->getMessage()}"
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
            $polizas = Polizas::with(['paquetes'])->where('id', '=', $id)->first();
            if ($polizas) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $polizas
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
                'message' => "Failed to get polizas data, please try again. {$exception->getMessage()}"
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

            $polizas = Polizas::find($id);

           $polizas->valor = $input['valor'];$polizas->fecha_vigencia = $input['fecha_vigencia'];$polizas->paquete_id = $input['paquete_id'];$polizas->auto_id = $input['auto_id'];

            $res = $polizas->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $polizas
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update polizas"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update polizas, please try again. {$exception->getMessage()}"
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
            $res = Polizas::find($id)->delete();
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
                    'data' => "Failed to delete polizas"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete polizas, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

