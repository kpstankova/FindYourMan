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
import ForgotPasswordModalComponent from '../forgot-password/forgot-password.component'
import { StoreState } from '../../redux/root-reducer';
import { User } from '../../redux/user/user.types';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import UserNavigationBarComponent from './user-navbar.component';
import { push, CallHistoryMethodAction } from "connected-react-router";

const Navbar: React.FC<NavbarProps> = ({ ...props }) => {
    const { currentUser, toggleLoginModalAction, toggleRegisterAsRoleModalAction, redirectToHomePage, redirectToMainPage } = props;
    const handleOpenLogin = () => {
        toggleLoginModalAction();
    }

    const handleOpenRegisterWrapper = () => {
        toggleRegisterAsRoleModalAction();
    }

    const handleLogoClick = () => {
        if (currentUser.id) {
            redirectToMainPage();
        } else {
            redirectToHomePage();
        }
    }

    return (
        <div className="navbar-container">
            <LoginModal />
            <RegisterWrapperComponent />
            <RegisterModalComponent />
            <ForgotPasswordModalComponent />
            <div className="navbar-header-container">
                <div className="navbar-logo-container">
                    <div className="navbar-white-text" onClick={handleLogoClick}>FIND</div>
                    <div className='navbar-black-text' onClick={handleLogoClick}>your</div>
                    <div className='navbar-white-text' onClick={handleLogoClick}>MAN</div>
                </div>
                {
                    currentUser && currentUser.email ?
                        <UserNavigationBarComponent />
                        :
                        <div className='navbar-buttons-container'>
                            <Button className='navigation-link' style={{ borderRadius: 50 }} onClick={handleOpenLogin}>Sign in</Button>
                            <Button className='navigation-link' style={{ borderRadius: 50 }} onClick={handleOpenRegisterWrapper}>Sign up</Button>
                        </div>
                }

            </div>
        </div>
    );
};

const mapStateToProps = (state: StoreState): { currentUser: User } => {
    return {
        currentUser: selectCurrentUser(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions |  CallHistoryMethodAction>) => {
    return {
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.TOGGLE_LOGIN_MODAL }),
        toggleRegisterAsRoleModalAction: () => dispatch<IToggleRegisterAsRole>({ type: ModalActionTypes.TOGGLE_REGISTER_AS_ROLE_MODAL }),
        redirectToMainPage: () => dispatch(push('/services')),
        redirectToHomePage: () => dispatch(push('/')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);