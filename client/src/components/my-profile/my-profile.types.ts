import { makeStyles } from "@material-ui/core";
import * as Yup from 'yup'

export interface MyProfileComponentProps {
    redirectToMainPage: () => void;
}

export const onboardingForm = makeStyles(() => ({
    textFieldRoot: {
        width: '80%',
        marginTop: '20px',
        color: 'grey',
        marginLeft: '15px',
        borderRadius: '0px',
        marginBottom: '5% !important',
        "&:focus": {
            color: "rgb(12, 175, 149)"
        },
        '&:after': {
            borderBottom: '2px solid rgb(12, 175, 149)'
        }
    }
}));

export const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    vatNumber: Yup.string().required('Vat number is required'),
    phoneNumber: Yup.string().required('Phone number is required')
});