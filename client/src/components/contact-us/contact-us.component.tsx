import React, { useState } from 'react';
import { Dialog, Fade } from "@mui/material";
import { dialogStyles, ContactUsComponentProp } from './contact-us.types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StoreState } from '../../redux/root-reducer';
import { Dispatch } from "redux";
import {selectContactUsModal} from '../../redux/modal-visibility/modal.selectors';
import { IToggleContactUs } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import Backdrop from '@material-ui/core/Backdrop';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './login.styles.scss'



const contactUsComponent: React.FC<ContactUsComponentProp> = ({...props}) => {
    console.log("fhdjjdjd");
    const { toggleContactUsModal } = props;
    
    const styles = dialogStyles();
 
    return (
            <Dialog
                classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
                closeAfterTransition={true}
                open={toggleContactUsModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 800
                }}>
    
                <Fade in={toggleContactUsModal}>
                    <div className='contact-us-modal'>
                        <button className='close-button-contact' aria-label='google' >
                            <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                        </button>
                        <div className='contact-us'>
                            <h1 className='title'>Contact US!</h1>
                            <h3 className='text1'>You can send us an email at <b>FindYourMan@gmail.com</b></h3>
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
}


export default connect(mapStateToProps, null)(contactUsComponent);