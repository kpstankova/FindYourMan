import { ServiceItem } from "../../components/services-page/my-services.types";
import { ServiceDetailsActionTypes } from "./service-details.types";

export interface IServiceDetailsBaseAction {
    type: ServiceDetailsActionTypes;
};

export interface ISetServiceDetails extends IServiceDetailsBaseAction {
    type: ServiceDetailsActionTypes.SET_SERVICE_STATE;
    data: ServiceItem | null;
}

export type TServiceDetailsReducerAction = ISetServiceDetails;