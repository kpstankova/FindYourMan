import { makeStyles } from "@material-ui/core";
import { User } from "../../redux/user/user.types";

export interface NavbarProps {
    currentUser: User;
    toggleLoginModalAction: () => void;
    toggleRegisterAsRoleModalAction: () => void;
    redirectToMainPage: () => void;
    redirectToHomePage: () => void;
};

export interface UserNavigationProps {
    currentUser: User;
    logoutUserSuccessAction: () => void;
    logoutUserErrorAction: (data: string) => void;
    redirectToHome: () => void;
    redirectToMyProfile: () => void;
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