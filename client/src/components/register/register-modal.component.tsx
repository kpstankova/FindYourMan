import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Fade, TextField } from "@mui/material";
import Backdrop from '@material-ui/core/Backdrop';
import { Link } from 'react-router-dom';
import { dialogStyles, headers, RegisterModalProps, validationSchema } from './register-modal.types';
import { selectRegisterModal } from '../../redux/modal-visibility/modal.selectors';
import { StoreState } from '../../redux/root-reducer';
import { IResetToggles, IToggleLogin, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { useFormik } from 'formik';
import { LoginState, RegisterState, User, UserActionTypes } from '../../redux/user/user.types';
import axios from "axios";
import { ILoginFailure, ILoginSuccess, IRegisterFailure, IRegisterSuccess, TUserReducerActions } from '../../redux/user/user.actions';
import { selectRegisterRole } from '../../redux/user/user.selectors';
import { push, CallHistoryMethodAction } from "connected-react-router";


const RegisterModalComponent: React.FC<RegisterModalProps> = ({ ...props }) => {
    const { resetTogglesModalAction, toggleLoginModalAction, registerUserSuccessAction, registerUserErrorAction, toggleRegisterModal, registerRole,
        loginSuccessAction, loginFailureAction, redirectToOnboarding } = props;
    const [response, setResponseState] = useState<string>("");

    const styles = dialogStyles();

    const handleClose = () => {
        resetTogglesModalAction();
    }

    const handleOpenLogin = () => {
        toggleLoginModalAction();
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
            })
            .catch((error: any) => {
                setResponseState(error);
                loginFailureAction(error);
            });
    }

    const handleRegister = (newUser: RegisterState) => {
        return axios
            .post(`http://localhost:3001/auth/register`, {
                email: newUser.email,
                password: newUser.password,
                role: registerRole,
                iban: newUser.iban
            }, { headers: headers })
            .then((response: any) => {
                registerUserSuccessAction();
                handleLogin({ email: newUser.email, password: newUser.password });
                redirectToOnboarding();
            })
            .catch((error: any) => {
                setResponseState(error)
                registerUserErrorAction(error);
            })
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: registerRole,
            iban: ''
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values) => {
            const { name, email, password, role, iban } = values;
            handleRegister(values);
            handleClose();
            resetTogglesModalAction();
        }
    })

    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleRegisterModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleRegisterModal}>
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
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='password'
                                autoComplete='off'
                                placeholder="Confirm Password"
                                hiddenLabel={true}
                                name='confirmPassword'
                                variant='standard'
                                value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword === ""}
                                helperText={errors.confirmPassword ? errors.confirmPassword : null}
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
                                placeholder="IBAN"
                                hiddenLabel={true}
                                name='iban'
                                variant='standard'
                                value={values.iban} onChange={handleChange} error={errors.iban === ""}
                                helperText={errors.iban ? errors.iban : null}
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
                                Sign up
                            </button>
                            <div>
                                <div className='hyperlinks'>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenLogin}>Already have an account?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fade>
        </Dialog>
    );
}

const mapStateToProps = (state: StoreState): { toggleRegisterModal: boolean, registerRole: string } => {
    return {
        toggleRegisterModal: selectRegisterModal(state),
        registerRole: selectRegisterRole(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions | TUserReducerActions | CallHistoryMethodAction>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL }),
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.TOGGLE_LOGIN_MODAL }),
        registerUserSuccessAction: () => dispatch<IRegisterSuccess>({ type: UserActionTypes.REGISTER_SUCCESS }),
        registerUserErrorAction: (data: string) => dispatch<IRegisterFailure>({ type: UserActionTypes.REGISTER_FAILED, data: data }),
        loginSuccessAction: (data: User) => dispatch<ILoginSuccess>({ type: UserActionTypes.LOGIN_SUCCESS, data: data }),
        loginFailureAction: (data: string) => dispatch<ILoginFailure>({ type: UserActionTypes.LOGIN_FAILED, data: data }),
        redirectToOnboarding: () => dispatch(push('/onboarding')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModalComponent);