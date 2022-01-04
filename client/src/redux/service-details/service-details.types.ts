import { ServiceItem } from "../../components/services-page/my-services.types";

export enum ServiceDetailsActionTypes {
    SET_SERVICE_STATE = 'SET_SERVICE_STATE'
};

export interface ServiceDetailsState {
    serviceItem: ServiceItem | null;
} 