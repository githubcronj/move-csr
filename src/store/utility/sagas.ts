import { all, call, put, takeLatest } from "redux-saga/effects";
import { getUtilitySuccess, getUtilityFailure } from "./actions";
import { GET_UTILITY_DATA } from "./actionTypes";
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

function* getUtility(action: any) {
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
      url: `/api/concierge/utilities/?source_zip=${action.payload.source_zip}&dst_zip=${action.payload.dest_zip}`,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(getUtilitySuccess({ utility: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getUtilityFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

export default function* internetSaga() {
  yield all([takeLatest(GET_UTILITY_DATA, getUtility)]);
}
