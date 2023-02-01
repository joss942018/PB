<?php
namespace App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Controller;
//el otro no es lo cambie al api 

use App\Models\Polizas;
use App\Models\Usuarios;
use App\Models\Autos;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request; 
use App\Models\Clientes;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PollizasUsersxport;
use Illuminate\Support\Facades\DB;

class ExportDatosController extends Controller{

    public function exportExcel(Request $request){
        
        $idCliente = $request->idCliente;
        $idCliente = '117';
        $cliente = Clientes::where('usuario_id', $idCliente)->first();
        $file="Reporte de Polizas por Clientes";
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
               // dd($auto['marcas']['nombre']);

                 array_push($data, array(
                     $auto['marcas']['nombre'], $auto['modelos']['nombre'],$auto['año']['descripcion']
                 ));
                $polizas = Polizas::where('auto_id', $auto_id)
                                ->with(['paquetes'])
                                ->get()->toArray();
                //dd($polizas);
                array_push($data, array(
                    "Valor", "Fecha Vigencia","Estado","paquetes.nombre"
                ));
                foreach ($polizas as $row){
                $vacio = "";
                array_push($data, array(
                        $row['valor'],
                        $row['fecha_vigencia'],
                        $row['estado'],
                        $row['paquetes']['nombre'],
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
    public function exportPolizasAdquiridas(Request $request){

        $fechaVencimiento = '2025-10-11';

        $file="REPORTE DE POLIZAS AQUIRIDA";
        $data=array(
            array(" ", " ","REPORTE DE POLIZAS AQUIRIDAS"," "," ", " ")
            
        );
        array_push($data, array(
            array("-", "-","-","-","-", "-" )
        ));
        array_push($data, array(
            array("Nombre Paquete", "Usuario","Fecha Adquisición","Auto","Fecha Vencimiento", "Estado")
        ));
    
        
        
        $consulta = DB::table('polizas')
                        ->select('paquetes.nombre as nombre_paquete',
                            DB::raw('CONCAT(clientes.nombres, " ",clientes.apellidos) as Usuario'), 
                            DB::raw('date_sub(polizas.fecha_vigencia, interval 1 YEAR) as Fecha_Adquisicion'), 
                            DB::raw('CONCAT(marcas.nombre, " ", modelos.nombre, " ",año.descripcion ) as Auto'),
                            'polizas.fecha_vigencia as Fecha_Vencimiento', 'polizas.estado as Estado_paquetes')
                        ->join('paquetes','polizas.paquete_id', '=', 'paquetes.id')
                        ->join('clientes', 'clientes.usuario_id', '=', 'polizas.user_id')
                        ->join('autos', 'polizas.auto_id', '=', 'autos.id')
                        ->join('marcas' , 'marcas.id' ,'=', 'autos.marca_id')
                        ->join('modelos' , 'modelos.id', '=', 'autos.modelo_id')
                        ->join('año' , 'año.id', '=' ,'autos.año_id')
                        ->where('polizas.estado', '=', 'Aprobado')
                        ->where('polizas.fecha_vigencia','<', $fechaVencimiento)
                        ->get();
                        
         
        foreach ($consulta as $row){
           
            array_push($data, array(
                    $row->nombre_paquete,
                    $row->Usuario,
                    $row->Fecha_Adquisicion,
                    $row->Auto,
                    $row->Fecha_Vencimiento,
                    $row->Estado_paquetes,
                ));
            }

 
        $export = new PollizasUsersxport($data);
        return Excel::download($export, $file.'.xlsx');
    }

    public function exportPolizasPorVencer(Request $request){
    
        $fechaInicio = $request->fecha_vigencia;
        $fechaFin= $request->fecha_fin;
        $fechaInicio = '2025-10-9';
        $fechaFin = '2025-11-11';

        $file="Reporte de Polizas por Vencer";
      
        $data=array(
            array(" ", " ","REPORTE DE POLIZAS POR VENCER"," "," ", " ")
            
        );
        array_push($data, array(
            array("-", "-","-","-","-", "-" )
        ));
        array_push($data, array(
            array("Nombre Paquete", "Usuario","Fecha Adquisición","Auto","Fecha Vencimiento", "Estado")
        ));
    

        $consulta = DB::table('polizas')
                        ->select('paquetes.nombre as nombre_paquete',
                            DB::raw('CONCAT(clientes.nombres, " ",clientes.apellidos) as Usuario'), 
                            DB::raw('date_sub(polizas.fecha_vigencia, interval 1 YEAR) as Fecha_Adquisicion'), 
                            DB::raw('CONCAT(marcas.nombre, " ", modelos.nombre, " ",año.descripcion ) as Auto'),
                            'polizas.fecha_vigencia as Fecha_Vencimiento', 'polizas.estado as Estado_paquetes')
                        ->join('paquetes','polizas.paquete_id', '=', 'paquetes.id')
                        ->join('clientes', 'clientes.usuario_id', '=', 'polizas.user_id')
                        ->join('autos', 'polizas.auto_id', '=', 'autos.id')
                        ->join('marcas' , 'marcas.id' ,'=', 'autos.marca_id')
                        ->join('modelos' , 'modelos.id', '=', 'autos.modelo_id')
                        ->join('año' , 'año.id', '=' ,'autos.año_id')
                        ->where('polizas.estado', '=', 'Aprobado')
                        ->where('polizas.fecha_vigencia','>',$fechaInicio)
                        ->where('polizas.fecha_vigencia','<',$fechaFin)
                        ->get();
                        
         
        foreach ($consulta as $row){
            $vacio = "";
            array_push($data, array(
                    $row->nombre_paquete,
                    $row->Usuario,
                    $row->Fecha_Adquisicion,
                    $row->Auto,
                    $row->Fecha_Vencimiento,
                    $row->Estado_paquetes,
                ));
            }

 
        $export = new PollizasUsersxport($data);
        return Excel::download($export, $file.'.xlsx');
    }
    
    public function exportPolizasAprobadas(Request $request){
      
        $file="Reporte de Polizas Aprobadas";
       
        $data=array(
            array(" ", " ","REPORTE DE POLIZAS APROBADAS"," "," ", " ")
            
        );
        array_push($data, array(
            array("-", "-","-","-","-", "-" )
        ));
        array_push($data, array(
            array("Nombre Paquete", "Usuario","Fecha Adquisición","Auto","Fecha Vencimiento", "Estado")
        ));
    

        $consulta = DB::table('polizas')
                        ->select('paquetes.nombre as nombre_paquete',
                            DB::raw('CONCAT(clientes.nombres, " ",clientes.apellidos) as Usuario'), 
                            DB::raw('date_sub(polizas.fecha_vigencia, interval 1 YEAR) as Fecha_Adquisicion'), 
                            DB::raw('CONCAT(marcas.nombre, " ", modelos.nombre, " ",año.descripcion ) as Auto'),
                            'polizas.fecha_vigencia as Fecha_Vencimiento', 'polizas.estado as Estado_paquetes')
                        ->join('paquetes','polizas.paquete_id', '=', 'paquetes.id')
                        ->join('clientes', 'clientes.usuario_id', '=', 'polizas.user_id')
                        ->join('autos', 'polizas.auto_id', '=', 'autos.id')
                        ->join('marcas' , 'marcas.id' ,'=', 'autos.marca_id')
                        ->join('modelos' , 'modelos.id', '=', 'autos.modelo_id')
                        ->join('año' , 'año.id', '=' ,'autos.año_id')
                        ->where('polizas.estado', '=', 'Aprobado')
                        ->get();
                        
         
        foreach ($consulta as $row){
            $vacio = "";
            array_push($data, array(
                    $row->nombre_paquete,
                    $row->Usuario,
                    $row->Fecha_Adquisicion,
                    $row->Auto,
                    $row->Fecha_Vencimiento,
                    $row->Estado_paquetes,
                ));
            }

 
        $export = new PollizasUsersxport($data);
        return Excel::download($export, $file.'.xlsx');
    }
    public function exportPolizasNoAprobadas(Request $request){
 
 
        $file="Reporte de Polizas No Aprobadas";
  
        $data=array(
            array(" ", " ","REPORTE DE POLIZAS NO APROBADAS"," "," ", " ")
            
        );
        array_push($data, array(
            array("-", "-","-","-","-", "-" )
        ));
        array_push($data, array(
            array("Nombre Paquete", "Usuario","Fecha Adquisición","Auto","Fecha Vencimiento", "Estado")
        ));
    
        $consulta = DB::table('polizas')
                        ->select('paquetes.nombre as nombre_paquete',
                            DB::raw('CONCAT(clientes.nombres, " ",clientes.apellidos) as Usuario'), 
                            DB::raw('date_sub(polizas.fecha_vigencia, interval 1 YEAR) as Fecha_Adquisicion'), 
                            DB::raw('CONCAT(marcas.nombre, " ", modelos.nombre, " ",año.descripcion ) as Auto'),
                            'polizas.fecha_vigencia as Fecha_Vencimiento', 'polizas.estado as Estado_paquetes')
                        ->join('paquetes','polizas.paquete_id', '=', 'paquetes.id')
                        ->join('clientes', 'clientes.usuario_id', '=', 'polizas.user_id')
                        ->join('autos', 'polizas.auto_id', '=', 'autos.id')
                        ->join('marcas' , 'marcas.id' ,'=', 'autos.marca_id')
                        ->join('modelos' , 'modelos.id', '=', 'autos.modelo_id')
                        ->join('año' , 'año.id', '=' ,'autos.año_id')
                        ->where('polizas.estado', '=', 'No Aprobado')
                        ->get();
                        
         
        foreach ($consulta as $row){
            $vacio = "";
            array_push($data, array(
                    $row->nombre_paquete,
                    $row->Usuario,
                    $row->Fecha_Adquisicion,
                    $row->Auto,
                    $row->Fecha_Vencimiento,
                    $row->Estado_paquetes,
                ));
            }

 
        $export = new PollizasUsersxport($data);
        return Excel::download($export, $file.'.xlsx');
    }

    public function exportPolizasPendientes(Request $request){
        
          $file="Reporte de Polizas Pendientes";
      
        $data=array(
            array(" ", " ","REPORTE DE POLIZAS PENDIENTES DE PAGO"," "," ", " ")
            
        );
        array_push($data, array(
            array("-", "-","-","-","-", "-" )
        ));
        array_push($data, array(
            array("Nombre Paquete", "Usuario","Fecha Adquisición","Auto","Fecha Vencimiento", "Estado")
        ));
    
        $consulta = DB::table('polizas')
                        ->select('paquetes.nombre as nombre_paquete',
                            DB::raw('CONCAT(clientes.nombres, " ",clientes.apellidos) as Usuario'), 
                            DB::raw('date_sub(polizas.fecha_vigencia, interval 1 YEAR) as Fecha_Adquisicion'), 
                            DB::raw('CONCAT(marcas.nombre, " ", modelos.nombre, " ",año.descripcion ) as Auto'),
                            'polizas.fecha_vigencia as Fecha_Vencimiento', 'polizas.estado as Estado_paquetes')
                        ->join('paquetes','polizas.paquete_id', '=', 'paquetes.id')
                        ->join('clientes', 'clientes.usuario_id', '=', 'polizas.user_id')
                        ->join('autos', 'polizas.auto_id', '=', 'autos.id')
                        ->join('marcas' , 'marcas.id' ,'=', 'autos.marca_id')
                        ->join('modelos' , 'modelos.id', '=', 'autos.modelo_id')
                        ->join('año' , 'año.id', '=' ,'autos.año_id')
                        ->where('polizas.estado', '=', 'Pendiente')
                        ->get();
                        
      
        foreach ($consulta as $row){
            $vacio = "";
            array_push($data, array(
                    $row->nombre_paquete,
                    $row->Usuario,
                    $row->Fecha_Adquisicion,
                    $row->Auto,
                    $row->Fecha_Vencimiento,
                    $row->Estado_paquetes,
                ));
            }

 
        $export = new PollizasUsersxport($data);
        return Excel::download($export, $file.'.xlsx');
    }

    public function exportPolizasTotales(Request $request){
        $file="Reportes totales de Polizas";
        
        $data=array(
            array(" ", " ","REPORTE TOTAL DE POLIZAS"," "," ", " ")
            
        );
        array_push($data, array(
            array("-", "-","-","-","-", "-" )
        ));
        array_push($data, array(
            array("Nombre Paquete", "Usuario","Fecha Adquisición","Auto","Fecha Vencimiento", "Estado")
        ));
        $consulta = DB::table('polizas')
                        ->select('paquetes.nombre as nombre_paquete',
                            DB::raw('CONCAT(clientes.nombres, " ",clientes.apellidos) as Usuario'), 
                            DB::raw('date_sub(polizas.fecha_vigencia, interval 1 YEAR) as Fecha_Adquisicion'), 
                            DB::raw('CONCAT(marcas.nombre, " ", modelos.nombre, " ",año.descripcion ) as Auto'),
                            'polizas.fecha_vigencia as Fecha_Vencimiento', 'polizas.estado as Estado_paquetes')
                        ->join('paquetes','polizas.paquete_id', '=', 'paquetes.id')
                        ->join('clientes', 'clientes.usuario_id', '=', 'polizas.user_id')
                        ->join('autos', 'polizas.auto_id', '=', 'autos.id')
                        ->join('marcas' , 'marcas.id' ,'=', 'autos.marca_id')
                        ->join('modelos' , 'modelos.id', '=', 'autos.modelo_id')
                        ->join('año' , 'año.id', '=' ,'autos.año_id')
                    
                        ->get();
                        
         
        foreach ($consulta as $row){
            $vacio = "";
            array_push($data, array(
                    $row->nombre_paquete,
                    $row->Usuario,
                    $row->Fecha_Adquisicion,
                    $row->Auto,
                    $row->Fecha_Vencimiento,
                    $row->Estado_paquetes,
                ));
            }

 
        $export = new PollizasUsersxport($data);
        return Excel::download($export, $file.'.xlsx');
    }

    public function exportPolizasPorMarca(Request $request){
        
        $marcaAuto = $request->marcaAutoId;
        $marcaAuto = '1';

        $file="Reporte por Marca de Auto";
       
        $data=array(
            array(" ", " ","REPORTE POLIZAS POR MARCA DE AUTO"," "," ", " ")
            
        );
        array_push($data, array(
            array("-", "-","-","-","-", "-" )
        ));
        array_push($data, array(
            array("Nombre Paquete", "Usuario","Fecha Adquisición","Auto","Fecha Vencimiento", "Estado")
        ));
        $consulta = DB::table('polizas')
                        ->select('paquetes.nombre as nombre_paquete',
                            DB::raw('CONCAT(clientes.nombres, " ",clientes.apellidos) as Usuario'), 
                            DB::raw('date_sub(polizas.fecha_vigencia, interval 1 YEAR) as Fecha_Adquisicion'), 
                            DB::raw('CONCAT(marcas.nombre, " ", modelos.nombre, " ",año.descripcion ) as Auto'),
                            'polizas.fecha_vigencia as Fecha_Vencimiento', 'polizas.estado as Estado_paquetes')
                        ->join('paquetes','polizas.paquete_id', '=', 'paquetes.id')
                        ->join('clientes', 'clientes.usuario_id', '=', 'polizas.user_id')
                        ->join('autos', 'polizas.auto_id', '=', 'autos.id')
                        ->join('marcas' , 'marcas.id' ,'=', 'autos.marca_id')
                        ->join('modelos' , 'modelos.id', '=', 'autos.modelo_id')
                        ->join('año' , 'año.id', '=' ,'autos.año_id')
                        ->where('marcas.id','=', $marcaAuto)
                        ->get();
                        
         
        foreach ($consulta as $row){
            $vacio = "";
            array_push($data, array(
                    $row->nombre_paquete,
                    $row->Usuario,
                    $row->Fecha_Adquisicion,
                    $row->Auto,
                    $row->Fecha_Vencimiento,
                    $row->Estado_paquetes,
                ));
            }

 
        $export = new PollizasUsersxport($data);
        return Excel::download($export, $file.'.xlsx');
    }

}