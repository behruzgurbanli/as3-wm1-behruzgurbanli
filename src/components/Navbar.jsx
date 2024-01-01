import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav id='navigation-bar'>
            <div className='links'>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/cards'>Cards</NavLink>
                <NavLink to='/contact'>Contact Me</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;