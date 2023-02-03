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

export interface IOurVendor {
  ourVendor: any;
  postOrderhomePros: any;
  cancelOrderhomePros: any;
}

export interface OurVendorState {
  ourVendor: IOurVendor[];
  isGetOurVendor: boolean;
  postOrderhomePros: IOurVendor[];
  isPostOrderhomePros: boolean;
  cancelOrderhomePros: IOurVendor[];
  isCancelOrderhomePros: boolean;
}

export interface GetOurVendorsRequest {
  ourVendor: IOurVendor[];
}

export interface GetOurVendorsSuccessPayload {
  ourVendor: IOurVendor[];
}

export interface GetOurVendorsFailurePayload {
  error: string;
}

export type GetOurVendors = {
  type: typeof GET_OURVENDOR;
  payload: GetOurVendorsRequest;
};

export type GetOurVendorsSuccess = {
  type: typeof GET_OURVENDOR_SUCCESS;
  payload: GetOurVendorsSuccessPayload;
};

export type GetOurVendorsFailure = {
  type: typeof GET_OURVENDOR_ERROR;
  payload: GetOurVendorsFailurePayload;
};
export interface PostOrderHomeProsRequest {
  postOrderHomePros: IOurVendor[];
}

export interface PostOrderHomeProsSuccessPayload {
  postOrderHomePros: IOurVendor[];
}

export interface PostOrderHomeProsFailurePayload {
  error: string;
}

export type PostOrderHomePros = {
  type: typeof POST_ORDER;
  payload: PostOrderHomeProsRequest;
};

export type PostOrderHomeProsSuccess = {
  type: typeof POST_ORDER_SUCCESS;
  payload: PostOrderHomeProsSuccessPayload;
};

export type PostOrderHomeProsFailure = {
  type: typeof POST_ORDER_ERROR;
  payload: PostOrderHomeProsFailurePayload;
};
export interface CancelOrderHomeProsRequest {
  cancelOrderhomePros: IOurVendor[];
}

export interface CancelOrderHomeProsSuccessPayload {
  cancelOrderhomePros: IOurVendor[];
}

export interface CancelOrderHomeProsFailurePayload {
  error: string;
}

export type CancelOrderHomePros = {
  type: typeof CANCEL_HOMEPROS_ORDER;
  payload: CancelOrderHomeProsRequest;
};

export type CancelOrderHomeProsSuccess = {
  type: typeof CANCEL_HOMEPROS_ORDER_SUCCESS;
  payload: CancelOrderHomeProsSuccessPayload;
};

export type CancelOrderHomeProsFailure = {
  type: typeof CANCEL_HOMEPROS_ORDER_ERROR;
  payload: CancelOrderHomeProsFailurePayload;
};

export type OurVendorActions =
  | GetOurVendors
  | GetOurVendorsSuccess
  | GetOurVendorsFailure
  | PostOrderHomePros
  | PostOrderHomeProsSuccess
  | PostOrderHomeProsFailure
  | CancelOrderHomePros
  | CancelOrderHomeProsSuccess
  | CancelOrderHomeProsFailure;
