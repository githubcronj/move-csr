import {
  GET_UTILITY_DATA,
  GET_UTILITY_DATA_SUCCESS,
  GET_UTILITY_DATA_ERROR
} from './actionTypes';

import { UtilityGetActions, UtilityGetState } from './types';

const initialState: UtilityGetState = {
    utility: [],
    error: null,
};

export default (state = initialState, action: UtilityGetActions) => {
    switch (action.type) {
        case GET_UTILITY_DATA:
            return {
                ...state,
                utility: [],
                error: null,
            };
        case GET_UTILITY_DATA_SUCCESS:
            return {
                ...state,
                utility: action.payload.utility,
                error: null,
            };
        case GET_UTILITY_DATA_ERROR:
            return {
                ...state,
                utility: [],
                error: action.payload.error,
            };

       
        default:
            return {
                ...state,
            };
    }
};
