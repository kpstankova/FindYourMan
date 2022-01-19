import { DroppedFile } from "../../redux/onboarding/onboarding.types";
import { User } from "../../redux/user/user.types";
import * as Yup from 'yup'
import { makeStyles } from "@material-ui/core";

export interface MyServicesPageProps {
    currentUser: User;
    redirectToAddService: () => void;
};

export interface AddServiceComponentProps {
    currentUser: User;
    serviceImage: DroppedFile | null;
    redirectToServicePage: () => void;
    clearServiceImage: () => void;
}

export interface ServiceImageUploaderprops {
    serviceImage: DroppedFile | null;
    addServiceImageAction: (data: DroppedFile) => void;
}

export const validationSchema = Yup.object({
    nameOfService: Yup.string().required('This field is required'),
    category: Yup.string().required('This field is required'),
    price: Yup.number().required('This field is required'),
    duration: Yup.string().required('This field is required'),
    city: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
});

export interface AddServiceInput {
    nameOfService: string;
    category: string;
    price: number;
    duration: string;
    city: string;
    description: string;
};

export interface ServiceItem {
    service_id: number;
    picture: string;
    name: string;
    category: string;
    price: number;
    duration: string;
    city: string;
    description: string;
    rating: number;
    publish_date: string;
};

export interface ServiceItemComponentProps {
    currentUser: User;
    serviceItem: ServiceItem;
    isInDetails: boolean;
    setServiceDetailsState: (item: ServiceItem) => void;
    redirectToServiceDetails: (path: string) => void;
    addToCartAction: (data: ServiceItem) => void;
};

export const useStyles = makeStyles((theme) => ({
    inputUnderline: {
        borderBottom: `2px solid #FFFFFF !important`,
        "&:after": {
            borderBottom: `2px solid #FFFFFF !important`
        },
        "&:before" : {
            borderBottom: `2px solid #FFFFFF !important`
        },
        "&:hover" : {
            borderBottom: `2px solid #FFFFFF !important`
        }
    },
}))