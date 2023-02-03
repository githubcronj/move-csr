import {
  ENERGY_LAUNCH,
  ENERGY_LAUNCH_FAILURE,
  ENERGY_LAUNCH_SUCCESS,
} from "./actionTypes";
import {
  EnergyLaunchRequest,
  EnergyLaunchSuccess,
  EnergyLaunchSuccessPayload,
  EnergyLaunchFailure,
  EnergyLaunchFailurePayload,
} from "./types";

export const energyLaunch = (): EnergyLaunchRequest => ({
  type: ENERGY_LAUNCH,
});

export const energyLaunchSuccess = (
  payload: EnergyLaunchSuccessPayload
): EnergyLaunchSuccess => ({
  type: ENERGY_LAUNCH_SUCCESS,
  payload,
});

export const energyLaunchFailure = (
  payload: EnergyLaunchFailurePayload
): EnergyLaunchFailure => ({
  type: ENERGY_LAUNCH_FAILURE,
  payload,
});
