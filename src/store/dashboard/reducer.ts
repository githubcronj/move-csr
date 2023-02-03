import {
    GET_USERS,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS,
    // GET_SINGLE_USER,
    // GET_SINGLE_USER_ERROR,
    // GET_SINGLE_USER_SUCCESS

} from './actionTypes';

import { UsersActions, UsersState } from './types';

const initialState: UsersState = {

    users: [],
    userDataArrived:false
    // user:[]
  
};

export default (state = initialState, action: UsersActions) => {
  
    switch (action.type) {

        case GET_USERS:
            return {
                ...state,
                users: [],
                error: null,
                userDataArrived:false
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                error: null,
                userDataArrived:true
            };
        case GET_USERS_ERROR:
            return {
                ...state,
                users: [],
                error: action.payload.error,
                userDataArrived:false
            };

        //       case GET_SINGLE_USER:
        //     return {
        //         ...state,
        //         user: [],
        //         error: null,
        //     };
        // case GET_SINGLE_USER_SUCCESS:
        //     return {
        //         ...state,
        //         user: action.payload.user,
        //         error: null,
        //     };
        // case GET_SINGLE_USER_ERROR:
        //     return {
        //         ...state,
        //         user: [],
        //         error: action.payload.error,
        //     };

            
        default:
            return {
                ...state,
            };
    }
};
