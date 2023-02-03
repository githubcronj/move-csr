import { all, call, put, takeLatest } from "redux-saga/effects";
// import { store } from 'react-notifications-component';
import {
  usersSuccess,
  usersFailure,
  // userFailure,
  // userSuccess
} from "./actions";
import {
  GET_USERS,
  // GET_SINGLE_USER
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

function* users(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: `/csr/api/v1/customer-list/?request_for=${action.payload.requestFor}&request_type=${action.payload.requestType}&search[value]=${action.payload.searchVal}&start=${action.payload.page}&length=${action.payload.length}`,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(usersSuccess({ users: response.data }));
    } else {
      // history.push('/bad-request');
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(usersFailure({ error: (e as Error).message }));
    // history.push('/server-error');
    // window.alert("Token Expired!");
    // localStorage.clear();
    // history.push("/login");
    // window.location.reload();
  }
}

// function* user(action:any) {
//     try {
//         const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
//             method: 'get',
//             url: `https://conciergeapidemo.moveeasy.com/csr/api/v1/customer-list?search[value]=${action.payload.name}`,
//         });
//         if (response.data && response.status === 200) {
//             yield put(userSuccess({ user: response.data }));
//         } else {
//             // history.push('/bad-request');
//         }
//     } catch (e) {
//         yield put(userFailure({ error: (e as Error).message }));
//         // history.push('/server-error');
//     }
// }

export default function* usersSaga() {
  yield all([takeLatest(GET_USERS, users)]);

  // yield all([takeLatest(GET_SINGLE_USER, user)]);
}
