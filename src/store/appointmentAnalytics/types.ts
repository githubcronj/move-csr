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

export interface IAppointmentAnalytics {
  getEmailAnalytics: any;
  getTextAnalytics: any;
  getAppointmentAnalytics: any;
  getOverallAnalytics: any;
}

export interface AppointmentAnalyticsState {
  getEmailAnalytics: IAppointmentAnalytics[];
  isGetEmailAnalytics: boolean;
  getTextAnalytics: IAppointmentAnalytics[];
  isGetTextAnalytics: boolean;
  getAppointmentAnalytics: IAppointmentAnalytics[];
  isGetAppointmentAnalytics: boolean;
  getOverallAnalytics: IAppointmentAnalytics[];
  isGetOverallAnalytics: boolean;
}

export interface GetEmailAnalyticsRequest {
  getEmailAnalytics: IAppointmentAnalytics[];
}

export interface GetEmailAnalyticsSuccessPayload {
  getEmailAnalytics: IAppointmentAnalytics[];
}

export interface GetEmailAnalyticsFailurePayload {
  error: string;
}

export type GetEmailAnalytics = {
  type: typeof GET_EMAIL_ANALYTICS;
  payload: GetEmailAnalyticsRequest;
};

export type GetEmailAnalyticsSuccess = {
  type: typeof GET_EMAIL_ANALYTICS_SUCCESS;
  payload: GetEmailAnalyticsSuccessPayload;
};

export type GetEmailAnalyticsFailure = {
  type: typeof GET_EMAIL_ANALYTICS_ERROR;
  payload: GetEmailAnalyticsFailurePayload;
};

export interface GetTextAnalyticsRequest {
  getTextAnalytics: IAppointmentAnalytics[];
}

export interface GetTextAnalyticsSuccessPayload {
  getTextAnalytics: IAppointmentAnalytics[];
}

export interface GetTextAnalyticsFailurePayload {
  error: string;
}

export type GetTextAnalyticsSuccess = {
  type: typeof GET_TEXT_ANALYTICS_SUCCESS;
  payload: GetTextAnalyticsSuccessPayload;
};

export type GetTextAnalyticsFailure = {
  type: typeof GET_TEXT_ANALYTICS_ERROR;
  payload: GetTextAnalyticsFailurePayload;
};

export type GetTextAnalytics = {
  type: typeof GET_TEXT_ANALYTICS;
  payload: GetTextAnalyticsRequest;
};

export interface GetAppointmentAnalyticsRequest {
  getAppointmentAnalytics: IAppointmentAnalytics[];
}

export interface GetAppointmentAnalyticsSuccessPayload {
  getAppointmentAnalytics: IAppointmentAnalytics[];
}

export interface GetAppointmentAnalyticsFailurePayload {
  error: string;
}

export type GetAppointmentAnalytics = {
  type: typeof GET_APPOINTMENT_ANALYTICS;
  payload: GetAppointmentAnalyticsRequest;
};

export type GetAppointmentAnalyticsSuccess = {
  type: typeof GET_APPOINTMENT_ANALYTICS_SUCCESS;
  payload: GetAppointmentAnalyticsSuccessPayload;
};

export type GetAppointmentAnalyticsFailure = {
  type: typeof GET_APPOINTMENT_ANALYTICS_ERROR;
  payload: GetAppointmentAnalyticsFailurePayload;
};

export interface GetOverallAnalyticsRequest {
  getOverallAnalytics: IAppointmentAnalytics[];
}

export interface GetOverallAnalyticsSuccessPayload {
  getOverallAnalytics: IAppointmentAnalytics[];
}

export interface GetOverallAnalyticsFailurePayload {
  error: string;
}

export type GetOverallAnalytics = {
  type: typeof GET_OVERALL_ANALYTICS;
  payload: GetOverallAnalyticsRequest;
};

export type GetOverallAnalyticsSuccess = {
  type: typeof GET_OVERALL_ANALYTICS_SUCCESS;
  payload: GetOverallAnalyticsSuccessPayload;
};

export type GetOverallAnalyticsFailure = {
  type: typeof GET_OVERALL_ANALYTICS_ERROR;
  payload: GetOverallAnalyticsFailurePayload;
};

export type AppointmentAnalyticsActions =
  | GetEmailAnalytics
  | GetEmailAnalyticsSuccess
  | GetEmailAnalyticsFailure
  | GetTextAnalytics
  | GetTextAnalyticsSuccess
  | GetTextAnalyticsFailure
  | GetAppointmentAnalytics
  | GetAppointmentAnalyticsSuccess
  | GetAppointmentAnalyticsFailure
  | GetOverallAnalytics
  | GetOverallAnalyticsSuccess
  | GetOverallAnalyticsFailure;
