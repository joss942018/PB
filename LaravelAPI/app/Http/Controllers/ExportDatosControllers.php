<?php
namespace App\Http\Controllers;
use App\Models\Polizas;
use App\Models\Usuarios;
use App\Models\Autos;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request; 
use App\Models\Clientes;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PollizasUsersxport;

class ExportDatosController extends Controller{

    public function exportExcel(Request $request){
        
        $idCliente = $request->idCliente;
        $idCliente = '117';
        $cliente = Clientes::where('usuario_id', $idCliente)->first();
        $file="Archivo";
        $data=array(
            array("Polizas By User", $cliente->nombres,"","")
        );

        $autosArray  = Autos::where('cliente_id', $cliente->id)
                            ->with(['marcas']) 
                            ->with(['año']) 
                            ->with(['modelos'])    
                            ->get()
                            ->toArray();

        $autoStore  = array();
        foreach($autosArray as $auto)
        {       
            array_push($data, array(
                "Marca", "Modelo","Año",""
            ));
            if(isset($auto['id'])){
                $auto_id = $auto['id'];
                array_push($data, array(
                    "$auto->marcas['nombre']", "$auto->modelos['nombre']","$auto->año['descripcion']",""
                ));
                $polizas = Polizas::where('auto_id', $auto_id)
                                ->with(['paquetes'])
                                ->get()->toArray();
                
                foreach ($polizas as $row){
                $vacio = "";
                array_push($data, array(
                        $row->valor,
                        $row->fecha_vigencia,
                        $row->estado,
                        $row->nombrePaquete,
                    ));
                }

                
                    // $auto['polizas'] = array();
                    // $auto['polizas'] = $polizas ;
                    // array_push($autoStore, $auto);
            }
            
        }                    
        

        

    //    $polizasByUser = Polizas::join('paquetes','paquetes.id','=', 'polizas.paquete_id')
    //                             ->select('valor','fecha_vigencia', 'estado', 'paquetes.nombre as nombrePaquete')->get();

    //     foreach ($polizasByUser as $row){
    //    $vacio = "";
    //        array_push($data, array(
    //             $row->valor,
    //             $row->fecha_vigencia,
    //             $row->estado,
    //             $row->nombrePaquete,
    //         ));
    //     }

        $export = new PollizasUsersxport($data);
        return Excel::download($export, $file.'.xlsx');
    }
}