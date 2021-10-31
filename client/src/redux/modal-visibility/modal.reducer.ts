import { ModalActionTypes, ModalState } from './modal.types';
import { TModalReducerActions } from './modal.actions';
import { RoleTypes } from '../../components/register/register-modal.types';

const InitialState: ModalState = {
    toggleRegisterModal: false,
    toggleLoginModal: false,
    toggleForgotPasswordModal: false,
    toggleRegisterAsRoleModal: false,
    registerRole: RoleTypes.CLIENT
};

export const modalReducer = (state = InitialState, action: TModalReducerActions): ModalState => {
    switch (action.type) {
        case ModalActionTypes.ToggleRegisterModal:
            return {
                ...state,
                toggleRegisterModal: true,
                toggleLoginModal: false,
                toggleForgotPasswordModal: false,
                toggleRegisterAsRoleModal: false
            };
        case ModalActionTypes.ToggleLoginModal:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: true,
                toggleForgotPasswordModal: false,
                toggleRegisterAsRoleModal: false
            };
        case ModalActionTypes.ToggleForgotPasswordModal:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: false,
                toggleForgotPasswordModal: true,
                toggleRegisterAsRoleModal: false
            };
        case ModalActionTypes.ToggleRegisterAsRoleModal:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: false,
                toggleForgotPasswordModal: false,
                toggleRegisterAsRoleModal: true
            }
        case ModalActionTypes.SetRegisterRole:
            return {
                ...state,
                registerRole: action.data
            };
        case ModalActionTypes.ResetTogglesModal:
            return InitialState;
        default:
            return state;
    }
}

export default modalReducer;