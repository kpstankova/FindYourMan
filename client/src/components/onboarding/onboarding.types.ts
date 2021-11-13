import { makeStyles } from "@material-ui/core";
import { DroppedFile } from "../../redux/onboarding/onboarding.types";

export interface ProfileImageUploaderProps {
    profileImage: DroppedFile | null;
    addProfileImageAction: (data: DroppedFile) => void;
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
}))