import { makeStyles } from "@material-ui/core";
import { User } from "../../redux/user/user.types";

export interface NavbarProps {
    currentUser: User;
    toggleLoginModalAction: () => void;
    toggleRegisterAsRoleModalAction: () => void;
};

export interface UserNavigationProps {
    logoutUserSuccessAction: () => void;
    logoutUserErrorAction: (data: string) => void;
    redirectToHome: () => void;
}

export const useStyles = makeStyles((theme) => ({
    list: {
        display: 'flex',
        flexDirection: 'column'
    },
    paper: {
        border: '1px solid #d3d4d5',
    }
}));