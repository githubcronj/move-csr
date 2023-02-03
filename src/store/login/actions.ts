import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS,
    LOGOUT
  
} from './actionTypes';
import {
    Login,
    LoginRequest,
    LoginFailure,
    LoginFailurePayload,
    LoginSuccess,
    LoginSuccessPayload,
    Logout,
    LogoutFailure,
    LogoutSuccess,
    LogoutFailurePayload,
    LogoutSuccessPayload,
    LogoutRequest
   
} from './types';

export const login = (payload: LoginRequest): Login => {

    return {
        type: LOGIN,
        payload,
    };
};

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
    type: LOGIN_SUCCESS,
    payload,
});

export const loginFailure = (payload: LoginFailurePayload): LoginFailure => {
    console.log("failure",payload)
   return  {

    type: LOGIN_ERROR,
    payload,
}};

export const logout = (payload: LogoutRequest): Logout => {
    return {
        type: LOGOUT,
        payload,
    };
};

export const logoutSuccess = (payload: LogoutSuccessPayload): LogoutSuccess => ({
    type: LOGOUT_SUCCESS,
    payload,
});

export const logoutFailure = (payload: LogoutFailurePayload): LogoutFailure => {
   return  {

    type: LOGOUT_ERROR,
    payload,
}};

