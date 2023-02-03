import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  loginFailure,
  loginSuccess,
  logoutSuccess,
  logoutFailure,
} from "./actions";
import { LOGIN, LOGOUT } from "./actionTypes";
import apiJunction from "../../utils/api";
// import { store } from 'react-notifications-component';
import history from '../../routes/History';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* loggingIn(action: any) {
  try {
    const response: ResponseGenerator = yield call(apiJunction.login, {
      method: "post",
      url: `/csr/api/v1/login/`,
      body: action.payload,
      token: "",
    });
    if (response.data && response.status === 201) {
      // console.log(response);
      if (response.data.token) {
        localStorage.setItem("newToken", response.data.token);
      }
      yield put(
        loginSuccess({
          token: response.data,
        })
      );
      history.push('/dashboard');
      window.location.reload()
    } else {
      window.alert("Error Occurred!");
      // store.addNotification({
      //     title: 'Error',
      //     message: 'Error Occurred!',
      //     type: 'danger',
      //     insert: 'bottom',
      //     container: 'bottom-center',
      //     animationIn: ['animate__animated', 'animate__fadeIn'],
      //     animationOut: ['animate__animated', 'animate__fadeOut'],
      //     dismiss: {
      //         duration: 2000,
      //         onScreen: true,
      //     },
      // });
    }
  } catch (e) {
    // store.addNotification({
    //     title: 'Error',
    //     message: e.message,
    //     type: 'danger',
    //     insert: 'bottom',
    //     container: 'bottom-center',
    //     animationIn: ['animate__animated', 'animate__fadeIn'],
    //     animationOut: ['animate__animated', 'animate__fadeOut'],
    //     dismiss: {
    //         duration: 2000,
    //         onScreen: true,
    //     },
    // });
    yield put(
      loginFailure({
        error: (e as Error).message,
      })
    );
    window.alert("Error Occurred!");
  }
}

function* loggingOut() {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/logout/`,
      token: token,
    });
    if (response.status === 200) {
      yield put(
        logoutSuccess({
          logoutSuccess: response.data
            ? response.data
            : "Logged Out Successfully",
        })
      );
      localStorage.clear();
      history.push('/login')
      window.location.reload()
    } else {
      // console.log("inside else")
      window.alert("Token Expired!");
      localStorage.clear();
      history.push('/login')
      window.location.reload()
      // store.addNotification({
      //     title: 'Error',
      //     message: 'Error Occurred!',
      //     type: 'danger',
      //     insert: 'bottom',
      //     container: 'bottom-center',
      //     animationIn: ['animate__animated', 'animate__fadeIn'],
      //     animationOut: ['animate__animated', 'animate__fadeOut'],
      //     dismiss: {
      //         duration: 2000,
      //         onScreen: true,
      //     },
      // });
    }
  } catch (e) {
    // console.log("inside catch")
    window.alert("Token Expired!");
    localStorage.clear();
    history.push('/login')
    window.location.reload()
    // store.addNotification({
    //     title: 'Error',
    //     message: e.message,
    //     type: 'danger',
    //     insert: 'bottom',
    //     container: 'bottom-center',
    //     animationIn: ['animate__animated', 'animate__fadeIn'],
    //     animationOut: ['animate__animated', 'animate__fadeOut'],
    //     dismiss: {
    //         duration: 2000,
    //         onScreen: true,
    //     },
    // });
    yield put(
      logoutFailure({
        logoutError: (e as Error).message,
      })
    );
  }
}

function* loginSaga() {
  yield all([takeLatest(LOGIN, loggingIn)]);
  yield all([takeLatest(LOGOUT, loggingOut)]);
}

export default loginSaga;
