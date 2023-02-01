import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import ConfirmationModal from "template/ConfirmationModal";
import { Table, Collapse } from 'react-bootstrap';
import { useNavigate } from "react-router";

type Props = {
    autos: any[];
};

export const PolizasTable: React.FC<Props> = ({ autos }) => {
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                    <span>Polizas </span>             
                </h6>
            </Card.Header>
            <Card.Body>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Ver polizas</th>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>Año</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autos.map(auto => <TableRow auto={auto} />)}
                    </tbody>
                </Table>
            </Card.Body>
            <ConfirmationModal buttonNegative="Cancel" buttonPositive="Delete" title="Delete Confirmation" show={false} body={"Are you sure?"} onNegative={() => { }} onPositive={() => { }} />
        </Card>
    );
}

function TableRow({ auto }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return <Fragment>
        <tr>
            <td>
                <button style={{
                    borderRadius: '100%',
                    height: '2rem',
                    width: '2rem',
                    border: 'none',
                    backgroundColor: '#13121F',
                    opacity: 0.85,
                    color: 'white',
                }}
                    onClick={() => setOpen(!open)}>
                    <svg
                        style={{ width: '1rem', rotate: open ? '90deg' : '270deg' }}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 19.5L8.25 12l7.5-7.5'
                        />
                    </svg>
                </button>
            </td>
            <td>
                <p>{auto.modelos.nombre}</p>
            </td>
            <td>
                <p> {auto.marcas.nombre}</p>
            </td>
            <td>
                <p>{auto.año.descripcion}</p>
            </td>
           
        </tr>
        <tr>
            <Collapse in={open}>
                <td colSpan={100} style={{ padding: '4px 40px', backgroundColor: '#f8f9fc' }}>
                    <Table className="mt-2 mb-2">
                        <thead>
                            <tr>
                                <th>Polizas</th>
                                <th>Fecha</th>
                                <th>Descripcion</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auto.polizas.map(poliza =>
                                <tr>
                                    <td> {poliza.paquetes.nombre}</td>
                                    <td>{poliza.fecha_vigencia}</td>
                                    <td>{poliza.paquetes.descripcion}</td>
                                    <td>{poliza.estado}</td>
                                    <td>
                                        <button style={{
                                            border: 'none',
                                            borderRadius: '5px',
                                            backgroundColor: '#13121F',
                                            opacity: 0.85,
                                            color: 'white',
                                            padding: '4px 8px'
                                        }} onClick={() => { 
                                            <ConfirmationModal buttonNegative="Cancelar" buttonPositive="Hacer Pago" title="¿Deseas Procerde con el Pago?" show={true} body={"¿Estás seguro?"} onNegative={() => { }} onPositive={() => { }} />
                                        }}>
                                            Pagar
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </td>
            </Collapse>
        </tr>
    </Fragment>
}


