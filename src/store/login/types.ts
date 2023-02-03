import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS
 
} from './actionTypes';

export interface ILogin {
    token: string;
    logoutSuccess:string;
  
}

export interface LoginState {
    login: ILogin[];
    logout:ILogin[];
    error: string | null;
    isLoggedIn:boolean;
    logOutError: boolean;
    isLoggedOut:boolean
  
}

export interface LoginSuccessPayload {
    token: ILogin[];
}

export interface LoginFailurePayload {
    error: string;
}

export interface LoginRequest {
    login: ILogin[];
}

export type Login = {
    type: typeof LOGIN;
    payload: LoginRequest;
};

export type LoginSuccess = {
    type: typeof LOGIN_SUCCESS;
    payload: LoginSuccessPayload;
};

export type LoginFailure = {
    type: typeof LOGIN_ERROR;
    payload: LoginFailurePayload;
};

//logOut
export interface LogoutSuccessPayload {
    logoutSuccess: ILogin[];
}

export interface LogoutFailurePayload {
    logoutError: string;
}

export interface LogoutRequest {
    Logout: ILogin[];
}

export type Logout = {
    type: typeof LOGOUT;
    payload: LogoutRequest;
};

export type LogoutSuccess = {
    type: typeof LOGOUT_SUCCESS;
    payload: LogoutSuccessPayload;
};

export type LogoutFailure = {
    type: typeof LOGOUT_ERROR;
    payload: LogoutFailurePayload;
};



export type LoginActions =
    | Login
    | LoginSuccess
    | LoginFailure
    | Logout
    | LogoutSuccess
    | LogoutFailure
   
