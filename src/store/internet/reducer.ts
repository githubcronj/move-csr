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
  CHANGE_STEPS_SUCCESS,
  CHANGE_STEPS_ERROR,
  LANDING_DIGITAL_PLANS,
  LANDING_DIGITAL_PLANS_ERROR,
  LANDING_DIGITAL_PLANS_SUCCESS,
  GET_PROVIDER,
  GET_PROVIDER_ERROR,
  GET_PROVIDER_SUCCESS,
} from "./actionTypes";

import { InternetPlanActions, InternetPlanState } from "./types";

const initialState: InternetPlanState = {
  internet: [],
  error: null,
  selectDigitalPlan: [],
  errorDigitalPlan: null,
  steps: [],
  errorSteps: null,
  isStepsSuccess: false,
  isInternetDataArrived: false,
  stepsDataArrived: false,
  providerData: [],
  isProviderDataArrived: false,
  errorProvider: null,
};

export default (state = initialState, action: InternetPlanActions) => {
  switch (action.type) {
    case EXTERNAL_DIGITAL_PLANS:
      return {
        ...state,
        internet: [],
        isInternetDataArrived: false,
        error: null,
      };
    case EXTERNAL_DIGITAL_PLANS_SUCCESS:
      return {
        ...state,
        internet: action.payload.internet,
        isInternetDataArrived: true,
        error: null,
      };
    case EXTERNAL_DIGITAL_PLANS_ERROR:
      return {
        ...state,
        internet: [],
        isInternetDataArrived: false,
        error: action.payload.error,
      };

    case SELECT_DIGITAL_PLANS:
      return {
        ...state,
        selectDigitalPlan: [],
        error: null,
      };
    case SELECT_DIGITAL_PLANS_SUCCESS:
      return {
        ...state,
        selectDigitalPlan: action.payload.selectDigitalPlan,
        error: null,
      };
    case SELECT_DIGITAL_PLANS_ERROR:
      return {
        ...state,
        selectDigitalPlan: [],
        error: action.payload.errorDigitalPlan,
      };

    case SELECT_DIGITAL_PLANS_GET:
      return {
        ...state,
        selectDigitalPlan: [],
        error: null,
      };
    case SELECT_DIGITAL_PLANS_GET_SUCCESS:
      return {
        ...state,
        selectDigitalPlan: action.payload.selectDigitalPlan,
        error: null,
      };
    case SELECT_DIGITAL_PLANS_GET_ERROR:
      return {
        ...state,
        selectDigitalPlan: [],
        error: action.payload.errorDigitalPlan,
      };
    case GET_STEPS:
      return {
        ...state,
        steps: [],
        error: null,
        stepsDataArrived: false,
      };
    case GET_STEPS_SUCCESS:
      return {
        ...state,
        steps: action.payload,
        error: null,
        stepsDataArrived: true,
      };
    case GET_STEPS_ERROR:
      return {
        ...state,
        steps: [],
        error: action.payload.errorSteps,
        stepsDataArrived: false,
      };
    case CHANGE_STEPS:
      return {
        ...state,
        steps: [],
        isStepsSuccess: false,
        error: null,
      };
    case CHANGE_STEPS_SUCCESS:
      return {
        ...state,
        steps: action.payload,
        isStepsSuccess: true,
        error: null,
      };
    case CHANGE_STEPS_ERROR:
      return {
        ...state,
        steps: [],
        isStepsSuccess: false,
        error: action.payload.errorSteps,
      };

    case LANDING_DIGITAL_PLANS:
      return {
        ...state,
        internet: [],
        isInternetDataArrived: false,
        error: null,
      };
    case LANDING_DIGITAL_PLANS_SUCCESS:
      return {
        ...state,
        internet: action.payload.internet,
        isInternetDataArrived: true,
        error: null,
      };
    case LANDING_DIGITAL_PLANS_ERROR:
      return {
        ...state,
        internet: [],
        isInternetDataArrived: false,
        error: action.payload.error,
      };
    case GET_PROVIDER:
      return {
        ...state,
        providerData: [],
        isProviderDataArrived: false,
        errorProvider: null,
      };
    case GET_PROVIDER_SUCCESS:
      return {
        ...state,
        providerData: action.payload.providerData,
        isProviderDataArrived: true,
        errorProvider: null,
      };
    case GET_PROVIDER_ERROR:
      return {
        ...state,
        providerData: [],
        isProviderDataArrived: false,
        errorProvider: action.payload.errorProvider,
      };
    default:
      return {
        ...state,
      };
  }
};
