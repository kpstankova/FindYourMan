import React from 'react';
import cloudsImage from '../../assets/clouds.png';
import { Box, Grid } from '@mui/material'
import './onboarding.styles.scss'
import ProfileImageUploader from './profile-image-uploader';
import OnboardingFormComponent from './onboarding-form.component';

const OnboardingPageComponent = () => {
    return (
        <div className='onboarding-page' style={{ backgroundImage: `url(${cloudsImage})` }}>
            <Box sx={{
                width: '70%',
                height: '550px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 3px 6px #5fa6ff',
                opacity: 1,
                marginLeft: '15%',
                marginTop: '5%'
            }}>
                <h1 className='title'>Additional information</h1>
                <div className='onboarding-container'>
                    <div className='leftside-container'>
                        <ProfileImageUploader />
                    </div>
                    <div className='rightside-container'>
                        <OnboardingFormComponent />
                        <button className='submit-button' type='submit'>
                            Let's get started!
                        </button>
                    </div>
                </div>
            </Box>
        </div>

    );
};

export default OnboardingPageComponent;