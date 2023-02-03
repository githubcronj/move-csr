import {
   GET_UTILITY_DATA,
   GET_UTILITY_DATA_SUCCESS,
   GET_UTILITY_DATA_ERROR
} from './actionTypes';
import * as types from './types';

export const getUtility = (payload: types.UtilityGetRequest): types.UtilityGet => ({
    type: GET_UTILITY_DATA,
    payload,
});

export const getUtilitySuccess = (payload: types.UtilityGetSuccessPayload): types.UtilityGetSuccess => ({
    type: GET_UTILITY_DATA_SUCCESS,
    payload,
});

export const getUtilityFailure = (payload: types.UtilityGetFailurePayload): types.UtilityGetFailure => ({
    type: GET_UTILITY_DATA_ERROR,
    payload,
});

