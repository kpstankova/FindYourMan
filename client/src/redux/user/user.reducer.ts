import { RoleTypes } from "../../components/register/register-modal.types";
import { TUserReducerActions } from "./user.actions";
import { User, UserActionTypes, UserState } from "./user.types";

const InitialState: UserState = {
    registeredUser: false,
    authenticatedUser: false,
    currentUser: {} as User,
    registerRole: RoleTypes.CLIENT
};

export const userReducer = (state = InitialState, action: TUserReducerActions): UserState => {
    switch (action.type) {
        case UserActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                registeredUser: true,
            };
        case UserActionTypes.REGISTER_FAILED:
            return {
                ...state,
                registeredUser: false
            }
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authenticatedUser: true,
                currentUser: action.data
            }
        case UserActionTypes.LOGIN_FAILED:
            return {
                ...state,
                authenticatedUser: false
            }
        case UserActionTypes.LOGOUT_SUCESS:
            return {
                ...state,
                authenticatedUser: false,
                registeredUser: false,
                currentUser: {} as User
            }
        case UserActionTypes.LOGOUT_FAILED:
            return {
                ...state,
                authenticatedUser: false
            }
        case UserActionTypes.SET_REGISTER_ROLE:
            return {
                ...state,
                registerRole: action.data
            };
        default:
            return InitialState;
    }
}

export default userReducer;