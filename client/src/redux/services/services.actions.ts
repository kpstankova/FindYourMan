import { DroppedFile } from "../onboarding/onboarding.types";
import { ServicesActionTypes } from "./services.types";

export interface IServicesBaseAction {
    type: ServicesActionTypes;
}

export interface IAddServiceImage extends IServicesBaseAction {
    type: ServicesActionTypes.ADD_SERVICE_IMAGE;
    data: DroppedFile;
}

export interface IClearServiceImage extends IServicesBaseAction {
    type: ServicesActionTypes.CLEAR_SERVICE_IMAGE
}

export type TServicesReducerAction = IAddServiceImage | IClearServiceImage;