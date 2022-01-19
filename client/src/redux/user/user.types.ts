export enum UserActionTypes {
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILED = 'REGISTER_FAILED',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
    LOGOUT_SUCESS = 'LOGOUT_SUCESS',
    LOGOUT_FAILED = 'LOGOUT_FAILED',
    SET_REGISTER_ROLE = "SET_REGISTER_ROLE"
}

export interface UserState {
    registeredUser: boolean;
    authenticatedUser: boolean;
    currentUser: User;
    registerRole: string;
}

export interface RegisterState {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    iban: string;
}

export interface LoginState {
    email: string;
    password: string;
}

export interface User {
    id?: number;
    email: string;
    role?: string;
    vat?: string;
    address?: string;
    phone?: string;
    name?: string;
}