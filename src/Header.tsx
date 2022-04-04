import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { removeTokenSession } from './utils/commons';

import Logo from './images/ceiba.png';

function Header(props: any)
{
    const history = useHistory();

    const handleLogout = (e: any): void => {
        e.preventDefault();
        removeTokenSession();

        history.push('/login')
    }

    return (
        <div className="header" >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img src={Logo} alt="Logo" width="120" className="d-inline-block align-text-top" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink activeClassName="active" className="nav-link" to="/users" data-testid="header__link-users">Usuarios</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="active" className="nav-link" to="/create" data-testid="header__link-create">Crear usuarios</NavLink>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/login" data-testid="header__link-login">Iniciar sesión</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={handleLogout} data-testid="header__link-signout">Cerrar sesión</a>
                                </li>
                            </ul>                            
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;


//Los valores que deberá tener la propiedad “data-testid” en los elementos HTML son:

// elemento de redirección a ingreso data-testid="header__link-login"
// elemento de redirección a usuarios data-testid="header__link-users"
// elemento de redirección a Crear data-testid="header__link-create"
// elemento para cerrar sesión data-testid="header__link-signout"
