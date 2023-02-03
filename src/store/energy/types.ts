import {
  ENERGY_LAUNCH,
  ENERGY_LAUNCH_FAILURE,
  ENERGY_LAUNCH_SUCCESS,
} from "./actionTypes";

export interface IEnergy {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface EnergyState {
  pending: boolean;
  energyLaunch: IEnergy[];
  error: string | null;
  isEnergyLaunch: boolean;
}

export interface EnergyLaunchSuccessPayload {
  energyLaunch: IEnergy[];
}

export interface EnergyLaunchFailurePayload {
  error: string;
}

export interface EnergyLaunchRequest {
  type: typeof ENERGY_LAUNCH;
}

export type EnergyLaunchSuccess = {
  type: typeof ENERGY_LAUNCH_SUCCESS;
  payload: EnergyLaunchSuccessPayload;
};

export type EnergyLaunchFailure = {
  type: typeof ENERGY_LAUNCH_FAILURE;
  payload: EnergyLaunchFailurePayload;
};

export type EnergyActions =
  | EnergyLaunchRequest
  | EnergyLaunchSuccess
  | EnergyLaunchFailure;
