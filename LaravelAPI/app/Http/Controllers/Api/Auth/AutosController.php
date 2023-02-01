<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Autos;
use App\Models\Usuarios;
use App\Models\Clientes;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class AutosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {  
            $userRol = Usuarios::where('id', auth()->user()->id)->pluck('rol')->first();
            $cliente = Clientes::where('usuario_id', auth()->user()->id)
                                    ->pluck('id')
                                    ->first();
        
            if($userRol == "Cliente")
            {
                $clienteId = Clientes::where('usuario_id', auth()->user()->id)
                                    ->pluck('id')
                                    ->firts();
                $autos = Autos::join('clientes', 'autos.cliente_id', '=', 'clientes.id')
                ->join('modelos', 'autos.modelo_id', '=', 'modelos.id')
                ->select('autos.*','clientes.*', 'modelos.*')
                ->where("cliente_id", $clienteId)
                ->with(['marcas','año','clientes','modelos'])->paginate($request->paginator);
            }else{                
                $autos = Autos::join('clientes', 'autos.cliente_id', '=', 'clientes.id')
                ->join('modelos', 'autos.modelo_id', '=', 'modelos.id')
                ->select('autos.*','clientes.*', 'modelos.*')
                ->with(['marcas','año','clientes','modelos'])
                ->where("cliente_id", $request->clientId)
                ->paginate($request->paginator);
            }      
            if ($autos) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $autos
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
                'message' => "Failed to get autos, please try again. {$exception->getMessage()}"
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
            $autos = Autos::create($request->all());
            $autos->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $autos
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store autos, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search($search, Request $request)    {
        try {
            $searchQuery = trim($search);
            $requestData = ['marca_id','modelo_id','año_id','cliente_id', 'clientes.identificacion','clientes.nombres', 'clientes.apellidos', 'clientes.genero'];
            $autos = Autos::join('clientes', 'autos.cliente_id', '=', 'clientes.id')
                            ->with(['marcas','año','clientes','modelos'])
                            ->where(function ($q) use ($requestData, $searchQuery) {
                            foreach ($requestData as $field)
                                $q->orWhere($field, 'like', "%{$searchQuery}%");
                            })->paginate($request->paginator, ['*'], 'page', $request->page);

            if ($autos) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $autos
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
                'message' => "Failed to get autos, please try again. {$exception->getMessage()}"
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
            $autos = Autos::with(['marcas','año','clientes'])->where('id', '=', $id)->first();
            if ($autos) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $autos
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
                'message' => "Failed to get autos data, please try again. {$exception->getMessage()}"
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

            $autos = Autos::find($id);

           $autos->id = $input['id'];$autos->marca_id = $input['marca_id'];$autos->modelo_id = $input['modelo_id'];$autos->año_id = $input['año_id'];$autos->cliente_id = $input['cliente_id'];

            $res = $autos->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $autos
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update autos"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update autos, please try again. {$exception->getMessage()}"
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
            $res = Autos::find($id)->delete();
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
                    'data' => "Failed to delete autos"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete autos, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

