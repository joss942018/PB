import logo from "../images/logo-horizontal-color.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function Login() {
    const [correo, setCorreo] = useState('')
    const [clave, setClave] = useState('')

    const navigate = useNavigate();

    const clicLogin = async () => {
        if (!correo || !clave) return alert('Todos los campos son requeridos')
        const userLoggedData = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username: correo, password: clave }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!userLoggedData.ok) {
            const userLogged = await userLoggedData.json()
            return alert(JSON.stringify(userLogged, null, 2))
        }
        navigate('/dashboard');
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100 element">
                <div className="bg-white bg-opacity-50 p-4 m-3 min-width-login">
                    <Link className="pb-5" to="/">
                        <img src={logo} className="img-fluid pb-5" width="250" alt="logo" />
                    </Link>
                    <TextField onChange={(e) => setCorreo(e.target.value)} id="filled-basic" className="w-100 mb-3" label="Correo*" variant="filled" />
                    <TextField onChange={(e) => setClave(e.target.value)} id="filled-basic" className="w-100 mb-3" label="Clave*" variant="filled" />
                    <button onClick={clicLogin} className="btn btn-primary shadow w-100 my-3">Iniciar sesion</button>
                </div>
            </div>
        </>
    );
}

export default Login;