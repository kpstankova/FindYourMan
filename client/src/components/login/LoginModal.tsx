import React from 'react';
import { Dialog, Fade, TextField} from "@mui/material";
import { dialogStyles, LoginModalProps } from './login.types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StoreState } from '../../redux/root-reducer';
import { Dispatch } from "redux";
import { selectForgotPasswordModal, selectLoginModal, selectRegisterAsRoleModal, selectRegisterModal } from '../../redux/modal-visibility/modal.selectors';
import { IResetToggles, IToggleLogin, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import Backdrop from '@material-ui/core/Backdrop';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './login.styles.scss'

const LoginModal: React.FC<LoginModalProps> = ({...props}) => {
    const { toggleRegisterAsRoleModal, toggleRegisterModal, toggleForgotPasswordModal, toggleLoginModal, resetTogglesModalAction, toggleLogin, toggleRegister } = props;

    const styles = dialogStyles();

    const handleClose = () => {
        resetTogglesModalAction();
    }

    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleLoginModal || toggleForgotPasswordModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleLoginModal || toggleForgotPasswordModal}>
                <div className='login-modal'>
                    <button className='close-button-login' aria-label='google' onClick={handleClose}>
                        <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                    </button>
                    <div className='login'>
            <h1 className='title'>Find your Man</h1>

            {/* {state.response ? <div className='error-box'>{state.response}</div> : null} */}
            <form className='login-form'  autoComplete='on'>
                <TextField
                    classes = {{root:styles.textFieldRoot}}
                    type='email'
                    autoComplete='off'
                    placeholder="Email"
                    hiddenLabel={true}
                    name='email'
                    variant='standard'
                    // value={values.email} onChange={handleChange} error={errors.email === ""}
                    // helperText={errors.email ? errors.email : null}
                    InputLabelProps={{ shrink: false }}
                    FormHelperTextProps={{ style:{
                        color: 'red',
                        fontSize: '10px',
                        width:'200px'
                    } }} />
                <TextField
                    classes = {{root:styles.textFieldRoot}}
                    type='password'
                    autoComplete='off'
                    placeholder="Password"
                    hiddenLabel={true}
                    name='password'
                    variant='standard'
                    // value={values.password} onChange={handleChange} error={errors.password === ""}
                    // helperText={errors.password ? errors.password : null}
                    InputLabelProps={{ shrink: false }}
                    FormHelperTextProps={{ style:{
                        color: 'red',
                        fontSize: '10px',
                        width:'200px'
                    } }} />
                <button
                    className= 'submit-button'
                    type='submit'>
                    Sign up
                </button>
                <button
                    className= 'google-button'
                    type='submit'>
                   Sign in with google
                </button>
                    <div>
                        <div className='hyperlinks'>
                            <Link className='hyperlink' to={'/'}>Forgot password?</Link>
                        </div>
                        <div className='hyperlinks'>
                            <span>No account yet? </span>
                            <Link className='hyperlink'  to={'/'}>Register</Link>
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

const mapStateToProps = (state: StoreState): { toggleForgotPasswordModal: boolean, toggleRegisterModal: boolean, toggleLoginModal: boolean, toggleRegisterAsRoleModal: boolean } => {
    return {
        toggleForgotPasswordModal: selectForgotPasswordModal(state),
        toggleRegisterModal: selectRegisterModal(state),
        toggleLoginModal: selectLoginModal(state),
        toggleRegisterAsRoleModal: selectRegisterAsRoleModal(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        toggleLogin: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal }),
        toggleRegister: () => dispatch<IToggleRegister>({ type: ModalActionTypes.ToggleRegisterModal }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);