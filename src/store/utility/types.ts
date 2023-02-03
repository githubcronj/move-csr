import {
    GET_UTILITY_DATA,
    GET_UTILITY_DATA_ERROR,
    GET_UTILITY_DATA_SUCCESS,
} from './actionTypes';

export interface IUtilityGet {
    utility: any;
}

export interface UtilityGetState {
    utility: IUtilityGet[];
    error: string | null;
}

// plans request
export interface UtilityGetRequest {
    source_zip:number | string;
    dest_zip:number | string;
}

export interface UtilityGetSuccessPayload {
    utility: IUtilityGet[];
}

export interface UtilityGetFailurePayload {
    error: string;
}

export type UtilityGet = {
    type: typeof GET_UTILITY_DATA;
    payload: UtilityGetRequest;
};

export type UtilityGetSuccess = {
    type: typeof GET_UTILITY_DATA_SUCCESS;
    payload: UtilityGetSuccessPayload;
};

export type UtilityGetFailure = {
    type: typeof GET_UTILITY_DATA_ERROR;
    payload: UtilityGetFailurePayload;
};


export type UtilityGetActions =
    | UtilityGet
    | UtilityGetSuccess
    | UtilityGetFailure;
