import React from 'react';
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import logo from "../../assets/logo/logo.png"


function Navbar({ darkMode, setDarkMode }) {
    return (
        <nav className={`navbar navbar-expand-lg fixed-top py-3 ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
            <div className='container'>
                {/* LOGO */}
                <a className="navbar-brand" href="/">
                    <img className="img-logo" src={logo} alt="logo" />
                </a>

                {/* Collapse button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav menu */}
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="main-menu navbar-nav me-auto ms-auto">
                        <li className="nav-item me-3"><a className="nav-link" href="/">Home</a></li>
                        <li className="nav-item me-3"><a className="nav-link" href="menu">Menu</a></li>
                        <li className="nav-item me-3"><a className="nav-link" href="#">About us</a></li>
                    </ul>
                    <ul className="user-menu navbar-nav me-2 ms-auto">
                        <li className="nav-item me-3"><a className="nav-link" href="#"><i class="bi bi-person"></i></a></li>
                        <li className="nav-item me-3"><a className="nav-link" href="#"><i class="bi bi-cart"></i></a></li>
                        {/* dark mode */}
                        <li className="nav-item me-3 d-flex align-items-center">
                            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
