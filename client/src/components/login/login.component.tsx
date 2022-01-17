import React, { useState } from 'react';
import { Dialog, Fade, TextField } from "@mui/material";
import { dialogStyles, LoginModalProps, validationSchema } from './login.types';
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
import './login.styles.scss'
import { useFormik } from 'formik';
import { LoginState, User, UserActionTypes } from '../../redux/user/user.types';
import { headers } from '../register/register-modal.types';
import axios from 'axios';
import { ILoginFailure, ILoginSuccess, TUserReducerActions } from '../../redux/user/user.actions';

const LoginModalComponent: React.FC<LoginModalProps> = ({ ...props }) => {
    const { toggleForgotPasswordModal, toggleLoginModal, resetTogglesModalAction,
        toggleRegisterAsRoleModalAction, toggleForgotPasswordModalAction, loginSuccessAction, loginFailureAction } = props;
    const [response, setResponseState] = useState<string>("");

    const styles = dialogStyles();

    const handleClose = () => {
        resetTogglesModalAction();
    }

    const handleOpenRegisterWrapper = () => {
        toggleRegisterAsRoleModalAction();
    }

    const handleOpenForgotPasswordModal = () => {
        toggleForgotPasswordModalAction();
    };

    const handleLogin = (newUser: LoginState) => {
        return axios
            .post(`http://localhost:3001/auth/login`, {
                email: newUser.email,
                password: newUser.password,
            }, { headers: headers })
            .then((response: any) => {
                loginSuccessAction({ id: response.data.id, email: response.data.email, role: response.data.role });
                localStorage.setItem('accessToken', response.data.accessToken);
                return response.data;
            })
            .catch((error: any) => {
                setResponseState(`${error}`);
                loginFailureAction(error);
            });
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const { email, password } = values;
            handleLogin(values).then((response) => {
                handleClose();
                resetForm();
                resetTogglesModalAction();
            }).catch((error) => {
                console.log(error);
            })

        }
    })

    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleLoginModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleLoginModal}>
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
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='password'
                                autoComplete='off'
                                placeholder="Password"
                                hiddenLabel={true}
                                name='password'
                                variant='standard'
                                value={values.password} onChange={handleChange} error={errors.password === ""}
                                helperText={errors.password ? errors.password : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                            <button
                                className='submit-button'
                                type='submit'>
                                Sign in
                            </button>
                            <button
                                className='google-button'
                                type='submit'>
                                Sign in with google
                            </button>
                            <div>
                                <div className='hyperlinks'>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenForgotPasswordModal}>Forgot password?</Link>
                                </div>
                                <div className='hyperlinks'>
                                    <span>No account yet? </span>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenRegisterWrapper}>Register</Link>
                                </div>
                            </div>

                            {/* {isLoading ? <LoadingSpinner /> : null} */}
                        </form>
                    </div>
                </div>
            </Fade>
        </Dialog>
    );
}

const mapStateToProps = (state: StoreState): { toggleForgotPasswordModal: boolean, toggleLoginModal: boolean } => {
    return {
        toggleForgotPasswordModal: selectForgotPasswordModal(state),
        toggleLoginModal: selectLoginModal(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions | TUserReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL }),
        toggleRegisterAsRoleModalAction: () => dispatch<IToggleRegisterAsRole>({ type: ModalActionTypes.TOGGLE_REGISTER_AS_ROLE_MODAL }),
        toggleForgotPasswordModalAction: () => dispatch<IToggleForgotPassword>({ type: ModalActionTypes.TOGGLE_FORGOT_PASSWORD_MODAL }),
        loginSuccessAction: (data: User) => dispatch<ILoginSuccess>({ type: UserActionTypes.LOGIN_SUCCESS, data: data }),
        loginFailureAction: (data: string) => dispatch<ILoginFailure>({ type: UserActionTypes.LOGIN_FAILED, data: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalComponent);