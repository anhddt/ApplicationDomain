import React from "react";
import './navbar.css';

function Navbar () {
    return (
        <section className="navbar">
            <a href="/" className="navbar-item">Home</a>
            <a href="/" className="navbar-item">About</a>
            <a href="/" className="navbar-item">Accounting</a>
            <a href="/" className="navbar-item">Contact</a>
            
        </section>
    )
};

export default Navbar;