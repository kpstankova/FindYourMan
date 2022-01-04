import { ModalActionTypes, ModalState } from './modal.types';
import { TModalReducerActions } from './modal.actions';
import { RoleTypes } from '../../components/register/register-modal.types';

const InitialState: ModalState = {
    toggleRegisterModal: false,
    toggleLoginModal: false,
    toggleForgotPasswordModal: false,
    toggleRegisterAsRoleModal: false,
    toggleContactUsModal: false,
};

export const modalReducer = (state = InitialState, action: TModalReducerActions): ModalState => {
    switch (action.type) {
        case ModalActionTypes.TOGGLE_REGISTER_MODAL:
            return {
                ...state,
                toggleRegisterModal: true,
                toggleLoginModal: false,
                toggleForgotPasswordModal: false,
                toggleRegisterAsRoleModal: false,
                toggleContactUsModal: false
            };
        case ModalActionTypes.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: true,
                toggleForgotPasswordModal: false,
                toggleRegisterAsRoleModal: false,
                toggleContactUsModal: false
            };
        case ModalActionTypes.TOGGLE_FORGOT_PASSWORD_MODAL:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: false,
                toggleForgotPasswordModal: true,
                toggleRegisterAsRoleModal: false,
                toggleContactUsModal: false
            };
        case ModalActionTypes.TOGGLE_REGISTER_AS_ROLE_MODAL:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: false,
                toggleForgotPasswordModal: false,
                toggleRegisterAsRoleModal: true,
                toggleContactUsModal: false
            };
        case ModalActionTypes.TOGGLE_CONTACT_US_MODAL:
            return {
                 ...state,
                 toggleRegisterModal: false,
                 toggleLoginModal: false,
                 toggleForgotPasswordModal: false,
                 toggleRegisterAsRoleModal: false,
                 toggleContactUsModal: true
            };

        case ModalActionTypes.RESET_TOGGLES_MODAL:
            return InitialState;
        default:
            return state;
    }
}

export default modalReducer;