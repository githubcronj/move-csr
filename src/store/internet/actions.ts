import {
  EXTERNAL_DIGITAL_PLANS,
  EXTERNAL_DIGITAL_PLANS_ERROR,
  EXTERNAL_DIGITAL_PLANS_SUCCESS,
  SELECT_DIGITAL_PLANS,
  SELECT_DIGITAL_PLANS_ERROR,
  SELECT_DIGITAL_PLANS_SUCCESS,
  SELECT_DIGITAL_PLANS_GET,
  SELECT_DIGITAL_PLANS_GET_ERROR,
  SELECT_DIGITAL_PLANS_GET_SUCCESS,
  GET_STEPS,
  GET_STEPS_SUCCESS,
  GET_STEPS_ERROR,
  CHANGE_STEPS,
  CHANGE_STEPS_ERROR,
  CHANGE_STEPS_SUCCESS,
  LANDING_DIGITAL_PLANS,
  LANDING_DIGITAL_PLANS_SUCCESS,
  LANDING_DIGITAL_PLANS_ERROR,
  GET_PROVIDER,
  GET_PROVIDER_SUCCESS,
  GET_PROVIDER_ERROR,
} from "./actionTypes";
import * as types from "./types";

export const internetPlan = (
  payload: types.InternetPlanRequest
): types.InternetPlan => ({
  type: EXTERNAL_DIGITAL_PLANS,
  payload,
});

export const internetPlanSuccess = (
  payload: types.InternetPlanSuccessPayload
): types.InternetPlanSuccess => ({
  type: EXTERNAL_DIGITAL_PLANS_SUCCESS,
  payload,
});

export const internetPlanFailure = (
  payload: types.InternetPlanFailurePayload
): types.InternetPlanFailure => ({
  type: EXTERNAL_DIGITAL_PLANS_ERROR,
  payload,
});

export const selectDigitalPlan = (
  payload: types.SelectDigitalPlansRequest
): types.SelectDigitalPlans => ({
  type: SELECT_DIGITAL_PLANS,
  payload,
});

export const selectDigitalPlanSuccess = (
  payload: types.SelectDigitalPlansSuccessPayload
): types.SelectDigitalPlansSuccess => ({
  type: SELECT_DIGITAL_PLANS_SUCCESS,
  payload,
});

export const selectDigitalPlanFailure = (
  payload: types.SelectDigitalPlansFailurePayload
): types.SelectDigitalPlansFailure => ({
  type: SELECT_DIGITAL_PLANS_ERROR,
  payload,
});

export const selectDigitalPlanGet = (): types.SelectDigitalPlansGet => ({
  type: SELECT_DIGITAL_PLANS_GET,
});

export const selectDigitalPlanGetSuccess = (
  payload: types.SelectDigitalPlansGetSuccessPayload
): types.SelectDigitalPlansGetSuccess => ({
  type: SELECT_DIGITAL_PLANS_GET_SUCCESS,
  payload,
});

export const selectDigitalPlanGetFailure = (
  payload: types.SelectDigitalPlansGetFailurePayload
): types.SelectDigitalPlansGetFailure => ({
  type: SELECT_DIGITAL_PLANS_GET_ERROR,
  payload,
});

export const getSteps = (): types.getSteps => ({
  type: GET_STEPS,
});

export const getStepsSuccess = (
  payload: types.getStepsSuccessPayload
): types.getStepsSuccess => ({
  type: GET_STEPS_SUCCESS,
  payload,
});

export const getStepsFailure = (
  payload: types.getStepsFailurePayload
): types.getStepsFailure => ({
  type: GET_STEPS_ERROR,
  payload,
});

export const changeSteps = (payload: types.changeStepsRequest) => ({
  type: CHANGE_STEPS,
  payload,
});

export const changeStepsSuccess = (
  payload: types.changeStepsSuccessPayload
): types.changeStepsSuccess => ({
  type: CHANGE_STEPS_SUCCESS,
  payload,
});

export const changeStepsFailure = (
  payload: types.changeStepsFailurePayload
): types.changeStepsFailure => ({
  type: CHANGE_STEPS_ERROR,
  payload,
});

//Landing Internet Plan

export const landingInternetPlan = (
  payload: types.LandingInternetPlanRequest
): types.LandingInternetPlan => ({
  type: LANDING_DIGITAL_PLANS,
  payload,
});

export const landingInternetPlanSuccess = (
  payload: types.LandingInternetPlanSuccessPayload
): types.LandingInternetPlanSuccess => ({
  type: LANDING_DIGITAL_PLANS_SUCCESS,
  payload,
});

export const landingInternetPlanFailure = (
  payload: types.LandingInternetPlanFailurePayload
): types.LandingInternetPlanFailure => ({
  type: LANDING_DIGITAL_PLANS_ERROR,
  payload,
});

export const getProvider = (
  payload: types.getProviderRequest
): types.getProvider => ({
  type: GET_PROVIDER,
  payload,
});

export const getProviderSuccess = (
  payload: types.getProviderSuccessPayload
): types.getProviderSuccess => ({
  type: GET_PROVIDER_SUCCESS,
  payload,
});

export const getProviderFailure = (
  payload: types.getProviderFailurePayload
): types.getProviderFailure => ({
  type: GET_PROVIDER_ERROR,
  payload,
});
