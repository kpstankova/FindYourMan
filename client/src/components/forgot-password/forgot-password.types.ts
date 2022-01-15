import * as Yup from 'yup'

export interface ForgotPasswordModalProps {
    toggleForgotPasswordModal: boolean;
    resetTogglesModalAction: () => void;
    toggleRegisterAsRoleModalAction: () => void;
    toggleLoginModalAction: () => void;
}

export const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
});