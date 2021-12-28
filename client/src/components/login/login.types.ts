import { makeStyles } from "@material-ui/core";
import * as Yup from 'yup'
import { User } from "../../redux/user/user.types";

export interface LoginModalProps {
    toggleForgotPasswordModal: boolean;
    toggleLoginModal: boolean
    loginSuccessAction: (data: User) => void;
    loginFailureAction: (data: string) => void;
    resetTogglesModalAction: () => void;
    toggleForgotPasswordModalAction: () => void;
    toggleRegisterAsRoleModalAction: () => void;
}

export const dialogStyles = makeStyles(() => ({
    dialogRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogPaper: {
        overflowY: 'hidden',
        boxShadow:'0px 3px 6px #F5F8FD'
    },
    closeButton:{
        padding:'0px'
    },
    textFieldRoot: {
        width: '80%',
        marginTop: '20px',
        color: 'grey',
        marginLeft: '15px',
        borderRadius: '0px',
        "&:focus": {
            color: "rgb(12, 175, 149)"
        },
        '&:after': {
            borderBottom: '2px solid rgb(12, 175, 149)'
        }
    }
}));

export const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required')
});