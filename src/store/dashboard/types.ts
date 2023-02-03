import {
    GET_USERS,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS,
    // GET_SINGLE_USER,
    // GET_SINGLE_USER_ERROR,
    // GET_SINGLE_USER_SUCCESS

} from './actionTypes';

export interface IUsers {
    users: any;
    // user:any

}

export interface UsersState {
    users: IUsers[];
    // user:IUsers[]
    userDataArrived:boolean

}

export interface UsersRequest {
    users: IUsers[];
}

export interface UsersSuccessPayload {
    users: IUsers[];
}

export interface UsersFailurePayload {
    error: string;
}

export type Users = {
    type: typeof GET_USERS;
    payload: UsersRequest;
};

export type UsersSuccess = {
    type: typeof GET_USERS_SUCCESS;
    payload: UsersSuccessPayload;
};

export type UsersFailure = {
    type: typeof GET_USERS_ERROR;
    payload: UsersFailurePayload;
};


//Single user

// export interface UserRequest {
//     user: IUsers[];
// }

// export interface UserSuccessPayload {
//     user: IUsers[];
// }

// export interface UserFailurePayload {
//     error: string;
// }

// export type User = {
//     type: typeof GET_SINGLE_USER;
//     payload: UserRequest;
// };

// export type UserSuccess = {
//     type: typeof GET_SINGLE_USER_SUCCESS;
//     payload: UserSuccessPayload;
// };

// export type UserFailure = {
//     type: typeof GET_SINGLE_USER_ERROR;
//     payload: UserFailurePayload;
// };




export type UsersActions =
    | Users
    | UsersSuccess
    | UsersFailure
    // | User
    // | UserSuccess
    // | UserFailure

