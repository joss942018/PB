import React, {useCallback} from "react";
import {Routes, Route, Link} from "react-router-dom";
import './App.scss';
import Home from "./pages/home";
import Paquetes from "./pages/paquetes";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Polices from "./pages/polizas";
import Payments from "./pages/Components/payments";

function App() {
    return (
        <div className="App container-fluid  p-0 m-0 min-vh-100">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="paquetes" element={<Paquetes/>}/>
                <Route path="polices" element={<Polices/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="payments" element={<Payments/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
            </Routes>
        </div>
    );
}

export default App;
