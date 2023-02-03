import {
  GET_EMAIL_ANALYTICS,
  GET_EMAIL_ANALYTICS_ERROR,
  GET_EMAIL_ANALYTICS_SUCCESS,
  GET_TEXT_ANALYTICS,
  GET_TEXT_ANALYTICS_ERROR,
  GET_TEXT_ANALYTICS_SUCCESS,
  GET_APPOINTMENT_ANALYTICS,
  GET_APPOINTMENT_ANALYTICS_ERROR,
  GET_APPOINTMENT_ANALYTICS_SUCCESS,
  GET_OVERALL_ANALYTICS,
  GET_OVERALL_ANALYTICS_ERROR,
  GET_OVERALL_ANALYTICS_SUCCESS,
} from "./actionTypes";

import {
  AppointmentAnalyticsActions,
  AppointmentAnalyticsState,
} from "./types";

const initialState: AppointmentAnalyticsState = {
  getEmailAnalytics: [],
  isGetEmailAnalytics: false,
  getTextAnalytics: [],
  isGetTextAnalytics: false,
  getAppointmentAnalytics: [],
  isGetAppointmentAnalytics: false,
  getOverallAnalytics: [],
  isGetOverallAnalytics: false,
};

export default (state = initialState, action: AppointmentAnalyticsActions) => {
  switch (action.type) {
    case GET_EMAIL_ANALYTICS:
      return {
        ...state,
        getEmailAnalytics: [],
        error: null,
        isGetEmailAnalytics: false,
      };
    case GET_EMAIL_ANALYTICS_SUCCESS:
      return {
        ...state,
        getEmailAnalytics: action.payload.getEmailAnalytics,
        error: null,
        isGetEmailAnalytics: true,
      };
    case GET_EMAIL_ANALYTICS_ERROR:
      return {
        ...state,
        getEmailAnalytics: [],
        error: action.payload.error,
        isGetEmailAnalytics: false,
      };
    case GET_TEXT_ANALYTICS:
      return {
        ...state,
        getTextAnalytics: [],
        error: null,
        isGetTextAnalytics: false,
      };
    case GET_TEXT_ANALYTICS_SUCCESS:
      return {
        ...state,
        getTextAnalytics: action.payload.getTextAnalytics,
        error: null,
        isGetTextAnalytics: true,
      };
    case GET_TEXT_ANALYTICS_ERROR:
      return {
        ...state,
        getTextAnalytics: [],
        error: action.payload.error,
        isGetTextAnalytics: false,
      };
    case GET_APPOINTMENT_ANALYTICS:
      return {
        ...state,
        getAppointmentAnalytics: [],
        error: null,
        isGetAppointmentAnalytics: false,
      };
    case GET_APPOINTMENT_ANALYTICS_SUCCESS:
      return {
        ...state,
        getAppointmentAnalytics: action.payload.getAppointmentAnalytics,
        error: null,
        isGetAppointmentAnalytics: true,
      };
    case GET_APPOINTMENT_ANALYTICS_ERROR:
      return {
        ...state,
        getAppointmentAnalytics: [],
        error: action.payload.error,
        isGetAppointmentAnalytics: false,
      };
    case GET_OVERALL_ANALYTICS:
      return {
        ...state,
        getOverallAnalytics: [],
        error: null,
        isGetOverallAnalytics: false,
      };
    case GET_OVERALL_ANALYTICS_SUCCESS:
      return {
        ...state,
        getOverallAnalytics: action.payload.getOverallAnalytics,
        error: null,
        isGetOverallAnalytics: true,
      };
    case GET_OVERALL_ANALYTICS_ERROR:
      return {
        ...state,
        getOverallAnalytics: [],
        error: action.payload.error,
        isGetOverallAnalytics: false,
      };
    default:
      return {
        ...state,
      };
  }
};
