import React from 'react';
import { Button } from '@mui/material'
import './navbar.styles.scss'
const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-header-container">
                <div className="navbar-logo-container">
                    <div className="navbar-white-text">FIND</div>
                    <div className='navbar-black-text'>your</div>
                    <div className='navbar-white-text'>MAN</div>
                </div>
                <div className='navbar-buttons-container'>
                    <Button className='navigation-link' style={{ borderRadius: 50 }} >Sign up</Button>
                    <Button className='navigation-link' style={{ borderRadius: 50 }} >Sign in</Button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;