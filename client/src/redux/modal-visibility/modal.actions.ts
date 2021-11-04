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

export interface ISetRegisterRole extends IModalBaseAction {
    type: ModalActionTypes.SetRegisterRole,
    data: string;
}

export type TModalReducerActions =IToggleRegisterAsRole | IToggleRegister | IToggleLogin | IToggleForgotPassword | IResetToggles | ISetRegisterRole;