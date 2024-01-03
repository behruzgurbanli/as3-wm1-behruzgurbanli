import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/navbar.css'

function Navbar() {

    const navLinks = [
      { to: '/home', label: 'Home' },
      { to: '/cards', label: 'Cards' },
      { to: '/contact', label: 'Contact Me' },
    ];

    return (
        <nav id='navigation-bar'>
            <div className='links'>
                {
                    navLinks.map((link, idx) => (
                        <NavLink key={ idx } to={ link.to }>{ link.label }</NavLink>
                    ))
                }
            </div>
        </nav>
    )
}

export default Navbar;