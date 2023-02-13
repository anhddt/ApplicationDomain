import React from "react";
import "./header.css";
import { Navbar } from "../../common";

function Header () {
    return (
        <section className='header'>
        {/* Logo and Name */}
        <section className='header-top'>
          <section className='header-top_logo'>
            <img src="https://i.imgur.com/R3761qO.png" alt="Accountant's Friend" width="500"/>

          </section>

        </section>
        
        <section className='header-bottom'>
            <section className='header-bottom_navbar'>
                {/* <Navbar />*/}
                <Navbar />
            </section>
        </section>
         
    </section>

    )
};

export default Header;