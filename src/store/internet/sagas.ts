import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  internetPlanFailure,
  internetPlanSuccess,
  selectDigitalPlanFailure,
  selectDigitalPlanSuccess,
  selectDigitalPlanGetFailure,
  selectDigitalPlanGetSuccess,
  getStepsSuccess,
  getStepsFailure,
  changeStepsSuccess,
  changeStepsFailure,
  landingInternetPlanFailure,
  landingInternetPlanSuccess,
  getProviderFailure,
  getProviderSuccess,
} from "./actions";
import {
  EXTERNAL_DIGITAL_PLANS,
  SELECT_DIGITAL_PLANS,
  SELECT_DIGITAL_PLANS_GET,
  GET_STEPS,
  CHANGE_STEPS,
  LANDING_DIGITAL_PLANS,
  GET_PROVIDER,
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

function* internetPlan(action: any) {
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
      url: `/api/services/external-digital-plans/?city=${action.payload.city}&state=${action.payload.state}&zip_code=${action.payload.zip_code}`,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        internetPlanSuccess({
          internet: { ...response.data, status: response.status },
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(internetPlanFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

function* selectDigitalPlan(action: any) {
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
      url: `/api/services/move-selected-digital-plans/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(
        selectDigitalPlanSuccess({
          selectDigitalPlan: { ...response.data, status: response.status },
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(
      selectDigitalPlanFailure({ errorDigitalPlan: (e as Error).message })
    );
    // history.push('/server-error');
  }
}

function* selectDigitalPlanGet() {
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
      url: `/api/services/move-selected-digital-plans/`,
      token: token,
    });
    if (response.data) {
      yield put(
        selectDigitalPlanGetSuccess({ selectDigitalPlan: response.data })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(
      selectDigitalPlanGetFailure({ errorDigitalPlan: (e as Error).message })
    );
    // history.push('/server-error');
  }
}

function* getSteps() {
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
      url: `/api/services/storing-filters/`,
      token: token,
    });
    if (response.data) {
      yield put(getStepsSuccess(response.data));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getStepsFailure({ errorSteps: (e as Error).message }));
    // history.push('/server-error');
  }
}

function* changeSteps(action: any) {
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
      url: `/api/services/storing-filters/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(changeStepsSuccess(response.data));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(changeStepsFailure({ errorSteps: (e as Error).message }));
    // history.push('/server-error');
  }
}

function* internetLandingPlan() {
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
      url: `api/services/external-landing-digital-plans/?city=Columbus&zip_code=43221&state=oh`,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        landingInternetPlanSuccess({
          internet: { ...response.data, status: response.status },
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(landingInternetPlanFailure({ error: (e as Error).message }));
    // history.push('/server-error');
  }
}

function* getProvider(action: any) {
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
      url: `/csr/api/v1/digital-provider-coverage/?zip_code=${action.payload.zip_code}`,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getProviderSuccess({
          providerData: response.data,
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(getProviderFailure({ errorProvider: e.response.data.error }));
    // history.push('/server-error');
  }
}

export default function* internetSaga() {
  yield all([
    takeLatest(EXTERNAL_DIGITAL_PLANS, internetPlan),
    takeLatest(SELECT_DIGITAL_PLANS, selectDigitalPlan),
    takeLatest(SELECT_DIGITAL_PLANS_GET, selectDigitalPlanGet),
    takeLatest(GET_STEPS, getSteps),
    takeLatest(CHANGE_STEPS, changeSteps),
    takeLatest(LANDING_DIGITAL_PLANS, internetLandingPlan),
    takeLatest(GET_PROVIDER, getProvider),
  ]);
}
