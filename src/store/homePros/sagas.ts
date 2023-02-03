import { all, call, put, takeLatest } from "redux-saga/effects";
// import { store } from 'react-notifications-component';
import {
  getOurVendorsSuccess,
  getOurVendorsFailure,
  postOrderHomeProsSuccess,
  postOrderHomeProsFailure,
  cancelOrderHomeProsSuccess,
  cancelOrderHomeProsFailure,
} from "./actions";
import {
  CANCEL_HOMEPROS_ORDER,
  GET_OURVENDOR,
  POST_ORDER,
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

function* getOurVendors() {
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
      url: `api/realtors/vendor-list/`,
      token: token,
    });
    // console.log(response);
    if (response && response.data) {
      yield put(getOurVendorsSuccess({ ourVendor: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getOurVendorsFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

function* postOrderHomePros(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/move-order/request_home_pros/`,
      token: token,
      body: action.payload,
    });
    console.log(response);
    if (response && response.data) {
      yield put(postOrderHomeProsSuccess({ postOrderHomePros: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(postOrderHomeProsFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

function* cancelOrderHomePros(action: any) {
  console.log(action);
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "delete",
      url: `/csr/api/v1/move-order/cancel_home_pros/`,
      token: token,
      body: action.payload,
    });
    // console.log(response);
    if (response && response.data) {
      yield put(
        cancelOrderHomeProsSuccess({ cancelOrderhomePros: response.data })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(cancelOrderHomeProsFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

export default function* getOurVendorsSaga() {
  yield all([takeLatest(GET_OURVENDOR, getOurVendors)]);
  yield all([takeLatest(POST_ORDER, postOrderHomePros)]);
  yield all([takeLatest(CANCEL_HOMEPROS_ORDER, cancelOrderHomePros)]);
}
