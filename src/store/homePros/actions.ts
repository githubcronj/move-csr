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
import {
  GetOurVendors,
  GetOurVendorsRequest,
  GetOurVendorsFailure,
  GetOurVendorsFailurePayload,
  GetOurVendorsSuccess,
  GetOurVendorsSuccessPayload,
  PostOrderHomePros,
  PostOrderHomeProsRequest,
  PostOrderHomeProsFailure,
  PostOrderHomeProsFailurePayload,
  PostOrderHomeProsSuccess,
  PostOrderHomeProsSuccessPayload,
  CancelOrderHomePros,
  CancelOrderHomeProsRequest,
  CancelOrderHomeProsFailure,
  CancelOrderHomeProsFailurePayload,
  CancelOrderHomeProsSuccess,
  CancelOrderHomeProsSuccessPayload,
} from "./types";

export const getOurVendors = (
  payload: GetOurVendorsRequest
): GetOurVendors => ({
  type: GET_OURVENDOR,
  payload,
});

export const getOurVendorsSuccess = (
  payload: GetOurVendorsSuccessPayload
): GetOurVendorsSuccess => ({
  type: GET_OURVENDOR_SUCCESS,
  payload,
});

export const getOurVendorsFailure = (
  payload: GetOurVendorsFailurePayload
): GetOurVendorsFailure => ({
  type: GET_OURVENDOR_ERROR,
  payload,
});

export const postOrderHomePros = (
  payload: PostOrderHomeProsRequest
): PostOrderHomePros => ({
  type: POST_ORDER,
  payload,
});

export const postOrderHomeProsSuccess = (
  payload: PostOrderHomeProsSuccessPayload
): PostOrderHomeProsSuccess => ({
  type: POST_ORDER_SUCCESS,
  payload,
});

export const postOrderHomeProsFailure = (
  payload: PostOrderHomeProsFailurePayload
): PostOrderHomeProsFailure => ({
  type: POST_ORDER_ERROR,
  payload,
});

export const cancelOrderHomePros = (
  payload: CancelOrderHomeProsRequest
): CancelOrderHomePros => ({
  type: CANCEL_HOMEPROS_ORDER,
  payload,
});

export const cancelOrderHomeProsSuccess = (
  payload: CancelOrderHomeProsSuccessPayload
): CancelOrderHomeProsSuccess => ({
  type: CANCEL_HOMEPROS_ORDER_SUCCESS,
  payload,
});

export const cancelOrderHomeProsFailure = (
  payload: CancelOrderHomeProsFailurePayload
): CancelOrderHomeProsFailure => ({
  type: CANCEL_HOMEPROS_ORDER_ERROR,
  payload,
});
