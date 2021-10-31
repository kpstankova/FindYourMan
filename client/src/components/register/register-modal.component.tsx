import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Fade, TextField } from "@mui/material";
import Backdrop from '@material-ui/core/Backdrop';
import { Link } from 'react-router-dom';
import { dialogStyles, RegisterModalProps } from './register-modal.types';
import { selectRegisterModal } from '../../redux/modal-visibility/modal.selectors';
import { StoreState } from '../../redux/root-reducer';
import { IResetToggles, IToggleLogin, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";

const RegisterModalComponent: React.FC<RegisterModalProps> = ({ ...props }) => {
    const { resetTogglesModalAction, toggleLoginModalAction, toggleRegisterModal} = props;

    const styles = dialogStyles();

    const handleClose = () => {
        resetTogglesModalAction();
    }

    const handleOpenLogin = () => {
        toggleLoginModalAction();
    }

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

                        {/* {state.response ? <div className='error-box'>{state.response}</div> : null} */}
                        <form className='login-form' autoComplete='on'>
                        <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="Name"
                                hiddenLabel={true}
                                name='name'
                                variant='standard'
                                // value={values.password} onChange={handleChange} error={errors.password === ""}
                                // helperText={errors.password ? errors.password : null}
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
                                type='email'
                                autoComplete='off'
                                placeholder="Email"
                                hiddenLabel={true}
                                name='email'
                                variant='standard'
                                // value={values.email} onChange={handleChange} error={errors.email === ""}
                                // helperText={errors.email ? errors.email : null}
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
                                // value={values.password} onChange={handleChange} error={errors.password === ""}
                                // helperText={errors.password ? errors.password : null}
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
                                // value={values.password} onChange={handleChange} error={errors.password === ""}
                                // helperText={errors.password ? errors.password : null}
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
                            <div>
                                <div className='hyperlinks'>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenLogin}>Already have an account?</Link>
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

const mapStateToProps = (state: StoreState): { toggleRegisterModal: boolean } => {
    return {
        toggleRegisterModal: selectRegisterModal(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModalComponent);