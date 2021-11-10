import React from 'react';
import { TextField } from '@mui/material'
import { onboardingForm } from './onboarding.types';

const OnboardingFormComponent = () => {

    const styles = onboardingForm();

    return (
        <form>
            <TextField
                classes={{ root: styles.textFieldRoot }}
                type='text'
                autoComplete='off'
                placeholder="Name"
                hiddenLabel={true}
                name='name'
                variant='standard'
                InputLabelProps={{ shrink: false }}
                FormHelperTextProps={{
                    style: {
                        color: 'red',
                        fontSize: '10px',
                        width: '200px'
                    }
                }} />
            <TextField
                classes={{ root: styles.textFieldRoot }}
                type='text'
                autoComplete='off'
                placeholder="Address"
                hiddenLabel={true}
                name='address'
                variant='standard'
                InputLabelProps={{ shrink: false }}
                FormHelperTextProps={{
                    style: {
                        color: 'red',
                        fontSize: '10px',
                        width: '200px'
                    }
                }} />
            <TextField
                classes={{ root: styles.textFieldRoot }}
                type='text'
                autoComplete='off'
                placeholder="VAT"
                hiddenLabel={true}
                name='vatNumber'
                variant='standard'
                InputLabelProps={{ shrink: false }}
                FormHelperTextProps={{
                    style: {
                        color: 'red',
                        fontSize: '10px',
                        width: '200px'
                    }
                }} />
            <TextField
                classes={{ root: styles.textFieldRoot }}
                type='text'
                autoComplete='off'
                placeholder="Phone number"
                hiddenLabel={true}
                name='phoneNUmber'
                variant='standard'
                InputLabelProps={{ shrink: false }}
                FormHelperTextProps={{
                    style: {
                        color: 'red',
                        fontSize: '10px',
                        width: '200px'
                    }
                }} />
        </form>
    );
}

export default OnboardingFormComponent;