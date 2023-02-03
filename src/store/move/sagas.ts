import { all, call, put, takeLatest } from "redux-saga/effects";
// import { store } from 'react-notifications-component';
import {
  moversSuccess,
  moversFailure,
  cancelMoverSuccess,
  cancelMoverFailure,
  cancelEntireMoverOrderSuccess,
  cancelEntireMoverOrderFailure,
  diyFailure,
  diySuccess,
} from "./actions";
import {
  GET_MOVERS,
  CANCEL_MOVER,
  CANCEL_ENTIRE_MOVER_ORDER,
  GET_DIY,
} from "./actionTypes";
import apiJunction from "../../utils/api";
import history from "../../routes/History";
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* movers() {
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: `api/move/movers/`,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(moversSuccess({ movers: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(moversFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}
function* cancelMover(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "put",
      url: `/csr/api/v1/move-order/${action.payload.order_db_id}/`,
      body: action.payload.body,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(cancelMoverSuccess({ cancelMover: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(cancelMoverFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

function* cancelEntireMoverOrder(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/move-order/cancel_multiple_orders/`,
      body: action.payload,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        cancelEntireMoverOrderSuccess({ cancelEntireMoverOrder: response.data })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(cancelEntireMoverOrderFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

function* diy() {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: `csr/api/v1/diy-providers`,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(diySuccess({ diy: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(diyFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

export default function* moversSaga() {
  yield all([
    takeLatest(GET_MOVERS, movers),
    takeLatest(CANCEL_MOVER, cancelMover),
    takeLatest(CANCEL_ENTIRE_MOVER_ORDER, cancelEntireMoverOrder),
    takeLatest(GET_DIY, diy),
  ]);
}
