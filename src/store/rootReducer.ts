import { combineReducers } from "redux";
import todoReducer from "./todo/reducer";
import commonReducer from "./common/reducer";
import moversReducer from "./move/reducer";
import internetReducer from "./internet/reducer";
import insuranceReducer from "./insurance/reducer";
import dashboardReducer from "./dashboard/reducer";
import utilityReducer from "./utility/reducer";
import loginReducer from "./login/reducer";
import energyReducer from "./energy/reducer";
import homeProsReducer from "./homePros/reducer";
import analyticsReducer from "./analytics/reducer";
import appointmentanalyticsReducer from "./appointmentAnalytics/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  todo: todoReducer,
  common: commonReducer,
  move: moversReducer,
  internet: internetReducer,
  insurance: insuranceReducer,
  dashboard: dashboardReducer,
  utility: utilityReducer,
  energy: energyReducer,
  homePros: homeProsReducer,
  analytics: analyticsReducer,
  appointmentanalytics: appointmentanalyticsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
