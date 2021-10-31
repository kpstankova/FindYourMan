import { ModalActionTypes, ModalState } from './modal.types';
import { TModalReducerActions } from './modal.actions';

const InitialState: ModalState = {
    toggleRegisterModal: false,
    toggleLoginModal: false,
    toggleForgotPasswordModal: false,
    toggleRegisterAsRoleModal:false
};

export const modalReducer = ( state = InitialState, action: TModalReducerActions) : ModalState => {
    switch(action.type) {
        case ModalActionTypes.ToggleRegisterModal:
            return {
                toggleRegisterModal: true,
                toggleLoginModal: false,
                toggleForgotPasswordModal: false,
                toggleRegisterAsRoleModal:false
            };
        case ModalActionTypes.ToggleLoginModal:
            return {
                toggleRegisterModal: false,
                toggleLoginModal: true,
                toggleForgotPasswordModal: false,
                toggleRegisterAsRoleModal:false
            };
        case ModalActionTypes.ToggleForgotPasswordModal:
            return {
                toggleRegisterModal: false,
                toggleLoginModal: false,
                toggleForgotPasswordModal: true,
                toggleRegisterAsRoleModal:false
            };
        case ModalActionTypes.ToggleRegisterAsRoleModal:
            return{
                toggleRegisterModal:false,
                toggleLoginModal:false,
                toggleForgotPasswordModal:false,
                toggleRegisterAsRoleModal:true
            }
        case ModalActionTypes.ResetTogglesModal:
            return InitialState;
        default:
            return state;
    }
}

export default modalReducer;