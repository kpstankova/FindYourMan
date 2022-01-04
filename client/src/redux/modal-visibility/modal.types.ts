export enum ModalActionTypes {
    TOGGLE_LOGIN_MODAL = "TOGGLE_LOGIN_MODAL",
    TOGGLE_REGISTER_MODAL = "TOGGLE_REGISTER_MODAL",
    TOGGLE_FORGOT_PASSWORD_MODAL = "TOGGLE_FORGOT_PASSWORD_MODAL",
    RESET_TOGGLES_MODAL = "RESET_TOGGLES_MODAL",
    TOGGLE_REGISTER_AS_ROLE_MODAL = "TOGGLE_REGISTER_AS_ROLE_MODAL",
    TOGGLE_CONTACT_US_MODAL = "TOGGLE_CONTACT_US_MODAL",
}

export interface ModalState {
    toggleRegisterModal: boolean;
    toggleLoginModal: boolean;
    toggleForgotPasswordModal: boolean;
    toggleRegisterAsRoleModal: boolean;
    toggleContactUsModal: boolean;
}
