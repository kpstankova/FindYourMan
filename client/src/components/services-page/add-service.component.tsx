import React, { useState } from 'react';
import cloudsImage from '../../assets/clouds.png';
import { Box, TextField } from '@mui/material'
import '../onboarding/onboarding.styles.scss'
import { useFormik } from 'formik';
import axios from 'axios';
import { push, CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "redux";
import { connect } from 'react-redux';
import { onboardingForm } from '../onboarding/onboarding.types';
import { AddServiceComponentProps, AddServiceInput, validationSchema } from './my-services.types';
import ServiceImageUploader from './service-image-uploader'
import { headers } from '../register/register-modal.types';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { StoreState } from '../../redux/root-reducer';
import { User } from '../../redux/user/user.types';

const AddServiceComponent: React.FC<AddServiceComponentProps> = ({ ...props }) => {
    const { currentUser, redirectToServicePage } = props;
    const styles = onboardingForm();
    const [response, setResponseState] = useState<string>("");
    const token = localStorage.getItem('accessToken');

    const handleAddService = (service: AddServiceInput) => {
        return axios
            .post(`http://localhost:3001/service/add`, {
                name: service.nameOfService,
                category: service.category,
                price: service.price,
                duration: service.duration,
                city: service.city,
                description: service.description,
                contributor_id: currentUser.id, 
                publish_date: new Date()
            }, { headers: headers })
            .then((response: any) => {
                redirectToServicePage();
                return response.data;
            })
            .catch((error: any) => {
                setResponseState(error);
            })
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            nameOfService: '',
            category: '',
            price: 0,
            duration: '',
            city: '',
            description: ''
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values) => {
            const { nameOfService, category, price, duration, city, description } = values;
            handleAddService(values);
        }
    })


    return (
        <div className='onboarding-page' style={{ backgroundImage: `url(${cloudsImage})` }}>
            <Box sx={{
                width: '70%',
                height: '700px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 3px 6px #5fa6ff',
                opacity: 1,
                marginLeft: '15%',
                marginTop: '5%'
            }}>
                <h1 className='title'>Add service</h1>
                <div className='onboarding-container'>
                    <div className='leftside-container'>
                        <ServiceImageUploader />
                    </div>
                    <div className='rightside-container'>
                        {response ? <div className='error-box'>{response}</div> : null}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="Name of service"
                                hiddenLabel={true}
                                name='nameOfService'
                                variant='standard'
                                value={values.nameOfService}
                                onChange={handleChange}
                                error={errors.nameOfService === ""}
                                helperText={errors.nameOfService ? errors.nameOfService : null}
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
                                placeholder="Category"
                                hiddenLabel={true}
                                name='category'
                                variant='standard'
                                value={values.category}
                                onChange={handleChange}
                                error={errors.category === ""}
                                helperText={errors.category ? errors.category : null}
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
                                type='number'
                                autoComplete='off'
                                placeholder="Price"
                                hiddenLabel={true}
                                name='price'
                                variant='standard'
                                value={values.price}
                                error={errors.price === ""}
                                helperText={errors.price ? errors.price : null}
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
                                placeholder="Duration"
                                hiddenLabel={true}
                                name='duration'
                                variant='standard'
                                value={values.duration}
                                onChange={handleChange}
                                error={errors.duration === ""}
                                helperText={errors.duration ? errors.duration : null}
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
                                placeholder="City"
                                hiddenLabel={true}
                                name='city'
                                variant='standard'
                                value={values.city}
                                onChange={handleChange}
                                error={errors.city === ""}
                                helperText={errors.city ? errors.city : null}
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
                                placeholder="Description"
                                hiddenLabel={true}
                                name='description'
                                variant='standard'
                                value={values.description}
                                onChange={handleChange}
                                error={errors.description === ""}
                                helperText={errors.description ? errors.description : null}
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
                            Upload
                        </button>
                    </div>
                </div>
            </Box>
        </div>

    );
};

const mapStateToProps = (state: StoreState): { currentUser: User } => {
    return {
        currentUser: selectCurrentUser(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction>) => {
    return {
        redirectToServicePage: () => dispatch(push('/my-services')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddServiceComponent);