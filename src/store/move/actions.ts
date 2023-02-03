import {
  GET_MOVERS,
  GET_MOVERS_ERROR,
  GET_MOVERS_SUCCESS,
  CANCEL_MOVER,
  CANCEL_MOVER_ERROR,
  CANCEL_MOVER_SUCCESS,
  CANCEL_ENTIRE_MOVER_ORDER,
  CANCEL_ENTIRE_MOVER_ORDER_ERROR,
  CANCEL_ENTIRE_MOVER_ORDER_SUCCESS,
  GET_DIY,
  GET_DIY_ERROR,
  GET_DIY_SUCCESS
} from "./actionTypes";
import {
  Movers,
  MoversRequest,
  MoversFailure,
  MoversFailurePayload,
  MoversSuccess,
  MoversSuccessPayload,
  CancelMover,
  CancelMoverRequest,
  CancelMoverFailure,
  CancelMoverFailurePayload,
  CancelMoverSuccess,
  CancelMoverSuccessPayload,
  CancelEntireMoverOrder,
  CancelEntireMoverOrderRequest,
  CancelEntireMoverOrderFailure,
  CancelEntireMoverOrderFailurePayload,
  CancelEntireMoverOrderSuccess,
  CancelEntireMoverOrderSuccessPayload,
  Diy,
  DiyFailure,
  DiySuccess,
  DiyFailurePayload,
  DiyRequest,
  DiySuccessPayload
} from "./types";

export const movers = (payload: MoversRequest): Movers => ({
  type: GET_MOVERS,
  payload,
});

export const moversSuccess = (
  payload: MoversSuccessPayload
): MoversSuccess => ({
  type: GET_MOVERS_SUCCESS,
  payload,
});

export const moversFailure = (
  payload: MoversFailurePayload
): MoversFailure => ({
  type: GET_MOVERS_ERROR,
  payload,
});

export const cancelMover = (payload: CancelMoverRequest): CancelMover => ({
  type: CANCEL_MOVER,
  payload,
});

export const cancelMoverSuccess = (
  payload: CancelMoverSuccessPayload
): CancelMoverSuccess => ({
  type: CANCEL_MOVER_SUCCESS,
  payload,
});

export const cancelMoverFailure = (
  payload: CancelMoverFailurePayload
): CancelMoverFailure => ({
  type: CANCEL_MOVER_ERROR,
  payload,
});

export const cancelEntireMoverOrder = (
  payload: CancelEntireMoverOrderRequest
): CancelEntireMoverOrder => ({
  type: CANCEL_ENTIRE_MOVER_ORDER,
  payload,
});

export const cancelEntireMoverOrderSuccess = (
  payload: CancelEntireMoverOrderSuccessPayload
): CancelEntireMoverOrderSuccess => ({
  type: CANCEL_ENTIRE_MOVER_ORDER_SUCCESS,
  payload,
});

export const cancelEntireMoverOrderFailure = (
  payload: CancelEntireMoverOrderFailurePayload
): CancelEntireMoverOrderFailure => ({
  type: CANCEL_ENTIRE_MOVER_ORDER_ERROR,
  payload,
});


//get diy
export const diy = (payload: DiyRequest): Diy => ({
  type: GET_DIY,
  payload,
});

export const diySuccess = (
  payload: DiySuccessPayload
): DiySuccess => ({
  type: GET_DIY_SUCCESS,
  payload,
});

export const diyFailure = (
  payload: DiyFailurePayload
): DiyFailure => ({
  type: GET_DIY_ERROR,
  payload,
});