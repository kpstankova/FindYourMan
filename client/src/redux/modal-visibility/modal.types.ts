export enum ModalActionTypes {
    ToggleLoginModal = "TOGGLE_LOGIN_MODAL",
    ToggleRegisterModal = "TOGGLE_REGISTER_MODAL",
    ToggleForgotPasswordModal = "TOGGLE_FORGOTPASSWORD_MODAL",
    ResetTogglesModal = "RESET_TOGGLES_MODAL",
    ToggleRegisterAsRoleModal="TOGGLE_REGISTER_AS_ROLE_MODAL"
}

export interface ModalState {
    toggleRegisterModal: boolean;
    toggleLoginModal: boolean;
    toggleForgotPasswordModal: boolean;
    toggleRegisterAsRoleModal:boolean;
}
