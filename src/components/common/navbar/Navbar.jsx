import React from "react";
import "./navbar.css";
import { showIf } from "../../utils/conditionalRendering";
import { auth } from "../../../firebase";

function Navbar () {
    const user = auth.currentUser;
    return (
        <section className="navbar"> {/* These can be changed, added, or removed without issue. As of 2/13 not hooked up. */}
            <a href="/" className="navbar-item">Home</a>
            <a href="/" className="navbar-item">About</a>
            <a href="/" className="navbar-item">Accounting</a>
            <a href="admin" className="navbar-item">Admin</a>
            <a href="/" className="navbar-item">Contact</a>
            {showIf(!user,
                <a href="/login" className="navbar-item">Log On</a>
            )}
            {showIf(user,
                <a  href="/" className="navbar-item">Logout</a>
            )}
        </section>
    )
};

export default Navbar;