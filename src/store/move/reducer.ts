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
  GET_DIY_SUCCESS,
  GET_DIY_ERROR
} from "./actionTypes";

import { MoversActions, MoversState } from "./types";

const initialState: MoversState = {
  movers: [],
  cancelMover: [],
  isCancelMover: false,
  cancelEntireMoverOrder: [],
  isCancelEntireMoverOrder: false,
  diy:[],
  diyDataArrived:false
};

export default (state = initialState, action: MoversActions) => {
  switch (action.type) {
    case GET_MOVERS:
      return {
        ...state,
        movers: [],
        error: null,
      };
    case GET_MOVERS_SUCCESS:
      return {
        ...state,
        movers: action.payload.movers,
        error: null,
      };
    case GET_MOVERS_ERROR:
      return {
        ...state,
        movers: [],
        error: action.payload.error,
      };

    case CANCEL_MOVER:
      return {
        ...state,
        cancelMover: [],
        error: null,
        isCancelMover: false,
      };
    case CANCEL_MOVER_SUCCESS:
      return {
        ...state,
        cancelMover: action.payload.cancelMover,
        isCancelMover: true,
        error: null,
      };
    case CANCEL_MOVER_ERROR:
      return {
        ...state,
        cancelMover: [],
        isCancelMover: false,
        error: action.payload.error,
      };

    case CANCEL_ENTIRE_MOVER_ORDER:
      return {
        ...state,
        cancelEntireMoverOrder: [],
        error: null,
        isCancelEntireMoverOrder: false,
      };
    case CANCEL_ENTIRE_MOVER_ORDER_SUCCESS:
      return {
        ...state,
        cancelEntireMoverOrder: action.payload.cancelEntireMoverOrder,
        isCancelEntireMoverOrder: true,
        error: null,
      };
    case CANCEL_ENTIRE_MOVER_ORDER_ERROR:
      return {
        ...state,
        cancelEntireMoverOrder: [],
        isCancelEntireMoverOrder: false,
        error: action.payload.error,
      };

      case GET_DIY:
        return {
          ...state,
          diy: [],
          error: null,
          diyDataArrived:false
        };
      case GET_DIY_SUCCESS:
        return {
          ...state,
          diy: action.payload.diy,
          error: null,
          diyDataArrived:true
        };
      case GET_DIY_ERROR:
        return {
          ...state,
          diy: [],
          error: action.payload.error,
          diyDataArrived:false
        };

    default:
      return {
        ...state,
      };
  }
};
