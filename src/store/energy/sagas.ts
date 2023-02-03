// import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { energyLaunchFailure, energyLaunchSuccess } from "./actions";
import { ENERGY_LAUNCH } from "./actionTypes";
// import { ITodo } from "./types";
import apiJunction from "../../utils/api";

// const getenergy = () => axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/energy");

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* energyLaunch() {
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
      url: `/csr/api/v1/nrg`,
      token: token,
    });
    yield put(
      energyLaunchSuccess({
        energyLaunch: response.data,
      })
    );
  } catch (e) {
    yield put(
      energyLaunchFailure({
        error: (e as Error).message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* energySaga() {
  yield all([takeLatest(ENERGY_LAUNCH, energyLaunch)]);
}

export default energySaga;
