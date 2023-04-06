import React from 'react'
import { Link, NavLink } from 'react-router-dom'
export default function NavBar({ user, LogOut }) {
    return (
        <nav className="navbar navbar-expand-lg bg-dark sticky-top navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to='/' > AnyWare </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='home' >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='history' >History</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {user ? <li className="nav-item m-2">
                            <span className="nav-link regis btn" onClick={LogOut}>LogOut</span>
                        </li> : <>
                            <li className="nav-item m-2">
                                <NavLink className="nav-link btn btn-outline-success" to='login' >Login</NavLink>
                            </li>
                            <li className="nav-item m-2">
                                <NavLink className="nav-link btn btn-outline-success" to='register' >Register</NavLink>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}