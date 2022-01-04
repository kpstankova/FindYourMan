import { TServiceDetailsReducerAction } from "./service-details.actions";
import { ServiceDetailsActionTypes, ServiceDetailsState } from "./service-details.types";

const InitialState: ServiceDetailsState = {
    serviceItem: null
}

export const serviceDetailsReducer = (state = InitialState, action: TServiceDetailsReducerAction): ServiceDetailsState => {
    switch (action.type) {
        case ServiceDetailsActionTypes.SET_SERVICE_STATE: {
            return {
                ...state,
                serviceItem: action.data
            }
        }
        default:
            return state;
    }
}