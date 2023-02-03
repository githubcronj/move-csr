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

import { InsuranceActions, InsuranceState } from "./types";

const initialState: InsuranceState = {
  quote: [],
  isQuote: false,
  errorQuote: null,
  quoteList: [],
  isQuoteList: false,
  errorQuoteList: null,
  updatePersonal: [],
  isUpdatePersonal: false,
  errorUpdatePersonal: null,
  updateProperty: [],
  isUpdateProperty: false,
  errorUpdateProperty: null,
  appointment: [],
  isAppointment: false,
  errorAppointment: null,
  appointmentGet: [],
  isAppointmentGet: false,
  errorAppointmentGet: null,
  getBrokerageInsurance: [],
  isGetBrokerageInsurance: false,
  errorGetBrokerageInsurance: null,
};

export default (state = initialState, action: InsuranceActions) => {
  switch (action.type) {
    case INSURANCE_QUOTE:
      return {
        ...state,
        quote: [],
        isQuote: false,
        errprQuote: null,
      };
    case INSURANCE_QUOTE_SUCCESS:
      return {
        ...state,
        quote: action.payload.quote,
        isQuote: true,
        errprQuote: null,
      };
    case INSURANCE_QUOTE_ERROR:
      return {
        ...state,
        quote: [],
        isQuote: false,
        errorQuote: action.payload.errorQuote,
      };

    case INSURANCE_QUOTE_LIST:
      return {
        ...state,
        quoteList: [],
        isQuoteList: false,
        errorQuoteList: null,
      };
    case INSURANCE_QUOTE_LIST_SUCCESS:
      return {
        ...state,
        quoteList: action.payload.quoteList,
        isQuoteList: true,
        errorQuoteList: null,
      };
    case INSURANCE_QUOTE_LIST_ERROR:
      return {
        ...state,
        quoteList: [],
        isQuoteList: false,
        errorQuoteList: action.payload.errorQuoteList,
      };

    case INSURANCE_APPOINTMENTS:
      return {
        ...state,
        appointment: [],
        isAppointment: false,
        errorAppointment: null,
      };
    case INSURANCE_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointment: action.payload.appointment,
        isAppointment: true,
        errorAppointment: null,
      };
    case INSURANCE_APPOINTMENTS_ERROR:
      return {
        ...state,
        appointment: [],
        isAppointment: false,
        errorAppointment: action.payload.errorAppointment,
      };

    case INSURANCE_APPOINTMENTS_GET:
      return {
        ...state,
        appointment: [],
        isAppointmentGet: false,
        errorAppointment: null,
      };
    case INSURANCE_APPOINTMENTS_GET_SUCCESS:
      return {
        ...state,
        appointment: action.payload.appointmentGet,
        isAppointmentGet: true,
        errorAppointment: null,
      };
    case INSURANCE_APPOINTMENTS_GET_ERROR:
      return {
        ...state,
        appointment: [],
        isAppointmentGet: false,
        errorAppointment: action.payload.errorAppointmentGet,
      };

    case UPDATE_MOVE_PERSONAL_INFO:
      return {
        ...state,
        updatePersonal: [],
        isUpdatePersonal: false,
        errorUpdatePersonal: null,
      };
    case UPDATE_MOVE_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        updatePersonal: action.payload.updatePersonal,
        isUpdatePersonal: true,
        errorUpdatePersonal: null,
      };
    case UPDATE_MOVE_PERSONAL_INFO_ERROR:
      return {
        ...state,
        updatePersonal: [],
        isUpdatePersonal: false,
        errorUpdatePersonal: action.payload.errorUpdatePersonal,
      };

    case UPDATE_MOVE_PROPERTY_INFO:
      return {
        ...state,
        updateProperty: [],
        isUpdateProperty: false,
        errorUpdateProperty: null,
      };
    case UPDATE_MOVE_PROPERTY_INFO_SUCCESS:
      return {
        ...state,
        updateProperty: action.payload.updateProperty,
        isUpdateProperty: true,
        errorUpdateProperty: null,
      };
    case UPDATE_MOVE_PROPERTY_INFO_ERROR:
      return {
        ...state,
        updateProperty: [],
        isUpdateProperty: false,
        errorUpdateProperty: action.payload.errorUpdateProperty,
      };

    case GET_BROKERAGE_INSURANCE:
      return {
        ...state,
        getBrokerageInsurance: [],
        isGetBrokerageInsurance: false,
        errorGetBrokerageInsurance: null,
      };
    case GET_BROKERAGE_INSURANCE_SUCCESS:
      return {
        ...state,
        getBrokerageInsurance: action.payload.getBrokerageInsurance,
        isGetBrokerageInsurance: true,
        errorGetBrokerageInsurance: null,
      };
    case GET_BROKERAGE_INSURANCE_ERROR:
      return {
        ...state,
        getBrokerageInsurance: [],
        isGetBrokerageInsurance: false,
        errorGetBrokerageInsurance: action.payload.errorGetBrokerageInsurance,
      };
    default:
      return {
        ...state,
      };
  }
};
