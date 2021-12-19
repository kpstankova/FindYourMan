import React, { useState } from 'react';
import { MenuItem, Menu, Fade, Button } from "@material-ui/core";
import { UserNavigationProps, useStyles } from './navbar.types';
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios';
import { headers } from '../register/register-modal.types';
import { connect } from 'react-redux';
import { ILogoutFailure, ILogoutSuccess, TUserReducerActions } from '../../redux/user/user.actions';
import { Dispatch } from "redux";
import { UserActionTypes } from '../../redux/user/user.types';
import { push, CallHistoryMethodAction } from "connected-react-router";
import './navbar.styles.scss'
const UserNavigationBarComponent: React.FC<UserNavigationProps> = ({ ...props }) => {
    const { logoutUserSuccessAction, logoutUserErrorAction, redirectToHome } = props;
    const classes = useStyles();
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorElement);
    const handleClose = (): void => {
        setAnchorElement(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const handleLogout = () => {
        const accessToken = localStorage.getItem('accessToken')

        return axios
			.post(`http://localhost:3001/auth/logout`, {
				token: accessToken
			}, { headers: headers })
			.then((response: any) => {
				logoutUserSuccessAction();
				localStorage.clear();
				redirectToHome();
                return response.data;
			})
			.catch((error: any) => {
				logoutUserErrorAction(error);
			});
    };


    return (
        <React.Fragment>
             <Button className='navigation-link-currentUser' style={{ borderRadius: 50, color: 'white' }} onClick={handleClick}>My profile</Button>
            <Menu
                id="fade-menu"
                getContentAnchorEl={null}
                anchorEl={anchorElement}
                keepMounted
                open={open}
                classes={{ paper: classes.paper, list: classes.list }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem>
                    <RouterLink className="nav-link-option" to="/" onClick={handleClose}>My profile</RouterLink>
                </MenuItem>
                <MenuItem>
                    <RouterLink className="nav-link-option" to="/" onClick={handleClose}>History of orders</RouterLink>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Exit</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

const mapDispatchToProps = (dispatch: Dispatch<TUserReducerActions | CallHistoryMethodAction>) => {
    return {
        logoutUserSuccessAction: () => dispatch<ILogoutSuccess>({type: UserActionTypes.LOGOUT_SUCESS}),
        logoutUserErrorAction: (data: string) => dispatch<ILogoutFailure>({ type: UserActionTypes.LOGOUT_FAILED, data: data}),
        redirectToHome: () => dispatch(push('/')),
    }
}

export default connect(null, mapDispatchToProps)(UserNavigationBarComponent);