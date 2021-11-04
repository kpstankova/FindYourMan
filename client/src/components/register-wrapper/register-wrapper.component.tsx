import React from "react";
import { Dialog, Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { RegisterWrapperProps, wrapperStyles } from "./register-wrapper.types";
import Backdrop from '@material-ui/core/Backdrop';
import { Link } from 'react-router-dom';
import { StoreState } from "../../redux/root-reducer";
import { IResetToggles, ISetRegisterRole, IToggleRegister, TModalReducerActions } from "../../redux/modal-visibility/modal.actions";
import { ModalActionTypes } from "../../redux/modal-visibility/modal.types";
import { selectRegisterAsRoleModal } from "../../redux/modal-visibility/modal.selectors";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import './register-wrapper.styles.scss';
import { RoleTypes } from "../register/register-modal.types";

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

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        toggleRegisterModalAction: () => dispatch<IToggleRegister>({ type: ModalActionTypes.ToggleRegisterModal }),
        setRegisterRoleAction: (data: string) => dispatch<ISetRegisterRole>({type: ModalActionTypes.SetRegisterRole, data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterWrapperComponent);