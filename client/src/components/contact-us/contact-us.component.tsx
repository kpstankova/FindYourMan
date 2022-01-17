import React, { useState } from 'react';
import { Dialog, Fade } from "@mui/material";
import { dialogStyles, ContactUsComponentProp } from './contact-us.types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StoreState } from '../../redux/root-reducer';
import Backdrop from '@material-ui/core/Backdrop';
import { connect } from 'react-redux';
import './contact-us.styles.scss'
import { selectContactUsModal } from '../../redux/modal-visibility/modal.selectors';
import { IResetToggles, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { Dispatch } from "redux";
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';



const ContactUsComponent: React.FC<ContactUsComponentProp> = ({...props}) => {
    const { toggleContactUsModal, resetTogglesModalAction} = props;
    
    const styles = dialogStyles();

    const handleClose = () => {
        resetTogglesModalAction();
    }
 
    return (
            <Dialog
                classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
                closeAfterTransition={true}
                onClose={handleClose}
                open={toggleContactUsModal!}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 800
                }}>
    
                <Fade in={toggleContactUsModal}>
                    <div className='contact-us-modal'>
                        <button className='close-button-contact' aria-label='google'  onClick={handleClose}>
                            <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                        </button>
                        <div className='contact-us'>
                            <h1 className='title'>Contact US!</h1>
                            <h3 className='text1'>You can send us an email at </h3>
                            <h3 className='text1'>FindYourMan@gmail.com</h3>
                            <h4 className='text2'> or </h4>
                            <h3 className='text3'>You can call us at <b>1234567890</b></h3>
                            <button className='submit-button' type='submit'>Let`s have fun together!</button>
                        </div>
                     </div>
                </Fade> 
            </Dialog>
    )
} 

const mapStateToProps = (state: StoreState): { toggleContactUsModal: boolean } => {
    return {
        toggleContactUsModal: selectContactUsModal(state),
    }
};

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactUsComponent);