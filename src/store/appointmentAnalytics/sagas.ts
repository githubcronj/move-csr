import { all, call, put, takeLatest } from "redux-saga/effects";
// import { store } from 'react-notifications-component';
import {
  getEmailAnalyticsSuccess,
  getEmailAnalyticsFailure,
  getTextAnalyticsSuccess,
  getTextAnalyticsFailure,
  getAppointmentAnalyticsSuccess,
  getAppointmentAnalyticsFailure,
  getOverallAnalyticsSuccess,
  getOverallAnalyticsFailure,
} from "./actions";
import {
  GET_EMAIL_ANALYTICS,
  GET_TEXT_ANALYTICS,
  GET_APPOINTMENT_ANALYTICS,
  GET_OVERALL_ANALYTICS,
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

function* getEmailAnalytics(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log("hii");
    let url: string = `/api/analytics/email/`;
    // console.log("url", url);
    if (action.payload.startDate && action.payload.endDate) {
      url = `/api/analytics/email/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    if (action.payload.brokerage) {
      url = `/api/analytics/email/?brokerage_id=${action.payload.brokerage}`;
    }
    if (
      action.payload.startDate &&
      action.payload.endDate &&
      action.payload.brokerage
    ) {
      url = `/api/analytics/email/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}&brokerage_id=${action.payload.brokerage}`;
    }

    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(getEmailAnalyticsSuccess({ getEmailAnalytics: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getEmailAnalyticsFailure({ error: (e as Error).message }));
  }
}
function* getTextAnalytics(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/api/analytics/text/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/api/analytics/text/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    if (action.payload.brokerage) {
      url = `/api/analytics/text/?brokerage_id=${action.payload.brokerage}`;
    }
    if (
      action.payload.startDate &&
      action.payload.endDate &&
      action.payload.brokerage
    ) {
      url = `/api/analytics/text/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}&brokerage_id=${action.payload.brokerage}`;
    }

    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(getTextAnalyticsSuccess({ getTextAnalytics: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getTextAnalyticsFailure({ error: (e as Error).message }));
  }
}
function* getAppointmentAnalytics(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/api/analytics/appointments/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/api/analytics/appointments/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    if (action.payload.brokerage) {
      url = `/api/analytics/appointments/?brokerage_id=${action.payload.brokerage}`;
    }
    if (
      action.payload.startDate &&
      action.payload.endDate &&
      action.payload.brokerage
    ) {
      url = `/api/analytics/appointments/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}&brokerage_id=${action.payload.brokerage}`;
    }

    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getAppointmentAnalyticsSuccess({
          getAppointmentAnalytics: response.data,
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getAppointmentAnalyticsFailure({ error: (e as Error).message }));
  }
}

function* getOverallAnalytics(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/api/analytics/overall/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/api/analytics/overall/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    if (action.payload.brokerage) {
      url = `/api/analytics/overall/?brokerage_id=${action.payload.brokerage}`;
    }
    if (
      action.payload.startDate &&
      action.payload.endDate &&
      action.payload.brokerage
    ) {
      url = `/api/analytics/overall/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}&brokerage_id=${action.payload.brokerage}`;
    }

    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getOverallAnalyticsSuccess({
          getOverallAnalytics: response.data,
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getOverallAnalyticsFailure({ error: (e as Error).message }));
  }
}

export default function* getAppointmentAnalyticsSaga() {
  yield all([takeLatest(GET_EMAIL_ANALYTICS, getEmailAnalytics)]);
  yield all([takeLatest(GET_TEXT_ANALYTICS, getTextAnalytics)]);
  yield all([takeLatest(GET_APPOINTMENT_ANALYTICS, getAppointmentAnalytics)]);
  yield all([takeLatest(GET_OVERALL_ANALYTICS, getOverallAnalytics)]);
}
