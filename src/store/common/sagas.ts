import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  moveGetSuccess,
  moveGetFailure,
  moveAddressUpdateFailure,
  moveAddressUpdateSuccess,
  updateMoveSourceHomeInfoFailure,
  updateMoveSourceHomeInfoSuccess,
  updateMoveDestinationHomeInfoFailure,
  updateMoveDestinationHomeInfoSuccess,
  scriptGetFailure,
  scriptGetSuccess,
  moveWithHashCodeFailure,
  moveWithHashCodeSuccess,
  appointmentPostSuccess,
  appointmentPostFailure,
  userGetFailure,
  userGetSuccess,
  orderGetFailure,
  orderGetSuccess,
  brokerageGetFailure,
  brokerageGetSuccess,
  realtorGetFailure,
  realtorGetSuccess,
  accountPostFailure,
  accountPostSuccess,
  extraPostSuccess,
  extraPostFailure,
  startWorkflowSuccess,
  startWorkflowFailure,
  noShowSuccess,
  noShowFailure,
  noAnswerSuccess,
  noAnswerFailure,
  getNotesSuccess,
  getNotesFailure,
  addNotesSuccess,
  addNotesFailure,
  updateNotesSuccess,
  updateNotesFailure,
  updatePrimaryContactSuccess,
  updatePrimaryContactFailure,
  updateOrderRemarkSuccess,
  updateOrderRemarkFailure,
  postSkipServiceSuccess,
  postSkipServiceFailure,
  getSkipServiceSuccess,
  getSkipServiceFailure,
} from "./actions";
import {
  MOVE_API_GET,
  MOVE_ADDRESS_UPDATE,
  UPDATE_MOVE_SOURCE_HOME_INFORMATION,
  UPDATE_MOVE_DESTINATION_HOME_INFORMATION,
  SCRIPT_API_GET,
  MOVE_API_GET_WITH_HASHCODE,
  APPOINTMENTS_POST,
  USER_API_GET,
  ORDER_API_GET,
  BROKERAGE_API_GET,
  REALTOR_API_GET,
  ACCOUNT_POST,
  EXTRA_POST,
  START_WORKFLOW,
  NO_SHOW,
  NO_ANSWER,
  GET_NOTES,
  ADD_NOTES,
  UPDATE_NOTES,
  UPDATE_PRIMARY_CONTACT,
  UPDATE_ORDER_REMARK,
  POST_SKIP_SERVICE,
  GET_SKIP_SERVICE,
} from "./actionTypes";
import apiJunction from "../../utils/api";
import { tokenToString } from "typescript";
// import apiJunctionNew from "../../utils/apiNew";
import history from "../../routes/History";
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* moveGet() {
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: `/api/move/move-api/`,
      token: token,
    });
    if (response.data && response.status) {
      yield put(moveGetSuccess({ move: response.data }));
    }
  } catch (e) {
    yield put(moveGetFailure({ error: (e as Error).message }));
  }
}

function* moveAddressUpdate(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "patch",
      url: `/api/move/move-api/${action.payload.move_id}/`,
      body: action.payload,
      headers: { "Content-Type": "application/json" },
      token: token,
    });
    if (response.data && response.status) {
      yield put(
        moveAddressUpdateSuccess({
          moveAddressUpdate: { ...response.data, status: response.status },
        })
      );
    }
  } catch (e) {
    yield put(moveAddressUpdateFailure({ error: (e as Error).message }));
  }
}

// update move source

function* updateMoveSourceHomeInfo(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "patch",
      url: `/api/move/move-api/${action.payload.move_id}/update-move-source-home-information/`,
      body: action.payload.data,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        updateMoveSourceHomeInfoSuccess({
          updateMoveSourceHomeInfo: response.data,
        })
      );
    }
  } catch (e) {
    yield put(updateMoveSourceHomeInfoFailure({ error: (e as Error).message }));
  }
}

// update move destination
function* updateMoveDestinationHomeInfo(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "patch",
      url: `api/move/move-api/${action.payload.move_id}/update-move-destination-home-information/`,
      body: action.payload.data,
      token: token,
    });
    if (response.data && response.status === 200) {
      yield put(
        updateMoveDestinationHomeInfoSuccess({
          updateMoveDestinationHomeInfo: response.data,
        })
      );
    }
  } catch (e) {
    yield put(
      updateMoveDestinationHomeInfoFailure({ error: (e as Error).message })
    );
  }
}

//get script
function* scriptGet(action: any) {
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
      url:
        action.payload.page &&
        action.payload.service &&
        action.payload.subCategory
          ? `/csr/api/v1/script/get-content/?hash_code=${action.payload.hash_code}&service=${action.payload.service}&page_number=${action.payload.page}&sub_category=${action.payload.subCategory}`
          : action.payload.page && action.payload.service
          ? `/csr/api/v1/script/get-content/?hash_code=${action.payload.hash_code}&service=${action.payload.service}&page_number=${action.payload.page}`
          : action.payload.service
          ? `/csr/api/v1/script/get-content/?hash_code=${action.payload.hash_code}&service=${action.payload.service}`
          : `/csr/api/v1/script/get-content/?hash_code=${action.payload.hash_code}`,
      token: token,
    });
    if (response.data && response.status) {
      yield put(scriptGetSuccess({ script: response.data }));
    } else {
      window.alert("Token Expired!");
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e) {
    yield put(scriptGetFailure({ error: (e as Error).message }));
  }
}

//get move with hash code
function* moveWithHashCode(action: any) {
  try {
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: `/api/move/move-api/?hash_code=${action.payload.hash_code}`,
      token: "",
    });
    if (response.data && response.status) {
      // console.log(response.data);
      // localStorage.setItem("moveeasytoken", response.data[0].user_ref.token);
      yield put(moveWithHashCodeSuccess({ moveWithHashCode: response.data }));
    } else {
      console.log("hii");
    }
  } catch (e) {
    console.log("hii");
    yield put(moveWithHashCodeFailure({ error: (e as Error).message }));
  }
}

function* appointmentPost(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/move-order/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(appointmentPostSuccess({ appointmentPost: response.data }));
    }
  } catch (e: any) {
    yield put(
      appointmentPostFailure({
        errorAppointmentPost:
          e.response && e.response.data && e.response.data.error,
      })
    );
  }
}

//get user
function* userGet() {
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
      url: `csr/api/v1/token-user/`,
      token: token,
    });
    if (response.data && response.status) {
      yield put(userGetSuccess({ user: response.data }));
    } else {
      window.alert("Token Expired!");
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  } catch (e: any) {
    yield put(userGetFailure({ error: (e as Error).message }));
    if (
      e &&
      e.response &&
      e.response.data &&
      e.response.data.detail &&
      e.response.data.detail == "Invalid token."
    ) {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
  }
}

//get order
function* orderGet(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    let url: string = `/csr/api/v1/move-order/summary/?move=${action.payload.moveId}`;
    if (action.payload.isCompleted) {
      url = `/csr/api/v1/move-order/summary/?move=${action.payload.moveId}&is_complete=${action.payload.isCompleted}`;
    }
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      // url: `csr/api/v1/move-order/?service=${action.payload.service}&move=${action.payload.moveId}`,
      url: url,
      token: token,
    });
    if (response.data && response.status) {
      yield put(orderGetSuccess({ order: response.data }));
    } else {
      window.alert("Token Expired!");
      console.log("hii");
    }
  } catch (e: any) {
    if (
      e &&
      e.response &&
      e.response.data &&
      e.response.data.detail &&
      e.response.data.detail == "Invalid token."
    ) {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
    yield put(orderGetFailure({ error: (e as Error).message }));
  }
}

//get brokerage
function* brokerageGet(action: any) {
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
      url: `api/realtors/brokerage-list/?q=${action.payload.key}`,
      token: token,
    });
    if (response.data && response.status) {
      yield put(brokerageGetSuccess({ brokerage: response.data }));
    }
  } catch (e: any) {
    if (
      e &&
      e.response &&
      e.response.data &&
      e.response.data.detail &&
      e.response.data.detail == "Invalid token."
    ) {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
    yield put(brokerageGetFailure({ error: (e as Error).message }));
  }
}

//get realtor
function* realtorGet(action: any) {
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
      url: `api/realtors/realtor-ajax-search/?q=${action.payload.key}&brokerage_slug=${action.payload.brokerage_slug}`,
      token: token,
    });
    if (response.data && response.status) {
      yield put(realtorGetSuccess({ realtor: response.data }));
    }
  } catch (e) {
    yield put(realtorGetFailure({ error: (e as Error).message }));
  }
}

//account post

function* accountPost(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/csr-move/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(accountPostSuccess({ accountPost: response.data }));
    }
  } catch (e: any) {
    yield put(accountPostFailure({ error: e.message }));
  }
}

//extra post
function* extraPost(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "patch",
      url: `/api/move/move-api/${action.payload.moveId}/update-move-source-internet-information/`,
      body: action.payload.body,
      token: token,
    });
    if (response.data) {
      yield put(extraPostSuccess({ extraPost: response.data }));
    }
  } catch (e: any) {
    if (
      e &&
      e.response &&
      e.response.data &&
      e.response.data.detail &&
      e.response.data.detail == "Invalid token."
    ) {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
    yield put(extraPostFailure({ error: e.message }));
  }
}

function* startWorkflow(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/start-workflow/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(startWorkflowSuccess({ startWorkflow: response.data }));
    }
  } catch (e: any) {
    yield put(startWorkflowFailure({ error: e.message }));
  }
}

function* noShow(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/no-show/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(noShowSuccess({ noShow: response.data }));
    }
  } catch (e: any) {
    yield put(noShowFailure({ error: e.message }));
  }
}

function* noAnswer(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/no-answer/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(noAnswerSuccess({ noAnswer: response.data }));
    }
  } catch (e: any) {
    yield put(noAnswerFailure({ error: e.message }));
  }
}

function* getNotes(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: `/csr/api/v1/notes/all/?hash_code=${action.payload.hash_code}`,
      token: token,
    });
    console.log(response);
    if (response.data) {
      yield put(getNotesSuccess({ getNotes: response.data }));
    } else {
      if (
        response &&
        response.data &&
        response.data.detail &&
        response.data.detail == "Invalid token."
      ) {
        localStorage.clear();
        history.push("/login");
        window.location.reload();
      }
    }
  } catch (e: any) {
    if (
      e &&
      e.response &&
      e.response.data &&
      e.response.data.detail &&
      e.response.data.detail == "Invalid token."
    ) {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
    yield put(getNotesFailure({ error: e.message }));
  }
}
function* addNotes(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/notes/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(addNotesSuccess({ addNotes: response.data }));
    }
  } catch (e: any) {
    yield put(addNotesFailure({ error: e.message }));
  }
}
function* updateNotes(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/notes/${action.payload.id}`,
      body: action.payload.body,
      token: token,
    });
    if (response.data) {
      yield put(updateNotesSuccess({ updateNotes: response.data }));
    }
  } catch (e: any) {
    yield put(updateNotesFailure({ error: e.message }));
  }
}

function* updatePrimaryContact(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("moveeasytoken") &&
      localStorage.getItem("moveeasytoken") !== null
    ) {
      token = localStorage.getItem("moveeasytoken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "put",
      url: `/api/move/move-api/${action.payload.id}/`,
      body: action.payload.body,
      token: token,
    });
    if (response.data) {
      yield put(
        updatePrimaryContactSuccess({ updatePrimaryContact: response.data })
      );
    }
  } catch (e: any) {
    yield put(updatePrimaryContactFailure({ error: e.message }));
  }
}

function* updateOrderRemark(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "put",
      url: `/csr/api/v1/move-order/update_remarks/`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(updateOrderRemarkSuccess({ updateOrderRemark: response.data }));
    }
  } catch (e: any) {
    yield put(updateOrderRemarkFailure({ error: e.message }));
  }
}

function* postSkipService(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "post",
      url: `/csr/api/v1/skipped-service/`,
      body: action.payload,
      token: token,
    });
    console.log(response);
    if (response.data) {
      yield put(postSkipServiceSuccess({ postSkipService: response.data }));
    }
  } catch (e: any) {
    yield put(postSkipServiceFailure({ error: e.message }));
  }
}

function* getSkipService(action: any) {
  try {
    let token: any = "";
    if (
      localStorage.getItem("newToken") &&
      localStorage.getItem("newToken") !== null
    ) {
      token = localStorage.getItem("newToken");
    }
    // console.log(action.payload);
    const response: ResponseGenerator = yield call(apiJunction.makeRequest, {
      method: "get",
      url: `/csr/api/v1/skipped-service/?move=${action.payload.moveId}`,
      body: action.payload,
      token: token,
    });
    if (response.data) {
      yield put(getSkipServiceSuccess({ getSkipService: response.data }));
    }
  } catch (e: any) {
    if (
      e &&
      e.response &&
      e.response.data &&
      e.response.data.detail &&
      e.response.data.detail == "Invalid token."
    ) {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
    }
    yield put(getSkipServiceFailure({ error: e.message }));
  }
}

export default function* commonSaga() {
  yield all([
    takeLatest(MOVE_API_GET, moveGet),
    takeLatest(MOVE_ADDRESS_UPDATE, moveAddressUpdate),
    takeLatest(UPDATE_MOVE_SOURCE_HOME_INFORMATION, updateMoveSourceHomeInfo),
    takeLatest(
      UPDATE_MOVE_DESTINATION_HOME_INFORMATION,
      updateMoveDestinationHomeInfo
    ),
    takeLatest(SCRIPT_API_GET, scriptGet),
    takeLatest(MOVE_API_GET_WITH_HASHCODE, moveWithHashCode),
    takeLatest(APPOINTMENTS_POST, appointmentPost),
    takeLatest(USER_API_GET, userGet),
    takeLatest(ORDER_API_GET, orderGet),
    takeLatest(BROKERAGE_API_GET, brokerageGet),
    takeLatest(REALTOR_API_GET, realtorGet),
    takeLatest(ACCOUNT_POST, accountPost),
    takeLatest(EXTRA_POST, extraPost),
    takeLatest(START_WORKFLOW, startWorkflow),
    takeLatest(NO_SHOW, noShow),
    takeLatest(NO_ANSWER, noAnswer),
    takeLatest(GET_NOTES, getNotes),
    takeLatest(ADD_NOTES, addNotes),
    takeLatest(UPDATE_NOTES, updateNotes),
    takeLatest(UPDATE_PRIMARY_CONTACT, updatePrimaryContact),
    takeLatest(UPDATE_ORDER_REMARK, updateOrderRemark),
    takeLatest(POST_SKIP_SERVICE, postSkipService),
    takeLatest(GET_SKIP_SERVICE, getSkipService),
  ]);
}
