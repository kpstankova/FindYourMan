import React from 'react';
import { Button } from '@mui/material'
import './navbar.styles.scss'
import LoginModal from '../login/LoginModal';
import { NavbarProps } from './navbar.types';
import { Dispatch } from "redux";
import { IToggleLogin, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';

const Navbar: React.FC<NavbarProps> = ({ ...props }) => {
    const { toggleLogin } = props;
    const handleOpenLogin = () => {
        toggleLogin();
    }

    return (
        <div className="navbar-container">
            <LoginModal />
            <div className="navbar-header-container">
                <div className="navbar-logo-container">
                    <div className="navbar-white-text">FIND</div>
                    <div className='navbar-black-text'>your</div>
                    <div className='navbar-white-text'>MAN</div>
                </div>
                <div className='navbar-buttons-container'>
                    <Button className='navigation-link' style={{ borderRadius: 50 }} onClick={handleOpenLogin}>Sign up</Button>
                    <Button className='navigation-link' style={{ borderRadius: 50 }} >Sign in</Button>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        toggleLogin: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal }),
    }
}

export default connect(null, mapDispatchToProps)(Navbar);