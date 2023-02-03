import {
    GET_USERS,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS,
    // GET_SINGLE_USER,
    // GET_SINGLE_USER_SUCCESS,
    // GET_SINGLE_USER_ERROR

} from './actionTypes';
import {
    Users,
    UsersRequest,
    UsersFailure,
    UsersFailurePayload,
    UsersSuccess,
    UsersSuccessPayload,
    // User,
    // UserFailure,
    // UserFailurePayload,
    // UserSuccess,
    // UserSuccessPayload,
    // UserRequest

} from './types';

export const users = (payload: UsersRequest): Users => ({
    type: GET_USERS,
    payload,
});

export const usersSuccess = (payload: UsersSuccessPayload): UsersSuccess => ({
    type: GET_USERS_SUCCESS,
    payload,
});

export const usersFailure = (payload: UsersFailurePayload): UsersFailure => ({
    type: GET_USERS_ERROR,
    payload,
});


// export const user = (payload: UserRequest): User => ({
//     type: GET_SINGLE_USER,
//     payload,
// });

// export const userSuccess = (payload: UserSuccessPayload): UserSuccess => ({
//     type: GET_SINGLE_USER_SUCCESS,
//     payload,
// });

// export const userFailure = (payload: UserFailurePayload): UserFailure => ({
//     type: GET_SINGLE_USER_ERROR,
//     payload,
// });