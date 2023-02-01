import illustration from "../images/ilustration-initial.svg";
import {Link} from "react-router-dom";
import logo from "../images/logo-h.svg";
import React from "react";

function Header() {
    return (
        <>
            <header className="container-fluid fixed-top bg-primary" >
                <nav className="navbar navbar-expand-lg ">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} className="img-fluid" width="150" alt="logo"/>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="#fff" >
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>
                        </button>

                        <div className="offcanvas offcanvas-start bg-primary" tabIndex="-1" id="offcanvasExample"
                             aria-labelledby="offcanvasExampleLabel">
                            <div className="offcanvas-header">
                                <img src={logo} className="img-fluid" width="150" alt="logo"/>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className="d-flex justify-content-center">
                                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                        <Link className="navbar-brand text-white text-uppercase text-hover" to="/">Inicio</Link>
                                        <Link className="navbar-brand text-white text-uppercase text-hover" to="/price">Precios</Link>
                                        <Link className="navbar-brand text-white text-uppercase text-hover" to="/polices">Polizas</Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;