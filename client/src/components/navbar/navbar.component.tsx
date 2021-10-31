import React from 'react';
import { Button } from '@mui/material'
import './navbar.styles.scss'
import LoginModal from '../login/login.component';
import { NavbarProps } from './navbar.types';
import { Dispatch } from "redux";
import { IToggleLogin, IToggleRegisterAsRole, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';
import RegisterWrapperComponent from '../register-wrapper/register-wrapper.component';
import RegisterModalComponent from '../register/register-modal.component';

const Navbar: React.FC<NavbarProps> = ({ ...props }) => {
    const { toggleLoginModalAction, toggleRegisterAsRoleModalAction } = props;
    const handleOpenLogin = () => {
        toggleLoginModalAction();
    }

    const handleOpenRegisterWrapper = () => {
        toggleRegisterAsRoleModalAction();
    }

    return (
        <div className="navbar-container">
            <LoginModal />
            <RegisterWrapperComponent />
            <RegisterModalComponent />
            <div className="navbar-header-container">
                <div className="navbar-logo-container">
                    <div className="navbar-white-text">FIND</div>
                    <div className='navbar-black-text'>your</div>
                    <div className='navbar-white-text'>MAN</div>
                </div>
                <div className='navbar-buttons-container'>
                    <Button className='navigation-link' style={{ borderRadius: 50 }} onClick={handleOpenLogin}>Sign up</Button>
                    <Button className='navigation-link' style={{ borderRadius: 50 }} onClick={handleOpenRegisterWrapper}>Sign in</Button>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal }),
        toggleRegisterAsRoleModalAction: () => dispatch<IToggleRegisterAsRole>({ type: ModalActionTypes.ToggleRegisterAsRoleModal })
    }
}

export default connect(null, mapDispatchToProps)(Navbar);