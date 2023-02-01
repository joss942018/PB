import React, { useEffect, useRef } from "react";
//import illustration from "../images/ilustration-initial.svg";
import { Link, useParams } from "react-router-dom";
//import { renderToString } from "react-dom/server";
import logo from "../images/img-1.png";
import img2 from "../images/img-2.png";
import img3 from "../images/img-3.png";
import jsPDF from "jspdf";
import baseReady from "./basePdf";
import Header from "./header";
import HelpIcon from '@mui/icons-material/Help';
import Rating from '@mui/material/Rating';
//import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemText from '@mui/material/ListItemText';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from "react-router-dom";


const pdf = new jsPDF("p", "pt", "a4");


function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const print = () => {

    pdf.addImage(baseReady, 'JPEG', 0, 0, 600, 850);

    pdf.html("", {
        callback: function (pdf) {
            pdf.save("pdf11");
        },    }
    );

    document.getElementById('objectPdfCondition').data = pdf.output('bloburl');

};

function Paquetes() {
    const location = useLocation();
    const navigate = useNavigate();
    let { placa } = location.state;
    const [value, setValue] = React.useState(2);
    const [value2, setValue2] = React.useState(3);
    const [value3, setValue3] = React.useState(4);
    const [identificacion, setIdentificacion] = React.useState('');
    const [nombres, setNombres] = React.useState('');
    const [celular, setCelular] = React.useState('');
    const [estadoCivil, setEstadoCivil] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [marca, setMarca] = React.useState('');
    const [anio, setAnio] = React.useState('');
    const [avaluo, setAvaluo] = React.useState('');
    const firstUpdate = useRef(true);
    useEffect(() => {    
        let response  = null;       
        fetch(`https://636eb10ff2ed5cb047cd896b.mockapi.io/brokerpolizas/api/v1/personaldata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(results => results.json())
        .then(data => {
            const client = data.find(cliente => cliente.placa === placa); 
            if(client != null)
            {           
                setIdentificacion(client.identification);
                setNombres(client.name);
                setCelular(client.phone);
                setEstadoCivil(client.civil_state);
                setCorreo(client.mail);
                setMarca(client.vehicle_type);
                setAnio(client.year);
                setAvaluo(client.appraisal);
            }else{
                Swal.fire({
                    title: 'Atención!',
                    text: 'No se ha encontrado placa',
                    icon: 'error',
                    confirmButtonText: 'Listo'
                    });              
            }  
        });
    }, []);
  
    const elegirPoliza = function ()  {
        const userAddedData = fetch(`${process.env.REACT_APP_API_URL}/publicregister`, {
            method: 'POST',
            body: JSON.stringify({
                email: correo,
                celular: celular,
            }),
            headers: {
                Authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });     
        Swal.fire({
            title: 'Éxito!',
            text: 'Se ha añadido una Poliza',
            icon: 'success',
            confirmButtonText: 'Listo'
        }).then(function() {
            window.location.replace('http://62.171.180.230:3002/');;
        });;
        
    }

    return (
        <>
            <Header />
            <main className="container mt-5"  >

                <nav aria-label="breadcrumb" className="mt-5 pt-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link className="" to="/">Inicio</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Precios</li>
                    </ol>
                </nav>

                <h1 className="text-primary pt-3 pb-3 text-uppercase">Precios</h1>
                <h4 className="text-primary pt-3 pb-3 text-uppercase">Datos Personales</h4>


                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div className="border border-1 p-3 h-100">
                                <h4>Identificación</h4>
                                <p className="text-muted">{identificacion}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div className="border border-1 p-3 h-100">
                                <h4>Nombres</h4>
                                <p className="text-muted">{nombres}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div className="border border-1 p-3 h-100">
                                <h4>Celular</h4>
                                <p className="text-muted">{celular}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div className="border border-1 p-3 h-100">
                                <h4>Estado Civil</h4>
                                <p className="text-muted">{estadoCivil}</p>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div className="border border-1 p-3 h-100">
                                <h4>Correo Electrónico</h4>
                                <p className="text-muted">{correo}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div className="border border-1 p-3 h-100">
                                <h4>Tipo de vehiculo</h4>
                                <p className="text-muted">{marca}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div className="border border-1 p-3 h-100">
                                <h4>Año</h4>
                                <p className="text-muted">{anio}</p>
                            </div>
                        </div>
                        <div class="col">
                            <div className="border border-1 p-3 h-100">
                                <h4>Avalúo</h4>
                                <p className="text-muted">${avaluo}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row shadow p-3 bg-white App-logo2 ">
                    <div className="col-sm-12 col-md-2">
                        <img src={img3} className="img-fluid overflow-hidden max-h-card-price" alt="logo" />
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating name="read-only" value={value} readOnly />
                        </Box>
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <h1 className="fs-5 py-3 text-center-mobile">GENERALI - GENERALI 0 KILOMETROS</h1>
                        <p className="text-start text-center-mobile">
                            Responsabilidad Civil: $ 30,000 anual <br />
                            Muerte Accidental: $ 5,000 por ocupante <br />
                            Gastos Médicos: $ 2,500 por ocupante</p>
                        <div className="d-flex justify-content-around">
                            <div className="list-group-item fw-bold text-info border-0">Coberturas <HelpIcon /> </div>
                            <div className="list-group-item fw-bold text-info border-0">Deducibles <HelpIcon /></div>
                            <div className="list-group-item fw-bold text-info border-0">Beneficios <HelpIcon /></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-2 align-self-end">
                        <h1 className="fw-bold">$34.45</h1>
                        <p>12 cuotas mensuales <br />Pago con tarjeta de credito</p>
                        <h3 className="fw-bold">$350.56</h3>
                        <p>Incluido impuestos</p>
                        <button onClick={print} type="text" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Elegir
                        </button>
                    </div>
                </div>
                <div className="row shadow p-3 bg-white App-logo2 mt-3">
                    <div className="col-sm-12 col-md-2">
                        <img src={logo} className="img-fluid overflow-hidden max-h-card-price" alt="logo" />
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating name="read-only" value={value2} readOnly />
                        </Box>
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <h1 className="fs-5 py-3 text-center-mobile">GENERALI - GENERALI 0 KILOMETROS</h1>
                        <p className="text-start text-center-mobile">
                            Responsabilidad Civil: $ 30,000 anual <br />
                            Muerte Accidental: $ 5,000 por ocupante <br />
                            Gastos Médicos: $ 2,500 por ocupante</p>
                        <div className="d-flex justify-content-around">
                            <div className="list-group-item fw-bold text-info border-0">Coberturas <HelpIcon /> </div>
                            <div className="list-group-item fw-bold text-info border-0">Deducibles <HelpIcon /></div>
                            <div className="list-group-item fw-bold text-info border-0">Beneficios <HelpIcon /></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-2 align-self-end">
                        <h1 className="fw-bold">$34.45</h1>
                        <p>12 cuotas mensuales <br />Pago con tarjeta de credito</p>
                        <h3 className="fw-bold">$350.56</h3>
                        <p>Incluido impuestos</p>
                        <button type="text" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={print}>Elegir</button>
                    </div>
                </div>
                <div className="row shadow p-3 bg-white App-logo2 mt-3">
                    <div className="col-sm-12 col-md-2">
                        <img src={img2} className="img-fluid overflow-hidden max-h-card-price" alt="logo" />
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating name="read-only" value={value3} readOnly />
                        </Box>
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <h1 className="fs-5 py-3 text-center-mobile">GENERALI - GENERALI 0 KILOMETROS</h1>
                        <p className="text-start text-center-mobile">
                            Responsabilidad Civil: $ 30,000 anual <br />
                            Muerte Accidental: $ 5,000 por ocupante <br />
                            Gastos Médicos: $ 2,500 por ocupante</p>
                        <div className="d-flex justify-content-around">
                            <div className="list-group-item fw-bold text-info border-0">Coberturas <HelpIcon /> </div>
                            <div className="list-group-item fw-bold text-info border-0">Deducibles <HelpIcon /></div>
                            <div className="list-group-item fw-bold text-info border-0">Beneficios <HelpIcon /></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-2 align-self-end">
                        <h1 className="fw-bold">$34.45</h1>
                        <p>12 cuotas mensuales <br />Pago con tarjeta de credito</p>
                        <h3 className="fw-bold">$350.56</h3>
                        <p>Incluido impuestos</p>
                        <button type="text" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={print}>Elegir</button>
                    </div>
                </div>

            </main>

            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Cotización</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body vh-100">
                            <div style={{ width: '100%', height: '100%' }}>
                                <object
                                    data={pdf}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                    id="objectPdfCondition"
                                >
                                    <br />
                                    <a href="#">Tu dispositivo no puede visualizar los PDF, se ha descargado para que lo puedas ver</a>
                                </object>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <Link className="btn btn-primary" to="/payments">
                                <div data-bs-dismiss="modal">Contratar</div>
                            </Link> */}
                            <button data-bs-dismiss="modal" onClick={elegirPoliza} className="btn btn-primary">Contratar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Paquetes;