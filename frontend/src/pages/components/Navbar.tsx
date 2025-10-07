import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <>
            <header className="navbar-expand-md">
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div className="navbar">
                        <div className="container-xl">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <i className="fas fa-home"></i>
                                        </span>
                                        <span className="nav-link-title">
                                            Inicio
                                        </span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <i className="fas fa-wallet"></i>
                                        </span>
                                        <span className="nav-link-title">
                                            Cuentas
                                        </span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <i className="fas fa-cash-register"></i>
                                        </span>
                                        <span className="nav-link-title">
                                            Movimientos
                                        </span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <i className="fas fa-cogs"></i>
                                        </span>
                                        <span className="nav-link-title">
                                            Configuraciones
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar