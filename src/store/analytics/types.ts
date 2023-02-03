import {
  GET_AGGREGATE_SALE,
  GET_AGGREGATE_SALE_ERROR,
  GET_AGGREGATE_SALE_SUCCESS,
  GET_OVERALL_UNIT_SALE,
  GET_OVERALL_UNIT_SALE_ERROR,
  GET_OVERALL_UNIT_SALE_SUCCESS,
  GET_DIGITAL_UNIT_SALE,
  GET_DIGITAL_UNIT_SALE_ERROR,
  GET_DIGITAL_UNIT_SALE_SUCCESS,
  GET_DIGITAL_UNITS_BY_PROVIDERS,
  GET_DIGITAL_UNITS_BY_PROVIDERS_ERROR,
  GET_DIGITAL_UNITS_BY_PROVIDERS_SUCCESS,
  GET_AGGREGATE_SALE_STATS,
  GET_AGGREGATE_SALE_STATS_ERROR,
  GET_AGGREGATE_SALE_STATS_SUCCESS,
  GET_OVERALL_UNIT_SALE_STATS,
  GET_OVERALL_UNIT_SALE_STATS_ERROR,
  GET_OVERALL_UNIT_SALE_STATS_SUCCESS,
  GET_DIGITAL_UNIT_SALE_STATS,
  GET_DIGITAL_UNIT_SALE_STATS_ERROR,
  GET_DIGITAL_UNIT_SALE_STATS_SUCCESS,
  GET_DIGITAL_UNITS_BY_PROVIDERS_STATS,
  GET_DIGITAL_UNITS_BY_PROVIDERS_STATS_ERROR,
  GET_DIGITAL_UNITS_BY_PROVIDERS_STATS_SUCCESS,
} from "./actionTypes";

export interface IAnalytics {
  getAggregateSale: any;
  getOverallUnitSale: any;
  getDigitalUnitSale: any;
  getDigitalUnitByProviders: any;
  getAggregateSaleStats: any;
  getOverallUnitSaleStats: any;
  getDigitalUnitSaleStats: any;
  getDigitalUnitByProvidersStats: any;
}

export interface AnalyticsState {
  getAggregateSale: IAnalytics[];
  isGetAggregateSale: boolean;
  getOverallUnitSale: IAnalytics[];
  isGetOverallUnitSale: boolean;
  getDigitalUnitSale: IAnalytics[];
  isGetDigitalUnitSale: boolean;
  getDigitalUnitByProviders: IAnalytics[];
  isGetDigitalUnitByProviders: boolean;
  getAggregateSaleStats: IAnalytics[];
  isGetAggregateSaleStats: boolean;
  getOverallUnitSaleStats: IAnalytics[];
  isGetOverallUnitSaleStats: boolean;
  getDigitalUnitSaleStats: IAnalytics[];
  isGetDigitalUnitSaleStats: boolean;
  getDigitalUnitByProvidersStats: IAnalytics[];
  isGetDigitalUnitByProvidersStats: boolean;
}

export interface GetAggregateSaleRequest {
  getAggregateSale: IAnalytics[];
}

export interface GetAggregateSaleSuccessPayload {
  getAggregateSale: IAnalytics[];
}

export interface GetAggregateSaleFailurePayload {
  error: string;
}

export type GetAggregateSale = {
  type: typeof GET_AGGREGATE_SALE;
  payload: GetAggregateSaleRequest;
};

export type GetAggregateSaleSuccess = {
  type: typeof GET_AGGREGATE_SALE_SUCCESS;
  payload: GetAggregateSaleSuccessPayload;
};

export type GetAggregateSaleFailure = {
  type: typeof GET_AGGREGATE_SALE_ERROR;
  payload: GetAggregateSaleFailurePayload;
};

export interface GetOverallUnitSaleRequest {
  getOverallUnitSale: IAnalytics[];
}

export interface GetOverallUnitSaleSuccessPayload {
  getOverallUnitSale: IAnalytics[];
}

export interface GetOverallUnitSaleFailurePayload {
  error: string;
}

export type GetOverallUnitSaleSuccess = {
  type: typeof GET_OVERALL_UNIT_SALE_SUCCESS;
  payload: GetOverallUnitSaleSuccessPayload;
};

export type GetOverallUnitSaleFailure = {
  type: typeof GET_OVERALL_UNIT_SALE_ERROR;
  payload: GetOverallUnitSaleFailurePayload;
};

export type GetOverallUnitSale = {
  type: typeof GET_OVERALL_UNIT_SALE;
  payload: GetOverallUnitSaleRequest;
};

export interface GetDigitalUnitSaleRequest {
  getDigitalUnitSale: IAnalytics[];
}

export interface GetDigitalUnitSaleSuccessPayload {
  getDigitalUnitSale: IAnalytics[];
}

export interface GetDigitalUnitSaleFailurePayload {
  error: string;
}

export type GetDigitalUnitSale = {
  type: typeof GET_DIGITAL_UNIT_SALE;
  payload: GetDigitalUnitSaleRequest;
};

export type GetDigitalUnitSaleSuccess = {
  type: typeof GET_DIGITAL_UNIT_SALE_SUCCESS;
  payload: GetDigitalUnitSaleSuccessPayload;
};

export type GetDigitalUnitSaleFailure = {
  type: typeof GET_DIGITAL_UNIT_SALE_ERROR;
  payload: GetDigitalUnitSaleFailurePayload;
};

export interface GetDigitalUnitByProvidersRequest {
  getDigitalUnitByProviders: IAnalytics[];
}

export interface GetDigitalUnitByProvidersSuccessPayload {
  getDigitalUnitByProviders: IAnalytics[];
}

export interface GetDigitalUnitByProvidersFailurePayload {
  error: string;
}

export type GetDigitalUnitByProviders = {
  type: typeof GET_DIGITAL_UNITS_BY_PROVIDERS;
  payload: GetDigitalUnitByProvidersRequest;
};

export type GetDigitalUnitByProvidersSuccess = {
  type: typeof GET_DIGITAL_UNITS_BY_PROVIDERS_SUCCESS;
  payload: GetDigitalUnitByProvidersSuccessPayload;
};

export type GetDigitalUnitByProvidersFailure = {
  type: typeof GET_DIGITAL_UNITS_BY_PROVIDERS_ERROR;
  payload: GetDigitalUnitByProvidersFailurePayload;
};
export interface GetAggregateSaleStatsRequest {
  getAggregateSaleStats: IAnalytics[];
}

export interface GetAggregateSaleStatsSuccessPayload {
  getAggregateSaleStats: IAnalytics[];
}

export interface GetAggregateSaleStatsFailurePayload {
  error: string;
}

export type GetAggregateSaleStats = {
  type: typeof GET_AGGREGATE_SALE_STATS;
  payload: GetAggregateSaleStatsRequest;
};

export type GetAggregateSaleStatsSuccess = {
  type: typeof GET_AGGREGATE_SALE_STATS_SUCCESS;
  payload: GetAggregateSaleStatsSuccessPayload;
};

export type GetAggregateSaleStatsFailure = {
  type: typeof GET_AGGREGATE_SALE_STATS_ERROR;
  payload: GetAggregateSaleStatsFailurePayload;
};

export interface GetOverallUnitSaleStatsRequest {
  getOverallUnitSaleStats: IAnalytics[];
}

export interface GetOverallUnitSaleStatsSuccessPayload {
  getOverallUnitSaleStats: IAnalytics[];
}

export interface GetOverallUnitSaleStatsFailurePayload {
  error: string;
}

export type GetOverallUnitSaleStatsSuccess = {
  type: typeof GET_OVERALL_UNIT_SALE_STATS_SUCCESS;
  payload: GetOverallUnitSaleStatsSuccessPayload;
};

export type GetOverallUnitSaleStatsFailure = {
  type: typeof GET_OVERALL_UNIT_SALE_STATS_ERROR;
  payload: GetOverallUnitSaleStatsFailurePayload;
};

export type GetOverallUnitSaleStats = {
  type: typeof GET_OVERALL_UNIT_SALE_STATS;
  payload: GetOverallUnitSaleStatsRequest;
};

export interface GetDigitalUnitSaleStatsRequest {
  getDigitalUnitSaleStats: IAnalytics[];
}

export interface GetDigitalUnitSaleStatsSuccessPayload {
  getDigitalUnitSaleStats: IAnalytics[];
}

export interface GetDigitalUnitSaleStatsFailurePayload {
  error: string;
}

export type GetDigitalUnitSaleStats = {
  type: typeof GET_DIGITAL_UNIT_SALE_STATS;
  payload: GetDigitalUnitSaleStatsRequest;
};

export type GetDigitalUnitSaleStatsSuccess = {
  type: typeof GET_DIGITAL_UNIT_SALE_STATS_SUCCESS;
  payload: GetDigitalUnitSaleStatsSuccessPayload;
};

export type GetDigitalUnitSaleStatsFailure = {
  type: typeof GET_DIGITAL_UNIT_SALE_STATS_ERROR;
  payload: GetDigitalUnitSaleStatsFailurePayload;
};

export interface GetDigitalUnitByProvidersStatsRequest {
  getDigitalUnitByProvidersStats: IAnalytics[];
}

export interface GetDigitalUnitByProvidersStatsSuccessPayload {
  getDigitalUnitByProvidersStats: IAnalytics[];
}

export interface GetDigitalUnitByProvidersStatsFailurePayload {
  error: string;
}

export type GetDigitalUnitByProvidersStats = {
  type: typeof GET_DIGITAL_UNITS_BY_PROVIDERS_STATS;
  payload: GetDigitalUnitByProvidersStatsRequest;
};

export type GetDigitalUnitByProvidersStatsSuccess = {
  type: typeof GET_DIGITAL_UNITS_BY_PROVIDERS_STATS_SUCCESS;
  payload: GetDigitalUnitByProvidersStatsSuccessPayload;
};

export type GetDigitalUnitByProvidersStatsFailure = {
  type: typeof GET_DIGITAL_UNITS_BY_PROVIDERS_STATS_ERROR;
  payload: GetDigitalUnitByProvidersStatsFailurePayload;
};

export type AnalyticsActions =
  | GetAggregateSale
  | GetAggregateSaleSuccess
  | GetAggregateSaleFailure
  | GetOverallUnitSale
  | GetOverallUnitSaleSuccess
  | GetOverallUnitSaleFailure
  | GetDigitalUnitSale
  | GetDigitalUnitSaleSuccess
  | GetDigitalUnitSaleFailure
  | GetDigitalUnitByProviders
  | GetDigitalUnitByProvidersSuccess
  | GetDigitalUnitByProvidersFailure
  | GetAggregateSaleStats
  | GetAggregateSaleStatsSuccess
  | GetAggregateSaleStatsFailure
  | GetOverallUnitSaleStats
  | GetOverallUnitSaleStatsSuccess
  | GetOverallUnitSaleStatsFailure
  | GetDigitalUnitSaleStats
  | GetDigitalUnitSaleStatsSuccess
  | GetDigitalUnitSaleStatsFailure
  | GetDigitalUnitByProvidersStats
  | GetDigitalUnitByProvidersStatsSuccess
  | GetDigitalUnitByProvidersStatsFailure;
