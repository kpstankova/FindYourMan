import React, { useState } from 'react';
import cloudsImage from '../../assets/clouds.png';
import { Box, TextField } from '@mui/material'
import './onboarding.styles.scss'
import ProfileImageUploader from './profile-image-uploader';
import { useFormik } from 'formik';
import { OnboardingComponentProps, onboardingForm, validationSchema } from './onboarding.types';
import axios from 'axios';
import { push, CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "redux";
import { connect } from 'react-redux';

const OnboardingPageComponent: React.FC<OnboardingComponentProps> = ({ ...props }) => {
    const { redirectToMainPage } = props;
    const styles = onboardingForm();
    const [response, setResponseState] = useState<string>("");
    const token = localStorage.getItem('accessToken');

    const handleAdditionalInfo = (name: string, address: string, vatNumber: string, phoneNumber: string) => {
        return axios
            .put(`http://localhost:3001/auth/editInfo`, {
                name: name,
                address: address,
                vat: vatNumber,
                phone: phoneNumber
            }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response: any) => {
                redirectToMainPage();
                return response.data;
            })
            .catch((error: any) => {
                setResponseState(`${error}`);
            });
    };

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            name: '',
            address: '',
            vatNumber: '',
            phoneNumber: ''
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values) => {
            const { name, address, vatNumber, phoneNumber } = values;

            handleAdditionalInfo(name, address, vatNumber, phoneNumber);

        }
    })


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
                        {response ? <div className='error-box'>{response}</div> : null}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="Name"
                                hiddenLabel={true}
                                name='name'
                                variant='standard'
                                value={values.name}
                                onChange={handleChange}
                                error={errors.name === ""}
                                helperText={errors.name ? errors.name : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="Address"
                                hiddenLabel={true}
                                name='address'
                                variant='standard'
                                value={values.address}
                                onChange={handleChange}
                                error={errors.address === ""}
                                helperText={errors.address ? errors.address : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="VAT"
                                hiddenLabel={true}
                                name='vatNumber'
                                variant='standard'
                                value={values.vatNumber}
                                error={errors.vatNumber === ""}
                                helperText={errors.vatNumber ? errors.vatNumber : null}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="Phone number"
                                hiddenLabel={true}
                                name='phoneNumber'
                                variant='standard'
                                value={values.phoneNumber}
                                onChange={handleChange}
                                error={errors.phoneNumber === ""}
                                helperText={errors.phoneNumber ? errors.phoneNumber : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                        </form>
                        <button className='submit-button' onClick={(e: any) => handleSubmit(e)}>
                            Let's get started!
                        </button>
                    </div>
                </div>
            </Box>
        </div>

    );
};

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction>) => {
    return {
        redirectToMainPage: () => dispatch(push('/services')),
    }
}

export default connect(null, mapDispatchToProps)(OnboardingPageComponent);