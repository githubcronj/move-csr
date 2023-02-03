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

import { AnalyticsActions, AnalyticsState } from "./types";

const initialState: AnalyticsState = {
  getAggregateSale: [],
  isGetAggregateSale: false,
  getOverallUnitSale: [],
  isGetOverallUnitSale: false,
  getDigitalUnitSale: [],
  isGetDigitalUnitSale: false,
  getDigitalUnitByProviders: [],
  isGetDigitalUnitByProviders: false,
  getAggregateSaleStats: [],
  isGetAggregateSaleStats: false,
  getOverallUnitSaleStats: [],
  isGetOverallUnitSaleStats: false,
  getDigitalUnitSaleStats: [],
  isGetDigitalUnitSaleStats: false,
  getDigitalUnitByProvidersStats: [],
  isGetDigitalUnitByProvidersStats: false,
};

export default (state = initialState, action: AnalyticsActions) => {
  switch (action.type) {
    case GET_AGGREGATE_SALE:
      return {
        ...state,
        getAggregateSale: [],
        error: null,
        isGetAggregateSale: false,
      };
    case GET_AGGREGATE_SALE_SUCCESS:
      return {
        ...state,
        getAggregateSale: action.payload.getAggregateSale,
        error: null,
        isGetAggregateSale: true,
      };
    case GET_AGGREGATE_SALE_ERROR:
      return {
        ...state,
        getAggregateSale: [],
        error: action.payload.error,
        isGetAggregateSale: false,
      };
    case GET_OVERALL_UNIT_SALE:
      return {
        ...state,
        getOverallUnitSale: [],
        error: null,
        isGetOverallUnitSale: false,
      };
    case GET_OVERALL_UNIT_SALE_SUCCESS:
      return {
        ...state,
        getOverallUnitSale: action.payload.getOverallUnitSale,
        error: null,
        isGetOverallUnitSale: true,
      };
    case GET_OVERALL_UNIT_SALE_ERROR:
      return {
        ...state,
        getOverallUnitSale: [],
        error: action.payload.error,
        isGetOverallUnitSale: false,
      };
    case GET_DIGITAL_UNIT_SALE:
      return {
        ...state,
        getDigitalUnitSale: [],
        error: null,
        isGetDigitalUnitSale: false,
      };
    case GET_DIGITAL_UNIT_SALE_SUCCESS:
      return {
        ...state,
        getDigitalUnitSale: action.payload.getDigitalUnitSale,
        error: null,
        isGetDigitalUnitSale: true,
      };
    case GET_DIGITAL_UNIT_SALE_ERROR:
      return {
        ...state,
        getDigitalUnitSale: [],
        error: action.payload.error,
        isGetDigitalUnitSale: false,
      };
    case GET_DIGITAL_UNITS_BY_PROVIDERS:
      return {
        ...state,
        getDigitalUnitByProviders: [],
        error: null,
        isGetDigitalUnitByProviders: false,
      };
    case GET_DIGITAL_UNITS_BY_PROVIDERS_SUCCESS:
      return {
        ...state,
        getDigitalUnitByProviders: action.payload.getDigitalUnitByProviders,
        error: null,
        isGetDigitalUnitByProviders: true,
      };
    case GET_DIGITAL_UNITS_BY_PROVIDERS_ERROR:
      return {
        ...state,
        getDigitalUnitByProviders: [],
        error: action.payload.error,
        isGetDigitalUnitByProviders: false,
      };
    case GET_AGGREGATE_SALE_STATS:
      return {
        ...state,
        getAggregateSaleStats: [],
        error: null,
        isGetAggregateSaleStats: false,
      };
    case GET_AGGREGATE_SALE_STATS_SUCCESS:
      return {
        ...state,
        getAggregateSaleStats: action.payload.getAggregateSaleStats,
        error: null,
        isGetAggregateSaleStats: true,
      };
    case GET_AGGREGATE_SALE_STATS_ERROR:
      return {
        ...state,
        getAggregateSaleStats: [],
        error: action.payload.error,
        isGetAggregateSaleStats: false,
      };
    case GET_OVERALL_UNIT_SALE_STATS:
      return {
        ...state,
        getOverallUnitSaleStats: [],
        error: null,
        isGetOverallUnitSaleStats: false,
      };
    case GET_OVERALL_UNIT_SALE_STATS_SUCCESS:
      return {
        ...state,
        getOverallUnitSaleStats: action.payload.getOverallUnitSaleStats,
        error: null,
        isGetOverallUnitSaleStats: true,
      };
    case GET_OVERALL_UNIT_SALE_STATS_ERROR:
      return {
        ...state,
        getOverallUnitSaleStats: [],
        error: action.payload.error,
        isGetOverallUnitSaleStats: false,
      };
    case GET_DIGITAL_UNIT_SALE_STATS:
      return {
        ...state,
        getDigitalUnitSaleStats: [],
        error: null,
        isGetDigitalUnitSaleStats: false,
      };
    case GET_DIGITAL_UNIT_SALE_STATS_SUCCESS:
      return {
        ...state,
        getDigitalUnitSaleStats: action.payload.getDigitalUnitSaleStats,
        error: null,
        isGetDigitalUnitSaleStats: true,
      };
    case GET_DIGITAL_UNIT_SALE_STATS_ERROR:
      return {
        ...state,
        getDigitalUnitSaleStats: [],
        error: action.payload.error,
        isGetDigitalUnitSaleStats: false,
      };
    case GET_DIGITAL_UNITS_BY_PROVIDERS_STATS:
      return {
        ...state,
        getDigitalUnitByProvidersStats: [],
        error: null,
        isGetDigitalUnitByProvidersStats: false,
      };
    case GET_DIGITAL_UNITS_BY_PROVIDERS_STATS_SUCCESS:
      return {
        ...state,
        getDigitalUnitByProvidersStats:
          action.payload.getDigitalUnitByProvidersStats,
        error: null,
        isGetDigitalUnitByProvidersStats: true,
      };
    case GET_DIGITAL_UNITS_BY_PROVIDERS_STATS_ERROR:
      return {
        ...state,
        getDigitalUnitByProvidersStats: [],
        error: action.payload.error,
        isGetDigitalUnitByProvidersStats: false,
      };
    default:
      return {
        ...state,
      };
  }
};
