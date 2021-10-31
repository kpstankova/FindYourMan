import React from 'react';
import backgroundImage from '../../assets/home.png';
import { Button } from '@mui/material'
import './home.styles.scss';

const HomeComponent = () => {
    const headingMessage = "Find the perfect man for anything!";
    const contexMessage = "With our site you can find yourself a person to fix your, or someone to built your home, or anyone you need!";
    return (
        <React.Fragment>
            <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="home-info-container">
                    <div className="home-heading-message">{headingMessage}</div>
                    <div className="home-contex-message">{contexMessage}</div>
                    <div className="home-button-container">
                        <Button size='large' variant='contained' className='learn-more-button' style={{ borderRadius: 50 }} >Learn more</Button>
                        <Button style={{ borderRadius: 50 }} className='contact-us-button'>Contact us</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default HomeComponent;