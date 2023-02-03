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
import {
  GetAggregateSale,
  GetAggregateSaleRequest,
  GetAggregateSaleFailure,
  GetAggregateSaleFailurePayload,
  GetAggregateSaleSuccess,
  GetAggregateSaleSuccessPayload,
  GetOverallUnitSale,
  GetOverallUnitSaleRequest,
  GetOverallUnitSaleFailure,
  GetOverallUnitSaleFailurePayload,
  GetOverallUnitSaleSuccess,
  GetOverallUnitSaleSuccessPayload,
  GetDigitalUnitSale,
  GetDigitalUnitSaleRequest,
  GetDigitalUnitSaleFailure,
  GetDigitalUnitSaleFailurePayload,
  GetDigitalUnitSaleSuccess,
  GetDigitalUnitSaleSuccessPayload,
  GetDigitalUnitByProviders,
  GetDigitalUnitByProvidersRequest,
  GetDigitalUnitByProvidersFailure,
  GetDigitalUnitByProvidersFailurePayload,
  GetDigitalUnitByProvidersSuccess,
  GetDigitalUnitByProvidersSuccessPayload,
  GetAggregateSaleStats,
  GetAggregateSaleStatsRequest,
  GetAggregateSaleStatsFailure,
  GetAggregateSaleStatsFailurePayload,
  GetAggregateSaleStatsSuccess,
  GetAggregateSaleStatsSuccessPayload,
  GetOverallUnitSaleStats,
  GetOverallUnitSaleStatsRequest,
  GetOverallUnitSaleStatsFailure,
  GetOverallUnitSaleStatsFailurePayload,
  GetOverallUnitSaleStatsSuccess,
  GetOverallUnitSaleStatsSuccessPayload,
  GetDigitalUnitSaleStats,
  GetDigitalUnitSaleStatsRequest,
  GetDigitalUnitSaleStatsFailure,
  GetDigitalUnitSaleStatsFailurePayload,
  GetDigitalUnitSaleStatsSuccess,
  GetDigitalUnitSaleStatsSuccessPayload,
  GetDigitalUnitByProvidersStats,
  GetDigitalUnitByProvidersStatsRequest,
  GetDigitalUnitByProvidersStatsFailure,
  GetDigitalUnitByProvidersStatsFailurePayload,
  GetDigitalUnitByProvidersStatsSuccess,
  GetDigitalUnitByProvidersStatsSuccessPayload,
} from "./types";

export const getAggregateSale = (
  payload: GetAggregateSaleRequest
): GetAggregateSale => ({
  type: GET_AGGREGATE_SALE,
  payload,
});

export const getAggregateSaleSuccess = (
  payload: GetAggregateSaleSuccessPayload
): GetAggregateSaleSuccess => ({
  type: GET_AGGREGATE_SALE_SUCCESS,
  payload,
});

export const getAggregateSaleFailure = (
  payload: GetAggregateSaleFailurePayload
): GetAggregateSaleFailure => ({
  type: GET_AGGREGATE_SALE_ERROR,
  payload,
});

export const getOverallUnitSale = (
  payload: GetOverallUnitSaleRequest
): GetOverallUnitSale => ({
  type: GET_OVERALL_UNIT_SALE,
  payload,
});

export const getOverallUnitSaleSuccess = (
  payload: GetOverallUnitSaleSuccessPayload
): GetOverallUnitSaleSuccess => ({
  type: GET_OVERALL_UNIT_SALE_SUCCESS,
  payload,
});

export const getOverallUnitSaleFailure = (
  payload: GetOverallUnitSaleFailurePayload
): GetOverallUnitSaleFailure => ({
  type: GET_OVERALL_UNIT_SALE_ERROR,
  payload,
});

export const getDigitalUnitSale = (
  payload: GetDigitalUnitSaleRequest
): GetDigitalUnitSale => ({
  type: GET_DIGITAL_UNIT_SALE,
  payload,
});

export const getDigitalUnitSaleSuccess = (
  payload: GetDigitalUnitSaleSuccessPayload
): GetDigitalUnitSaleSuccess => ({
  type: GET_DIGITAL_UNIT_SALE_SUCCESS,
  payload,
});

export const getDigitalUnitSaleFailure = (
  payload: GetDigitalUnitSaleFailurePayload
): GetDigitalUnitSaleFailure => ({
  type: GET_DIGITAL_UNIT_SALE_ERROR,
  payload,
});

export const getDigitalUnitByProviders = (
  payload: GetDigitalUnitByProvidersRequest
): GetDigitalUnitByProviders => ({
  type: GET_DIGITAL_UNITS_BY_PROVIDERS,
  payload,
});

export const getDigitalUnitByProvidersSuccess = (
  payload: GetDigitalUnitByProvidersSuccessPayload
): GetDigitalUnitByProvidersSuccess => ({
  type: GET_DIGITAL_UNITS_BY_PROVIDERS_SUCCESS,
  payload,
});

export const getDigitalUnitByProvidersFailure = (
  payload: GetDigitalUnitByProvidersFailurePayload
): GetDigitalUnitByProvidersFailure => ({
  type: GET_DIGITAL_UNITS_BY_PROVIDERS_ERROR,
  payload,
});

export const getAggregateSaleStats = (
  payload: GetAggregateSaleStatsRequest
): GetAggregateSaleStats => ({
  type: GET_AGGREGATE_SALE_STATS,
  payload,
});

export const getAggregateSaleStatsSuccess = (
  payload: GetAggregateSaleStatsSuccessPayload
): GetAggregateSaleStatsSuccess => ({
  type: GET_AGGREGATE_SALE_STATS_SUCCESS,
  payload,
});

export const getAggregateSaleStatsFailure = (
  payload: GetAggregateSaleStatsFailurePayload
): GetAggregateSaleStatsFailure => ({
  type: GET_AGGREGATE_SALE_STATS_ERROR,
  payload,
});

export const getOverallUnitSaleStats = (
  payload: GetOverallUnitSaleStatsRequest
): GetOverallUnitSaleStats => ({
  type: GET_OVERALL_UNIT_SALE_STATS,
  payload,
});

export const getOverallUnitSaleStatsSuccess = (
  payload: GetOverallUnitSaleStatsSuccessPayload
): GetOverallUnitSaleStatsSuccess => ({
  type: GET_OVERALL_UNIT_SALE_STATS_SUCCESS,
  payload,
});

export const getOverallUnitSaleStatsFailure = (
  payload: GetOverallUnitSaleStatsFailurePayload
): GetOverallUnitSaleStatsFailure => ({
  type: GET_OVERALL_UNIT_SALE_STATS_ERROR,
  payload,
});

export const getDigitalUnitSaleStats = (
  payload: GetDigitalUnitSaleStatsRequest
): GetDigitalUnitSaleStats => ({
  type: GET_DIGITAL_UNIT_SALE_STATS,
  payload,
});

export const getDigitalUnitSaleStatsSuccess = (
  payload: GetDigitalUnitSaleStatsSuccessPayload
): GetDigitalUnitSaleStatsSuccess => ({
  type: GET_DIGITAL_UNIT_SALE_STATS_SUCCESS,
  payload,
});

export const getDigitalUnitSaleStatsFailure = (
  payload: GetDigitalUnitSaleStatsFailurePayload
): GetDigitalUnitSaleStatsFailure => ({
  type: GET_DIGITAL_UNIT_SALE_STATS_ERROR,
  payload,
});

export const getDigitalUnitByProvidersStats = (
  payload: GetDigitalUnitByProvidersStatsRequest
): GetDigitalUnitByProvidersStats => ({
  type: GET_DIGITAL_UNITS_BY_PROVIDERS_STATS,
  payload,
});

export const getDigitalUnitByProvidersStatsSuccess = (
  payload: GetDigitalUnitByProvidersStatsSuccessPayload
): GetDigitalUnitByProvidersStatsSuccess => ({
  type: GET_DIGITAL_UNITS_BY_PROVIDERS_STATS_SUCCESS,
  payload,
});

export const getDigitalUnitByProvidersStatsFailure = (
  payload: GetDigitalUnitByProvidersStatsFailurePayload
): GetDigitalUnitByProvidersStatsFailure => ({
  type: GET_DIGITAL_UNITS_BY_PROVIDERS_STATS_ERROR,
  payload,
});
