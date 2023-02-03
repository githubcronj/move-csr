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
  GetEmailAnalytics,
  GetEmailAnalyticsRequest,
  GetEmailAnalyticsFailure,
  GetEmailAnalyticsFailurePayload,
  GetEmailAnalyticsSuccess,
  GetEmailAnalyticsSuccessPayload,
  GetTextAnalytics,
  GetTextAnalyticsRequest,
  GetTextAnalyticsFailure,
  GetTextAnalyticsFailurePayload,
  GetTextAnalyticsSuccess,
  GetTextAnalyticsSuccessPayload,
  GetAppointmentAnalytics,
  GetAppointmentAnalyticsRequest,
  GetAppointmentAnalyticsFailure,
  GetAppointmentAnalyticsFailurePayload,
  GetAppointmentAnalyticsSuccess,
  GetAppointmentAnalyticsSuccessPayload,
  GetOverallAnalytics,
  GetOverallAnalyticsRequest,
  GetOverallAnalyticsFailure,
  GetOverallAnalyticsFailurePayload,
  GetOverallAnalyticsSuccess,
  GetOverallAnalyticsSuccessPayload,
} from "./types";

export const getEmailAnalytics = (
  payload: GetEmailAnalyticsRequest
): GetEmailAnalytics => ({
  type: GET_EMAIL_ANALYTICS,
  payload,
});

export const getEmailAnalyticsSuccess = (
  payload: GetEmailAnalyticsSuccessPayload
): GetEmailAnalyticsSuccess => ({
  type: GET_EMAIL_ANALYTICS_SUCCESS,
  payload,
});

export const getEmailAnalyticsFailure = (
  payload: GetEmailAnalyticsFailurePayload
): GetEmailAnalyticsFailure => ({
  type: GET_EMAIL_ANALYTICS_ERROR,
  payload,
});

export const getTextAnalytics = (
  payload: GetTextAnalyticsRequest
): GetTextAnalytics => ({
  type: GET_TEXT_ANALYTICS,
  payload,
});

export const getTextAnalyticsSuccess = (
  payload: GetTextAnalyticsSuccessPayload
): GetTextAnalyticsSuccess => ({
  type: GET_TEXT_ANALYTICS_SUCCESS,
  payload,
});

export const getTextAnalyticsFailure = (
  payload: GetTextAnalyticsFailurePayload
): GetTextAnalyticsFailure => ({
  type: GET_TEXT_ANALYTICS_ERROR,
  payload,
});

export const getAppointmentAnalytics = (
  payload: GetAppointmentAnalyticsRequest
): GetAppointmentAnalytics => ({
  type: GET_APPOINTMENT_ANALYTICS,
  payload,
});

export const getAppointmentAnalyticsSuccess = (
  payload: GetAppointmentAnalyticsSuccessPayload
): GetAppointmentAnalyticsSuccess => ({
  type: GET_APPOINTMENT_ANALYTICS_SUCCESS,
  payload,
});

export const getAppointmentAnalyticsFailure = (
  payload: GetAppointmentAnalyticsFailurePayload
): GetAppointmentAnalyticsFailure => ({
  type: GET_APPOINTMENT_ANALYTICS_ERROR,
  payload,
});

export const getOverallAnalytics = (
  payload: GetOverallAnalyticsRequest
): GetOverallAnalytics => ({
  type: GET_OVERALL_ANALYTICS,
  payload,
});

export const getOverallAnalyticsSuccess = (
  payload: GetOverallAnalyticsSuccessPayload
): GetOverallAnalyticsSuccess => ({
  type: GET_OVERALL_ANALYTICS_SUCCESS,
  payload,
});

export const getOverallAnalyticsFailure = (
  payload: GetOverallAnalyticsFailurePayload
): GetOverallAnalyticsFailure => ({
  type: GET_OVERALL_ANALYTICS_ERROR,
  payload,
});
