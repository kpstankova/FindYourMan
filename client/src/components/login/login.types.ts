import { makeStyles } from "@material-ui/core";

export interface LoginModalProps {
    toggleRegisterModal: boolean;
    toggleForgotPasswordModal: boolean;
    toggleLoginModal: boolean
    resetTogglesModalAction: () => void;
    toggleLogin: () => void;
    toggleRegister: (show: boolean) => void;
    toggleRegisterAsRoleModal: boolean;
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
}))