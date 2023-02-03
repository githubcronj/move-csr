import {
  GET_OURVENDOR,
  GET_OURVENDOR_ERROR,
  GET_OURVENDOR_SUCCESS,
  POST_ORDER,
  POST_ORDER_ERROR,
  POST_ORDER_SUCCESS,
  CANCEL_HOMEPROS_ORDER,
  CANCEL_HOMEPROS_ORDER_ERROR,
  CANCEL_HOMEPROS_ORDER_SUCCESS,
} from "./actionTypes";

import { OurVendorActions, OurVendorState } from "./types";

const initialState: OurVendorState = {
  ourVendor: [],
  isGetOurVendor: false,
  postOrderhomePros: [],
  isPostOrderhomePros: false,
  cancelOrderhomePros: [],
  isCancelOrderhomePros: false,
};

export default (state = initialState, action: OurVendorActions) => {
  switch (action.type) {
    case GET_OURVENDOR:
      return {
        ...state,
        ourVendor: [],
        isGetOurVendor: false,
        error: null,
      };
    case GET_OURVENDOR_SUCCESS:
      return {
        ...state,
        ourVendor: action.payload.ourVendor,
        isGetOurVendor: true,
        error: null,
      };
    case GET_OURVENDOR_ERROR:
      return {
        ...state,
        ourVendor: [],
        isGetOurVendor: false,
        error: action.payload.error,
      };
    case POST_ORDER:
      return {
        ...state,
        postOrderHomePros: [],
        isPostOrderHomePros: false,
        error: null,
      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        postOrderHomePros: action.payload.postOrderHomePros,
        isPostOrderHomePros: true,
        error: null,
      };
    case POST_ORDER_ERROR:
      return {
        ...state,
        postOrderHomePros: [],
        isPostOrderHomePros: false,
        error: action.payload.error,
      };
    case CANCEL_HOMEPROS_ORDER:
      return {
        ...state,
        cancelOrderHomePros: [],
        isCancelOrderHomePros: false,
        error: null,
      };
    case CANCEL_HOMEPROS_ORDER_SUCCESS:
      return {
        ...state,
        cancelOrderHomePros: action.payload.cancelOrderhomePros,
        isCancelOrderHomePros: true,
        error: null,
      };
    case CANCEL_HOMEPROS_ORDER_ERROR:
      return {
        ...state,
        cancelOrderHomePros: [],
        isCancelOrderHomePros: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
