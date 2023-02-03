import {
  UPDATE_MOVE_PERSONAL_INFO,
  UPDATE_MOVE_PERSONAL_INFO_ERROR,
  UPDATE_MOVE_PERSONAL_INFO_SUCCESS,
  UPDATE_MOVE_PROPERTY_INFO,
  UPDATE_MOVE_PROPERTY_INFO_ERROR,
  UPDATE_MOVE_PROPERTY_INFO_SUCCESS,
  INSURANCE_APPOINTMENTS,
  INSURANCE_APPOINTMENTS_ERROR,
  INSURANCE_APPOINTMENTS_SUCCESS,
  INSURANCE_APPOINTMENTS_GET,
  INSURANCE_APPOINTMENTS_GET_ERROR,
  INSURANCE_APPOINTMENTS_GET_SUCCESS,
  INSURANCE_QUOTE,
  INSURANCE_QUOTE_ERROR,
  INSURANCE_QUOTE_SUCCESS,
  INSURANCE_QUOTE_LIST,
  INSURANCE_QUOTE_LIST_ERROR,
  INSURANCE_QUOTE_LIST_SUCCESS,
  GET_BROKERAGE_INSURANCE,
  GET_BROKERAGE_INSURANCE_ERROR,
  GET_BROKERAGE_INSURANCE_SUCCESS,
} from "./actionTypes";
import * as types from "./types";

export const insuranceQuote = (): types.InsuranceQuote => ({
  type: INSURANCE_QUOTE,
});
export const insuranceQuoteSuccess = (
  payload: types.InsuranceQuoteSuccessPayload
): types.InsuranceQuoteSuccess => ({
  type: INSURANCE_QUOTE_SUCCESS,
  payload,
});
export const insuranceQuoteFailure = (
  payload: types.InsuranceQuoteFailurePayload
): types.InsuranceQuoteFailure => ({
  type: INSURANCE_QUOTE_ERROR,
  payload,
});

export const insuranceQuoteList = (): types.InsuarnceQuoteList => ({
  type: INSURANCE_QUOTE_LIST,
});
export const insuranceQuoteListSuccess = (
  payload: types.InsuarnceQuoteListSuccessPayload
): types.InsuarnceQuoteListSuccess => ({
  type: INSURANCE_QUOTE_LIST_SUCCESS,
  payload,
});
export const insuranceQuoteListFailure = (
  payload: types.InsuarnceQuoteListFailurePayload
): types.InsuarnceQuoteListFailure => ({
  type: INSURANCE_QUOTE_LIST_ERROR,
  payload,
});

export const insuranceAppointment = (
  payload: types.InsuaranceAppointmentRequest
): types.InsuaranceAppointment => ({
  type: INSURANCE_APPOINTMENTS,
  payload,
});
export const insuranceAppointmentSuccess = (
  payload: types.InsuaranceAppointmentSuccessPayload
): types.InsuaranceAppointmentSuccess => ({
  type: INSURANCE_APPOINTMENTS_SUCCESS,
  payload,
});
export const insuranceAppointmentFailure = (
  payload: types.InsuaranceAppointmentFailurePayload
): types.InsuaranceAppointmentFailure => ({
  type: INSURANCE_APPOINTMENTS_ERROR,
  payload,
});

export const insuranceAppointmentGet = (): types.InsuaranceAppointmentGet => ({
  type: INSURANCE_APPOINTMENTS_GET,
});
export const insuranceAppointmentGetSuccess = (
  payload: types.InsuaranceAppointmentGetSuccessPayload
): types.InsuaranceAppointmentGetSuccess => ({
  type: INSURANCE_APPOINTMENTS_GET_SUCCESS,
  payload,
});
export const insuranceAppointmentGetFailure = (
  payload: types.InsuaranceAppointmentGetFailurePayload
): types.InsuaranceAppointmentGetFailure => ({
  type: INSURANCE_APPOINTMENTS_GET_ERROR,
  payload,
});

export const updatePersonal = (
  payload: types.UpdatePersonalRequest
): types.UpdatePersonal => ({
  type: UPDATE_MOVE_PERSONAL_INFO,
  payload,
});
export const updatePersonalSuccess = (
  payload: types.UpdatePersonalSuccessPayload
): types.UpdatePersonalSuccess => ({
  type: UPDATE_MOVE_PERSONAL_INFO_SUCCESS,
  payload,
});
export const updatePersonalFailure = (
  payload: types.UpdatePersonalFailurePayload
): types.UpdatePersonalFailure => ({
  type: UPDATE_MOVE_PERSONAL_INFO_ERROR,
  payload,
});

export const updateProperty = (
  payload: types.UpdatePropertyRequest
): types.UpdateProperty => ({
  type: UPDATE_MOVE_PROPERTY_INFO,
  payload,
});
export const updatePropertySuccess = (
  payload: types.UpdatePropertySuccessPayload
): types.UpdatePropertySuccess => ({
  type: UPDATE_MOVE_PROPERTY_INFO_SUCCESS,
  payload,
});
export const updatePropertyFailure = (
  payload: types.UpdatePropertyFailurePayload
): types.UpdatePropertyFailure => ({
  type: UPDATE_MOVE_PROPERTY_INFO_ERROR,
  payload,
});

export const getBrokerageInsurance = (
  payload: types.GetBrokerageInsuranceRequest
): types.GetBrokerageInsurance => ({
  type: GET_BROKERAGE_INSURANCE,
  payload,
});
export const getBrokerageInsuranceSuccess = (
  payload: types.GetBrokerageInsuranceSuccessPayload
): types.GetBrokerageInsuranceSuccess => ({
  type: GET_BROKERAGE_INSURANCE_SUCCESS,
  payload,
});
export const getBrokerageInsuranceFailure = (
  payload: types.GetBrokerageInsuranceFailurePayload
): types.GetBrokerageInsuranceFailure => ({
  type: GET_BROKERAGE_INSURANCE_ERROR,
  payload,
});
