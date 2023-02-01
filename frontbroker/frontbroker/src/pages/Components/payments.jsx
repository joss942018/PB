import React from "react";
import masterCard from "../../images/MasterCard-logo-01.svg";
import visa from "../../images/visa.svg";
import paypal from "../../images/paypal.svg";
import HeaderAdmin from "../headerAdmin";

function payments() {
    return (
        <>
            <HeaderAdmin />
            <div className="container mt-5">
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-6 col-lg-8 mt-3">
                        <div className="shadow bg-white p-3 mt-3 rounded-2">
                            <h1>Metodo de pago</h1>
                            <hr/>
                            <div className="row py-3">
                                <div className="col position-relative">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
                                    <label className="btn btn-outline-primary py-5 w-100 p-mobile-radio" htmlFor="btnradio1">
                                    </label>
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                        <img src={masterCard} className="img-fluid" width="32" alt="masterCard"/>
                                    </div>
                                </div>
                                <div className="col position-relative">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                    <label className="btn btn-outline-primary w-100 py-5 p-mobile-radio" htmlFor="btnradio2"></label>
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                        <img src={visa} className="img-fluid" width="32" alt="masterCard"/>
                                    </div>
                                </div>
                                <div className="col position-relative">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                                    <label className="btn btn-outline-primary w-100 py-5 p-mobile-radio" htmlFor="btnradio3"></label>
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                        <img src={paypal} className="img-fluid" width="32" alt="masterCard"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-sm-12 col-md-12 col-lg-6">
                                    <div className="form-floating pb-4">
                                        <input type="text" className="form-control" id="floatingInputCard"
                                               placeholder="Numero de Tarjeta*"/>
                                        <label htmlFor="floatingInputCard">Numero de Tarjeta*</label>
                                        <i className="fa-regular fa-credit-card"></i>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-3">
                                    <div className="form-floating pb-4">
                                        <input type="text" className="form-control" id="floatingInputCard"
                                               placeholder="Fecha de Expedicion*"/>
                                        <label htmlFor="floatingInputCard">Fecha de Expedicion*</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-3">
                                    <div className="form-floating pb-4">
                                        <input type="text" className="form-control" id="floatingInputCard"
                                               placeholder="CVV*"/>
                                        <label htmlFor="floatingInputCard">CVV*</label>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <button type="button" className="btn btn-primary w-100">Pagar</button>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
                        <div className="shadow bg-white p-3 mt-3 rounded-2">
                            <h1>Poliza</h1>
                            <hr/>
                            <p>GENERALI - GENERALI 0 KILOMETROS</p>
                            <p>Responsabilidad Civil: $ 30,000 anual <br/>
                                Muerte Accidental: $ 5,000 por ocupante <br/>
                                Gastos Médicos: $ 2,500 por ocupante</p>
                            <hr/>
                            <h1 className="py-3">$34.45</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default payments;