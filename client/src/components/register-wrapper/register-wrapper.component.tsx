import React from "react";
import { Dialog, Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { RegisterWrapperProps, wrapperStyles } from "./register-wrapper.types";
import Backdrop from '@material-ui/core/Backdrop';
import { Link } from 'react-router-dom';
import { StoreState } from "../../redux/root-reducer";
import { IResetToggles, IToggleRegister, TModalReducerActions } from "../../redux/modal-visibility/modal.actions";
import { ModalActionTypes } from "../../redux/modal-visibility/modal.types";
import { selectRegisterAsRoleModal } from "../../redux/modal-visibility/modal.selectors";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import './register-wrapper.styles.scss';
import { RoleTypes } from "../register/register-modal.types";
import { UserActionTypes } from "../../redux/user/user.types";
import { ISetRegisterRole, TUserReducerActions } from "../../redux/user/user.actions";

const RegisterWrapperComponent: React.FC<RegisterWrapperProps> = ({ ...props }) => {
    const {toggleRegisterAsRoleModal, resetTogglesModalAction, toggleRegisterModalAction, setRegisterRoleAction} = props;
    const classes = wrapperStyles();

    const handleClick = () => {
        resetTogglesModalAction();
    }

    const handleOpenSignUp = (event: any) => {
        resetTogglesModalAction();
        toggleRegisterModalAction();
        setRegisterRoleAction(event?.target.value);
    }

    return (
        <Dialog
            classes={{ root: classes.dialogRoot, paperWidthSm: classes.dialogPaperWidthSm }}
            closeAfterTransition={true} onClose={handleClick} open={toggleRegisterAsRoleModal} aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description" BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 800 }}>
            <Fade in={toggleRegisterAsRoleModal}>
                <div className="register-wraper-container">
                    <button className='close-button' aria-label='google' onClick={handleClick}>
                        <FontAwesomeIcon className='icon-button' icon={faTimes} />
                    </button>
                    <h1>Sign up as:</h1>
                    <div className="sign-in-buttons">
                        <div className="button-wraper">
                            <button className="button-styles" value={RoleTypes.CLIENT} onClick={handleOpenSignUp}>Client</button>
                        </div>
                        <div className="button-wraper">
                            <button className="button-styles" value={RoleTypes.COMPANY} onClick={handleOpenSignUp}>Company</button>
                        </div>
                        <div className="button-wraper">
                            <button className="button-styles" value={RoleTypes.FREELANCER} onClick={handleOpenSignUp}>Freelancer</button>
                        </div>
                    </div>
                    <div className='hyperlinks'>
                        <Link className='hyperlink' to={'/'}>Read about roles</Link>
                    </div>
                </div>
            </Fade>
        </Dialog>
    );
}

const mapStateToProps = (state: StoreState): { toggleRegisterAsRoleModal: boolean } => {
    return {
        toggleRegisterAsRoleModal: selectRegisterAsRoleModal(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions | TUserReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL }),
        toggleRegisterModalAction: () => dispatch<IToggleRegister>({ type: ModalActionTypes.TOGGLE_REGISTER_MODAL }),
        setRegisterRoleAction: (data: string) => dispatch<ISetRegisterRole>({type: UserActionTypes.SET_REGISTER_ROLE, data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterWrapperComponent);