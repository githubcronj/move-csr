import { all, call, put, takeLatest } from "redux-saga/effects";
// import { store } from 'react-notifications-component';
import {
  getAggregateSaleSuccess,
  getAggregateSaleFailure,
  getOverallUnitSaleSuccess,
  getOverallUnitSaleFailure,
  getDigitalUnitSaleSuccess,
  getDigitalUnitSaleFailure,
  getDigitalUnitByProvidersSuccess,
  getDigitalUnitByProvidersFailure,
  getAggregateSaleStatsSuccess,
  getAggregateSaleStatsFailure,
  getOverallUnitSaleStatsSuccess,
  getOverallUnitSaleStatsFailure,
  getDigitalUnitSaleStatsSuccess,
  getDigitalUnitSaleStatsFailure,
  getDigitalUnitByProvidersStatsSuccess,
  getDigitalUnitByProvidersStatsFailure,
} from "./actions";
import {
  GET_AGGREGATE_SALE,
  GET_OVERALL_UNIT_SALE,
  GET_DIGITAL_UNIT_SALE,
  GET_DIGITAL_UNITS_BY_PROVIDERS,
  GET_AGGREGATE_SALE_STATS,
  GET_OVERALL_UNIT_SALE_STATS,
  GET_DIGITAL_UNIT_SALE_STATS,
  GET_DIGITAL_UNITS_BY_PROVIDERS_STATS,
} from "./actionTypes";
import apiJunction from "../../utils/api";
import history from "../../routes/History";
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* getAggregateSale(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log("hii");
    let url: string = `/csr/api/v1/order-analytics/`;
    // console.log("url", url);
    if (action.payload.startDate && action.payload.endDate) {
      url = `/csr/api/v1/order-analytics/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    if (action.payload.brokerage) {
      url = `/csr/api/v1/order-analytics/?brokerage=${action.payload.brokerage}`;
    }

    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(getAggregateSaleSuccess({ getAggregateSale: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getAggregateSaleFailure({ error: (e as Error).message }));
  }
}
function* getOverallUnitSale(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/csr/api/v1/order-analytics/overall/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/csr/api/v1/order-analytics/overall?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getOverallUnitSaleSuccess({ getOverallUnitSale: response.data })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getOverallUnitSaleFailure({ error: (e as Error).message }));
  }
}
function* getDigitalUnitSale(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/csr/api/v1/order-analytics/digital_units/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/csr/api/v1/order-analytics/digital_units/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getDigitalUnitSaleSuccess({ getDigitalUnitSale: response.data })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getDigitalUnitSaleFailure({ error: (e as Error).message }));
  }
}
function* getDigitalUnitByProviders(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/csr/api/v1/order-analytics/provider_units/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/csr/api/v1/order-analytics/provider_units/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getDigitalUnitByProvidersSuccess({
          getDigitalUnitByProviders: response.data,
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(
      getDigitalUnitByProvidersFailure({ error: (e as Error).message })
    );
  }
}

function* getAggregateSaleStats(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log("hii");
    let url: string = `/csr/api/v1/order-analytics/stats`;
    // console.log("url", url);
    if (action.payload.startDate && action.payload.endDate) {
      url = `/csr/api/v1/order-analytics/stats?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    if (action.payload.brokerage) {
      url = `/csr/api/v1/order-analytics/?brokerage=${action.payload.brokerage}`;
    }

    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getAggregateSaleStatsSuccess({ getAggregateSaleStats: response.data })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getAggregateSaleStatsFailure({ error: (e as Error).message }));
  }
}
function* getOverallUnitSaleStats(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/csr/api/v1/order-analytics/overall_stats/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/csr/api/v1/order-analytics/overall_stats?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getOverallUnitSaleStatsSuccess({
          getOverallUnitSaleStats: response.data,
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getOverallUnitSaleStatsFailure({ error: (e as Error).message }));
  }
}
function* getDigitalUnitSaleStats(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/csr/api/v1/order-analytics/digital_stats/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/csr/api/v1/order-analytics/digital_stats/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getDigitalUnitSaleStatsSuccess({
          getDigitalUnitSaleStats: response.data,
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(getDigitalUnitSaleStatsFailure({ error: (e as Error).message }));
  }
}
function* getDigitalUnitByProvidersStats(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: any = `/csr/api/v1/order-analytics/provider_stats/`;
    if (action.payload.startDate && action.payload.endDate) {
      url = `/csr/api/v1/order-analytics/provider_stats/?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`;
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: url,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        getDigitalUnitByProvidersStatsSuccess({
          getDigitalUnitByProvidersStats: response.data,
        })
      );
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(
      getDigitalUnitByProvidersStatsFailure({ error: (e as Error).message })
    );
  }
}

export default function* getAnalyticsSaga() {
  yield all([takeLatest(GET_AGGREGATE_SALE, getAggregateSale)]);
  yield all([takeLatest(GET_OVERALL_UNIT_SALE, getOverallUnitSale)]);
  yield all([takeLatest(GET_DIGITAL_UNIT_SALE, getDigitalUnitSale)]);
  yield all([
    takeLatest(GET_DIGITAL_UNITS_BY_PROVIDERS, getDigitalUnitByProviders),
  ]);
  yield all([takeLatest(GET_AGGREGATE_SALE_STATS, getAggregateSaleStats)]);
  yield all([takeLatest(GET_OVERALL_UNIT_SALE_STATS, getOverallUnitSaleStats)]);
  yield all([takeLatest(GET_DIGITAL_UNIT_SALE_STATS, getDigitalUnitSaleStats)]);
  yield all([
    takeLatest(
      GET_DIGITAL_UNITS_BY_PROVIDERS_STATS,
      getDigitalUnitByProvidersStats
    ),
  ]);
}
