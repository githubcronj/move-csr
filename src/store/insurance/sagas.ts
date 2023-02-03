import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  insuranceAppointmentFailure,
  insuranceAppointmentSuccess,
  insuranceQuoteFailure,
  insuranceQuoteSuccess,
  insuranceQuoteListFailure,
  insuranceQuoteListSuccess,
  updatePersonalFailure,
  updatePersonalSuccess,
  updatePropertyFailure,
  updatePropertySuccess,
  insuranceAppointmentGetFailure,
  insuranceAppointmentGetSuccess,
  getBrokerageInsuranceFailure,
  getBrokerageInsuranceSuccess,
} from "./actions";
import {
  UPDATE_MOVE_PERSONAL_INFO,
  UPDATE_MOVE_PROPERTY_INFO,
  INSURANCE_APPOINTMENTS,
  INSURANCE_QUOTE,
  INSURANCE_QUOTE_LIST,
  INSURANCE_APPOINTMENTS_GET,
  GET_BROKERAGE_INSURANCE,
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

function* insuranceQuote() {
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
      url: `/api/services/insurance-quote/`,
      token: token,
    });
    if (response.data) {
      yield put(insuranceQuoteSuccess({ quote: response.data }));
    } else {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(insuranceQuoteFailure({ errorQuote: e.message }));
  }
}

function* insuranceQuoteList() {
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
      url: `/api/move/insurance-quote-list/`,
      token: token,
    });
    if (response.data) {
      yield put(insuranceQuoteListSuccess({ quoteList: response.data }));
    } else {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(insuranceQuoteListFailure({ errorQuoteList: e.message }));
  }
}

function* insuranceAppointment(action: any) {
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
      url: `/api/services/insurance-appointments/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(
        insuranceAppointmentSuccess({
          appointment: { ...response.data, status: response.status },
        })
      );
    } else {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(insuranceAppointmentFailure({ errorAppointment: e.message }));
  }
}

function* insuranceAppointmentGet() {
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
      url: `/api/services/insurance-appointments/`,
      token: token,
    });
    if (response.data) {
      yield put(
        insuranceAppointmentGetSuccess({ appointmentGet: response.data })
      );
    } else {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(
      insuranceAppointmentGetFailure({ errorAppointmentGet: e.message })
    );
  }
}

function* updatePersonal(action: any) {
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
      url: `/api/move/move-api/${action.payload.move_id}/update_move_insurance_personal_information/`,
      body: action.payload.payload,
      token: token,
    });
    if (response.data) {
      yield put(updatePersonalSuccess({ updatePersonal: response.data }));
    } else {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(updatePersonalFailure({ errorUpdatePersonal: e.message }));
  }
}

function* updateProperty(action: any) {
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
      url: `/api/move/move-api/${action.payload.move_id}/update_move_property_information/`,
      body: action.payload.payload,
      token: token,
    });
    if (response.data) {
      yield put(updatePropertySuccess({ updateProperty: response.data }));
    } else {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(updatePropertyFailure({ errorUpdateProperty: e.message }));
  }
}

function* getBrokerageInsurance(action: any) {
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
      url: `/csr/api/v1/brokerage-insurance/?realtor_slug=${action.payload.realtor_slug}`,
      // body: action.payload.payload,
      token: token,
    });
    if (response.data) {
      yield put(
        getBrokerageInsuranceSuccess({ getBrokerageInsurance: response.data })
      );
    } else {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(
      getBrokerageInsuranceFailure({
        errorGetBrokerageInsurance:
          e.response && e.response.data && e.response.data.message,
      })
    );
  }
}

export default function* insuranceSaga() {
  yield all([
    takeLatest(INSURANCE_APPOINTMENTS, insuranceAppointment),
    takeLatest(INSURANCE_APPOINTMENTS_GET, insuranceAppointmentGet),
    takeLatest(INSURANCE_QUOTE, insuranceQuote),
    takeLatest(INSURANCE_QUOTE_LIST, insuranceQuoteList),
    takeLatest(UPDATE_MOVE_PERSONAL_INFO, updatePersonal),
    takeLatest(UPDATE_MOVE_PROPERTY_INFO, updateProperty),
    takeLatest(GET_BROKERAGE_INSURANCE, getBrokerageInsurance),
  ]);
}
