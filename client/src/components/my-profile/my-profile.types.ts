import { makeStyles } from "@material-ui/core";
import * as Yup from 'yup'
import { DroppedFile } from "../../redux/onboarding/onboarding.types";
import { User } from "../../redux/user/user.types";

export interface MyProfileComponentProps {
    profileImage: DroppedFile | null;
    currentUser: User;
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
    name: Yup.string(),
    address: Yup.string(),
    vatNumber: Yup.string(),
    phoneNumber: Yup.string()
});