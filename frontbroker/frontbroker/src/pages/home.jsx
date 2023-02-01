import { useNavigate } from "react-router-dom";
import Header from "./header";
import { useState } from "react";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
function Home() {
    const navigate = useNavigate();

    const [placa, setPlaca] = useState('');
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');

    const clicCotizar = async () => {

        if (!placa || !celular || !correo){
            Swal.fire({
                title: 'Atención!',
                text: 'Todos los campos son requeridos',
                icon: 'error',
                confirmButtonText: 'Listo'
            });
            return;
        }             

   
        navigate('/paquetes',{
            state:{
                placa:placa,
                celular:celular,
                correo:correo
            }
        });
    }

    return (
        <>
            <Header title="transparent" />
            <div className="container-fluid p-0 m-0 element ">
                <main className="container text-center vh-100 pt-5">
                    <div className="row pt-5">
                        <h1 className="text-white  mt-5 mt-mobile text-start text-uppercase fw-bold text-decoration-underline">Tu Protección</h1>
                        <h1 className="text-uppercase text-start fw-bold fs-big-tittle text-mobile text-borde">es nuestra prioridad</h1>
                    </div>
                    <div className="row h-50">
                        <div className="col align-self-center p-4">
                            <div className="row p-3 pt-5 style-form shadow">

                                <div className="col-sm-12 col-md-6 col-lg-3 pb-2">
                                    <FormControl className="w-100" variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                        <TextField onChange={(e) => setPlaca(e.target.value)} id="filled-basic" className="w-100" label="Placa*" variant="filled" />
                                    </FormControl>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-3 pb-2">
                                    <FormControl className="w-100" variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                        <TextField onChange={(e) => setCelular(e.target.value)} id="filled-basic" className="w-100" label="Celular*" variant="filled" />
                                    </FormControl>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 pb-2">
                                    <FormControl className="w-100" variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                        <TextField onChange={(e) => setCorreo(e.target.value)} id="filled-basic" className="w-100" label="Correo Electrónico*" variant="filled" />
                                    </FormControl>
                                </div>
                                <div className="col-sm-12  pb-4">
                                    <button onClick={clicCotizar} className="btn btn-primary px-5 rounded-0">
                                        Cotizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;