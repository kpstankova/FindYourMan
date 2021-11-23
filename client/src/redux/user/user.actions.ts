import { RegisterState, User, UserActionTypes } from "./user.types";

export interface IUserBaseAction {
    type: UserActionTypes;
}

export interface IRegisterSuccess extends IUserBaseAction {
    type: UserActionTypes.REGISTER_SUCCESS;
};

export interface IRegisterFailure extends IUserBaseAction {
    type: UserActionTypes.REGISTER_FAILED;
    data: string;
};

export interface ILoginSuccess extends IUserBaseAction {
    type: UserActionTypes.LOGIN_SUCCESS;
    data: User;
};

export interface ILoginFailure extends IUserBaseAction {
    type: UserActionTypes.LOGIN_FAILED;
    data: string;
};

export interface ILogoutSuccess extends IUserBaseAction {
    type: UserActionTypes.LOGOUT_SUCESS;
};

export interface ILogoutFailure extends IUserBaseAction {
    type: UserActionTypes.LOGOUT_FAILED;
    data: string;
};

export interface ISetRegisterRole extends IUserBaseAction {
    type: UserActionTypes.SET_REGISTER_ROLE,
    data: string;
}

export type TUserReducerActions = IRegisterSuccess | IRegisterFailure| ILogoutSuccess 
                                  | ILogoutFailure | ILoginSuccess | ILoginFailure
                                  | ISetRegisterRole;