import { ModalActionTypes } from './modal.types';

export interface IModalBaseAction {
    type: ModalActionTypes;
}

export interface IToggleRegister extends IModalBaseAction {
    type: ModalActionTypes.ToggleRegisterModal
}

export interface IToggleLogin extends IModalBaseAction {
    type: ModalActionTypes.ToggleLoginModal
}

export interface IToggleForgotPassword extends IModalBaseAction {
    type: ModalActionTypes.ToggleForgotPasswordModal
}

export interface IResetToggles extends IModalBaseAction {
    type: ModalActionTypes.ResetTogglesModal;
}

export interface IToggleRegisterAsRole extends IModalBaseAction{
    type:ModalActionTypes.ToggleRegisterAsRoleModal
}

export type TModalReducerActions =IToggleRegisterAsRole | IToggleRegister | IToggleLogin | IToggleForgotPassword | IResetToggles;