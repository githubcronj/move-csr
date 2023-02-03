import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS

} from './actionTypes';

import { LoginActions, LoginState } from './types';

const initialState: LoginState = {
    login: [],
    error: null,
    isLoggedIn:false,
    logout:[],
    logOutError:false,
    isLoggedOut:false


};

export default (state = initialState, action: LoginActions) => {

    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: [],
                error: null,
                isLoggedIn:false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: action.payload.token,
                error: null,
                isLoggedIn:true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                login: [],
                error: action.payload.error,
                isLoggedIn:false
            };

            case LOGOUT:
                return {
                    ...state,
                    logout: [],
                    logoutError: null,
                    isLoggedOut:false
                };
            case LOGOUT_SUCCESS:
                return {
                    ...state,
                    logout: action.payload.logoutSuccess,
                    logoutError: null,
                    isLoggedOut:true
                };
            case LOGOUT_ERROR:
                return {
                    ...state,
                    login: [],
                    logoutError: action.payload.logoutError,
                    isLoggedOut:false
                };
            default:
                return {
                    ...state,
                };
      
    }
};
