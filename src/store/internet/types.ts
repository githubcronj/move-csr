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
  LANDING_DIGITAL_PLANS_ERROR,
  LANDING_DIGITAL_PLANS_SUCCESS,
  GET_PROVIDER,
  GET_PROVIDER_SUCCESS,
  GET_PROVIDER_ERROR,
} from "./actionTypes";

export interface IInternetPlan {
  internet: any;
  selectDigitalPlan: any;
  steps: any;
  landingInternetPlan: any;
  providerData: any;
}

export interface InternetPlanState {
  internet: IInternetPlan[];
  error: string | null;
  selectDigitalPlan: IInternetPlan[];
  errorDigitalPlan: string | null;
  steps: IInternetPlan[];
  errorSteps: string | null;
  isStepsSuccess: boolean;
  isInternetDataArrived: boolean;
  stepsDataArrived: boolean;
  providerData: IInternetPlan[];
  isProviderDataArrived: boolean;
  errorProvider: string | null;
}

// plans request
export interface InternetPlanRequest {
  city: string;
  state: string;
  zip_code: string | number;
}

export interface InternetPlanSuccessPayload {
  internet: IInternetPlan[];
}

export interface InternetPlanFailurePayload {
  error: string;
}

export type InternetPlan = {
  type: typeof EXTERNAL_DIGITAL_PLANS;
  payload: InternetPlanRequest;
};

export type InternetPlanSuccess = {
  type: typeof EXTERNAL_DIGITAL_PLANS_SUCCESS;
  payload: InternetPlanSuccessPayload;
};

export type InternetPlanFailure = {
  type: typeof EXTERNAL_DIGITAL_PLANS_ERROR;
  payload: InternetPlanFailurePayload;
};

//landing plans request
export interface LandingInternetPlanRequest {
  internet: IInternetPlan[];
}

export interface LandingInternetPlanSuccessPayload {
  internet: IInternetPlan[];
}

export interface LandingInternetPlanFailurePayload {
  error: string;
}

export type LandingInternetPlan = {
  type: typeof LANDING_DIGITAL_PLANS;
  payload: LandingInternetPlanRequest;
};

export type LandingInternetPlanSuccess = {
  type: typeof LANDING_DIGITAL_PLANS_SUCCESS;
  payload: LandingInternetPlanSuccessPayload;
};

export type LandingInternetPlanFailure = {
  type: typeof LANDING_DIGITAL_PLANS_ERROR;
  payload: LandingInternetPlanFailurePayload;
};

// select digital plans request
export interface SelectDigitalPlansRequest {
  provider_name: string;
  plan_name: string;
  price: string | number;
  plan_details: any;
}

export interface SelectDigitalPlansSuccessPayload {
  selectDigitalPlan: IInternetPlan[];
}

export interface SelectDigitalPlansFailurePayload {
  errorDigitalPlan: string;
}

export type SelectDigitalPlans = {
  type: typeof SELECT_DIGITAL_PLANS;
  payload: SelectDigitalPlansRequest;
};

export type SelectDigitalPlansSuccess = {
  type: typeof SELECT_DIGITAL_PLANS_SUCCESS;
  payload: SelectDigitalPlansSuccessPayload;
};

export type SelectDigitalPlansFailure = {
  type: typeof SELECT_DIGITAL_PLANS_ERROR;
  payload: SelectDigitalPlansFailurePayload;
};

// select digital plans get request

export interface SelectDigitalPlansGetSuccessPayload {
  selectDigitalPlan: IInternetPlan[];
}

export interface SelectDigitalPlansGetFailurePayload {
  errorDigitalPlan: string;
}

export type SelectDigitalPlansGet = {
  type: typeof SELECT_DIGITAL_PLANS_GET;
};

export type SelectDigitalPlansGetSuccess = {
  type: typeof SELECT_DIGITAL_PLANS_GET_SUCCESS;
  payload: SelectDigitalPlansGetSuccessPayload;
};

export type SelectDigitalPlansGetFailure = {
  type: typeof SELECT_DIGITAL_PLANS_GET_ERROR;
  payload: SelectDigitalPlansGetFailurePayload;
};

// STEPS GET

export interface getStepsSuccessPayload {
  steps: IInternetPlan[];
}

export interface getStepsFailurePayload {
  errorSteps: string;
}

export type getSteps = {
  type: typeof GET_STEPS;
};

export type getStepsSuccess = {
  type: typeof GET_STEPS_SUCCESS;
  payload: getStepsSuccessPayload;
};

export type getStepsFailure = {
  type: typeof GET_STEPS_ERROR;
  payload: getStepsFailurePayload;
};

// STEPS CHANGE

export interface changeStepsSuccessPayload {
  steps: IInternetPlan[];
}

export interface changeStepsFailurePayload {
  errorSteps: string;
}

export interface changeStepsRequest {
  page_name: any;
  filterValues: any;
}

export type changeSteps = {
  type: typeof CHANGE_STEPS;
};

export type changeStepsSuccess = {
  type: typeof CHANGE_STEPS_SUCCESS;
  payload: changeStepsSuccessPayload;
};

export type changeStepsFailure = {
  type: typeof CHANGE_STEPS_ERROR;
  payload: changeStepsFailurePayload;
};

export interface getProviderSuccessPayload {
  providerData: IInternetPlan[];
}

export interface getProviderFailurePayload {
  errorProvider: string;
}

export interface getProviderRequest {
  providerData: IInternetPlan[];
}

export type getProvider = {
  type: typeof GET_PROVIDER;
  payload: getProviderRequest;
};

export type getProviderSuccess = {
  type: typeof GET_PROVIDER_SUCCESS;
  payload: getProviderSuccessPayload;
};

export type getProviderFailure = {
  type: typeof GET_PROVIDER_ERROR;
  payload: getProviderFailurePayload;
};

export type InternetPlanActions =
  | InternetPlan
  | InternetPlanSuccess
  | InternetPlanFailure
  | SelectDigitalPlans
  | SelectDigitalPlansSuccess
  | SelectDigitalPlansFailure
  | SelectDigitalPlansGet
  | SelectDigitalPlansGetSuccess
  | SelectDigitalPlansGetFailure
  | getSteps
  | getStepsFailure
  | getStepsSuccess
  | changeSteps
  | changeStepsFailure
  | changeStepsSuccess
  | LandingInternetPlan
  | LandingInternetPlanSuccess
  | LandingInternetPlanFailure
  | getProvider
  | getProviderFailure
  | getProviderSuccess;
