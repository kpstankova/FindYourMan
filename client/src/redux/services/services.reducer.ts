import { TServicesReducerAction } from "./services.actions";
import { ServicesActionTypes, ServicesState } from "./services.types";

const InitialState: ServicesState = {
    serviceImage: null
}

export const servicesReducer = (state = InitialState, action: TServicesReducerAction): ServicesState => {
    switch (action.type) {
        case ServicesActionTypes.ADD_SERVICE_IMAGE: {
            return {
                ...state,
                serviceImage: action.data
            }
        }
        case ServicesActionTypes.CLEAR_SERVICE_IMAGE: {
            return InitialState;
        }
        default:
            return state;
    }
}