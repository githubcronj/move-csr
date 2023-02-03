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

export interface IMovers {
  movers: any;
  cancelMover: any;
  cancelEntireMoverOrder: any;
  diy:any
}

export interface MoversState {
  movers: IMovers[];
  cancelMover: IMovers[];
  isCancelMover: boolean;
  cancelEntireMoverOrder: IMovers[];
  isCancelEntireMoverOrder: boolean;
  diy:IMovers[],
  diyDataArrived:boolean
}

export interface MoversRequest {
  movers: IMovers[];
}

export interface MoversSuccessPayload {
  movers: IMovers[];
}

export interface MoversFailurePayload {
  error: string;
}

export type Movers = {
  type: typeof GET_MOVERS;
  payload: MoversRequest;
};

export type MoversSuccess = {
  type: typeof GET_MOVERS_SUCCESS;
  payload: MoversSuccessPayload;
};

export type MoversFailure = {
  type: typeof GET_MOVERS_ERROR;
  payload: MoversFailurePayload;
};

export interface CancelMoverRequest {
  cancelMover: IMovers[];
}

export interface CancelMoverSuccessPayload {
  cancelMover: IMovers[];
}

export interface CancelMoverFailurePayload {
  error: string;
}

export type CancelMover = {
  type: typeof CANCEL_MOVER;
  payload: CancelMoverRequest;
};

export type CancelMoverSuccess = {
  type: typeof CANCEL_MOVER_SUCCESS;
  payload: CancelMoverSuccessPayload;
};

export type CancelMoverFailure = {
  type: typeof CANCEL_MOVER_ERROR;
  payload: CancelMoverFailurePayload;
};

export interface CancelEntireMoverOrderRequest {
  cancelEntireMoverOrder: IMovers[];
}

export interface CancelEntireMoverOrderSuccessPayload {
  cancelEntireMoverOrder: IMovers[];
}

export interface CancelEntireMoverOrderFailurePayload {
  error: string;
}

export type CancelEntireMoverOrder = {
  type: typeof CANCEL_ENTIRE_MOVER_ORDER;
  payload: CancelEntireMoverOrderRequest;
};

export type CancelEntireMoverOrderSuccess = {
  type: typeof CANCEL_ENTIRE_MOVER_ORDER_SUCCESS;
  payload: CancelEntireMoverOrderSuccessPayload;
};

export type CancelEntireMoverOrderFailure = {
  type: typeof CANCEL_ENTIRE_MOVER_ORDER_ERROR;
  payload: CancelEntireMoverOrderFailurePayload;
};


//get diy
export interface DiyRequest {
  diy: IMovers[];
}

export interface DiySuccessPayload {
  diy: IMovers[];
}

export interface DiyFailurePayload {
  error: string;
}

export type Diy = {
  type: typeof GET_DIY;
  payload: DiyRequest;
};

export type DiySuccess = {
  type: typeof GET_DIY_SUCCESS;
  payload: DiySuccessPayload;
};

export type DiyFailure = {
  type: typeof GET_DIY_ERROR;
  payload: DiyFailurePayload;
};

export type MoversActions =
  | Movers
  | MoversSuccess
  | MoversFailure
  | CancelMover
  | CancelMoverSuccess
  | CancelMoverFailure
  | CancelEntireMoverOrder
  | CancelEntireMoverOrderSuccess
  | CancelEntireMoverOrderFailure
  | Diy
  | DiySuccess
  | DiyFailure
