import {
  ENERGY_LAUNCH,
  ENERGY_LAUNCH_FAILURE,
  ENERGY_LAUNCH_SUCCESS,
} from "./actionTypes";

import { EnergyActions, EnergyState } from "./types";

const initialState: EnergyState = {
  pending: false,
  energyLaunch: [],
  isEnergyLaunch: false,
  error: null,
};

export default (state = initialState, action: EnergyActions) => {
  switch (action.type) {
    case ENERGY_LAUNCH:
      return {
        ...state,
        pending: true,
        isEnergyLaunch: false,
      };
    case ENERGY_LAUNCH_SUCCESS:
      return {
        ...state,
        pending: false,
        energyLaunch: action.payload.energyLaunch,
        isEnergyLaunch: true,
        error: null,
      };
    case ENERGY_LAUNCH_FAILURE:
      return {
        ...state,
        pending: false,
        energyLaunch: [],
        isEnergyLaunch: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
