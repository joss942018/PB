import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./login";
import Register from "./register";
import AuthenticatedRoute from "components/auth";
import { Dashboard } from "components/dashboard";
import { FileUpload } from "components/upload";
import { NotFound } from "./404";
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
import { Usuarios, Tipos_Caracteristicas, Roles, Polizas, Paquete_Caracteristica, Paquetes, Model_Año, Modelos, Marcas, Historicos_Pagos, Estados_Civil, Cuentas_Por_Cobrar, Clientes, Ciudades, Caracteristicas, Autos, Aseguradoras, Administradores, Año} from "components";
const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/dashboard" element={<AuthenticatedRoute element={<Dashboard />} />}></Route>
        <Route path="/upload" element={<AuthenticatedRoute element={<FileUpload />} />}></Route>
        <Route path="/usuarios" element={<AuthenticatedRoute element={<Usuarios />} />}></Route>
        <Route path="/tipos_caracteristicas" element={<AuthenticatedRoute element={<Tipos_Caracteristicas />} />}></Route>
        <Route path="/roles" element={<AuthenticatedRoute element={<Roles />} />}></Route>
        <Route path="/polizas" element={<AuthenticatedRoute element={<Polizas />} />}></Route>
        <Route path="/paquete_caracteristica" element={<AuthenticatedRoute element={<Paquete_Caracteristica />} />}></Route>
        <Route path="/paquetes" element={<AuthenticatedRoute element={<Paquetes />} />}></Route>
        <Route path="/model_año" element={<AuthenticatedRoute element={<Model_Año />} />}></Route>
        <Route path="/modelos" element={<AuthenticatedRoute element={<Modelos />} />}></Route>
        <Route path="/marcas" element={<AuthenticatedRoute element={<Marcas />} />}></Route>
        <Route path="/historicos_pagos" element={<AuthenticatedRoute element={<Historicos_Pagos />} />}></Route>
        <Route path="/estados_civil" element={<AuthenticatedRoute element={<Estados_Civil />} />}></Route>
        <Route path="/cuentas_por_cobrar" element={<AuthenticatedRoute element={<Cuentas_Por_Cobrar />} />}></Route>
        <Route path="/clientes" element={<AuthenticatedRoute element={<Clientes />} />}></Route>
        <Route path="/ciudades" element={<AuthenticatedRoute element={<Ciudades />} />}></Route>
        <Route path="/caracteristicas" element={<AuthenticatedRoute element={<Caracteristicas />} />}></Route>
        <Route path="/autos" element={<AuthenticatedRoute element={<Autos />} />}></Route>
        <Route path="/aseguradoras" element={<AuthenticatedRoute element={<Aseguradoras />} />}></Route>
        <Route path="/administradores" element={<AuthenticatedRoute element={<Administradores />} />}></Route>
        <Route path="/año" element={<AuthenticatedRoute element={<Año />} />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;

