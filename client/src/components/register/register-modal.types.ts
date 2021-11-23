import { makeStyles } from "@material-ui/core";
import * as Yup from 'yup'
import { RegisterState } from "../../redux/user/user.types";

export interface RegisterModalProps {
    toggleRegisterModal: boolean;
    registerRole: string;
    registerUserSuccessAction: () => void;
    registerUserErrorAction: (data: string) => void;
    resetTogglesModalAction: () => void;
    toggleLoginModalAction: () => void;
}

export const dialogStyles = makeStyles(() => ({
    dialogRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogPaper: {
        overflowY: 'hidden',
        boxShadow: '0px 3px 6px #F5F8FD'
    },
    closeButton: {
        padding: '0px'
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

export enum RoleTypes {
    CLIENT = "client",
    FREELANCER = "freelancer",
    COMPANY = "company"
};

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required').matches(
        PASSWORD_REGEX,
        "Field requires at least 8 Characters, one Uppercase letter, one Number and one special case Character"
    ),
    confirmPassword: Yup.string().required('Confirm Password is required').when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "The password must be the same"
        )
    }),
});

export const headers = {
    'Content-Type': 'application/json'
}