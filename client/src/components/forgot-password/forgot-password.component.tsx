import React, { useState } from 'react';
import { Dialog, Fade, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StoreState } from '../../redux/root-reducer';
import { Dispatch } from "redux";
import { selectForgotPasswordModal, selectLoginModal, selectRegisterAsRoleModal, selectRegisterModal } from '../../redux/modal-visibility/modal.selectors';
import { IResetToggles, IToggleForgotPassword, IToggleLogin, IToggleRegister, IToggleRegisterAsRole, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import Backdrop from '@material-ui/core/Backdrop';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../login/login.styles.scss'
import { ForgotPasswordModalProps, validationSchema } from './forgot-password.types';
import { dialogStyles } from '../login/login.types';
import { headers } from '../register/register-modal.types';
import axios from 'axios';
import { useFormik } from 'formik';

const ForgotPasswordModalComponent: React.FC<ForgotPasswordModalProps> = ({ ...props }) => {
    const { toggleForgotPasswordModal, resetTogglesModalAction, toggleRegisterAsRoleModalAction, toggleLoginModalAction } = props;

    const styles = dialogStyles();
    const [response, setResponseState] = useState<string>("");

    const handleClose = () => {
        resetTogglesModalAction();
    }

    const handleOpenRegisterWrapper = () => {
        toggleRegisterAsRoleModalAction();
    }

    const handleOpenLogin = () => {
        toggleLoginModalAction();
    }

    const handleSendNewPassword = (email: string) => {
        return axios
            .post(`http://localhost:3001/email/forgotPassword`, {
                to: email,
            }, { headers: headers })
            .then((response: any) => {
                return response.data;
            })
            .catch((error: any) => {
                setResponseState(`${error}`);
            });
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: ''
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            const { email } = values;
            handleSendNewPassword(email);
            resetForm();
            handleClose();
            resetTogglesModalAction();
        }
    })

    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleForgotPasswordModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleForgotPasswordModal}>
                <div className='login-modal'>
                    <button className='close-button-login' aria-label='google' onClick={handleClose}>
                        <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                    </button>
                    <div className='login'>
                        <h1 className='title'>Find your Man</h1>

                        {response ? <div className='error-box'>{response}</div> : null}
                        <form className='login-form' autoComplete='on' onSubmit={handleSubmit}>
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='email'
                                autoComplete='off'
                                placeholder="Email"
                                hiddenLabel={true}
                                name='email'
                                variant='standard'
                                value={values.email} onChange={handleChange} error={errors.email === ""}
                                helperText={errors.email ? errors.email : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                            <div className="info-message">The system will send you a recovery email</div>
                            <button
                                className='submit-button'
                                type='submit'>
                                Send
                            </button>
                            <div>
                                <div className='hyperlinks'>
                                   Return to <Link className='hyperlink' to={'/'} onClick={handleOpenLogin}>sign in</Link>
                                </div>
                                <div className='hyperlinks'>
                                    <span>No account yet? </span>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenRegisterWrapper}>Create an account!</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fade>
        </Dialog>
    );
}

const mapStateToProps = (state: StoreState): { toggleForgotPasswordModal: boolean } => {
    return {
        toggleForgotPasswordModal: selectForgotPasswordModal(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL }),
        toggleRegisterAsRoleModalAction: () => dispatch<IToggleRegisterAsRole>({ type: ModalActionTypes.TOGGLE_REGISTER_AS_ROLE_MODAL }),
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.TOGGLE_LOGIN_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordModalComponent);