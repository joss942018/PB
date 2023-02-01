import { combineReducers } from "redux";

import template from "redux/slices/template";
import authToken from "redux/slices/auth";

import usuarios from "redux/slices/usuarios";
import tipos_caracteristicas from "redux/slices/tipos_caracteristicas";
import roles from "redux/slices/roles";
import polizas from "redux/slices/polizas";
import paquete_caracteristica from "redux/slices/paquete_caracteristica";
import paquetes from "redux/slices/paquetes";
import model_año from "redux/slices/model_año";
import modelos from "redux/slices/modelos";
import marcas from "redux/slices/marcas";
import historicos_pagos from "redux/slices/historicos_pagos";
import estados_civil from "redux/slices/estados_civil";
import cuentas_por_cobrar from "redux/slices/cuentas_por_cobrar";
import clientes from "redux/slices/clientes";
import ciudades from "redux/slices/ciudades";
import caracteristicas from "redux/slices/caracteristicas";
import autos from "redux/slices/autos";
import aseguradoras from "redux/slices/aseguradoras";
import administradores from "redux/slices/administradores";
import año from "redux/slices/año";


const rootReducer = combineReducers({ template,authToken,usuarios,tipos_caracteristicas,roles,polizas,paquete_caracteristica,paquetes,model_año,modelos,marcas,historicos_pagos,estados_civil,cuentas_por_cobrar,clientes,ciudades,caracteristicas,autos,aseguradoras,administradores,año });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

