import {
  MOVE_API_GET,
  MOVE_API_GET_ERROR,
  MOVE_API_GET_SUCCESS,
  MOVE_ADDRESS_UPDATE,
  MOVE_ADDRESS_UPDATE_ERROR,
  MOVE_ADDRESS_UPDATE_SUCCESS,
  UPDATE_MOVE_SOURCE_HOME_INFORMATION,
  UPDATE_MOVE_SOURCE_HOME_INFORMATION_SUCCESS,
  UPDATE_MOVE_SOURCE_HOME_INFORMATION_ERROR,
  UPDATE_MOVE_DESTINATION_HOME_INFORMATION,
  UPDATE_MOVE_DESTINATION_HOME_INFORMATION_SUCCESS,
  UPDATE_MOVE_DESTINATION_HOME_INFORMATION_ERROR,
  SCRIPT_API_GET,
  SCRIPT_API_GET_SUCCESS,
  SCRIPT_API_GET_ERROR,
  MOVE_API_GET_WITH_HASHCODE,
  MOVE_API_GET_WITH_HASHCODE_SUCCESS,
  MOVE_API_GET_WITH_HASHCODE_ERROR,
  APPOINTMENTS_POST,
  APPOINTMENTS_POST_SUCCESS,
  APPOINTMENTS_POST_ERROR,
  USER_API_GET,
  USER_API_GET_ERROR,
  USER_API_GET_SUCCESS,
  ORDER_API_GET_SUCCESS,
  ORDER_API_GET_ERROR,
  ORDER_API_GET,
  BROKERAGE_API_GET,
  BROKERAGE_API_GET_SUCCESS,
  BROKERAGE_API_GET_ERROR,
  REALTOR_API_GET,
  REALTOR_API_GET_SUCCESS,
  REALTOR_API_GET_ERROR,
  ACCOUNT_POST,
  ACCOUNT_POST_ERROR,
  ACCOUNT_POST_SUCCESS,
  EXTRA_POST,
  EXTRA_POST_ERROR,
  EXTRA_POST_SUCCESS,
  START_WORKFLOW,
  START_WORKFLOW_ERROR,
  START_WORKFLOW_SUCCESS,
  NO_SHOW,
  NO_SHOW_ERROR,
  NO_SHOW_SUCCESS,
  NO_ANSWER,
  NO_ANSWER_ERROR,
  NO_ANSWER_SUCCESS,
  GET_NOTES,
  GET_NOTES_ERROR,
  GET_NOTES_SUCCESS,
  ADD_NOTES,
  ADD_NOTES_ERROR,
  ADD_NOTES_SUCCESS,
  UPDATE_NOTES,
  UPDATE_NOTES_ERROR,
  UPDATE_NOTES_SUCCESS,
  UPDATE_PRIMARY_CONTACT,
  UPDATE_PRIMARY_CONTACT_ERROR,
  UPDATE_PRIMARY_CONTACT_SUCCESS,
  UPDATE_ORDER_REMARK,
  UPDATE_ORDER_REMARK_ERROR,
  UPDATE_ORDER_REMARK_SUCCESS,
  POST_SKIP_SERVICE,
  POST_SKIP_SERVICE_ERROR,
  POST_SKIP_SERVICE_SUCCESS,
  GET_SKIP_SERVICE,
  GET_SKIP_SERVICE_ERROR,
  GET_SKIP_SERVICE_SUCCESS,
} from "./actionTypes";
import * as types from "./types";

// get move
export const moveGet = (): types.MoveGet => ({
  type: MOVE_API_GET,
});

export const moveGetSuccess = (
  payload: types.MoveGetSuccessPayload
): types.MoveGetSuccess => ({
  type: MOVE_API_GET_SUCCESS,
  payload,
});

export const moveGetFailure = (
  payload: types.MoveGetFailurePayload
): types.MoveGetFailure => ({
  type: MOVE_API_GET_ERROR,
  payload,
});

// update move
export const moveAddressUpdate = (
  payload: types.MoveAddressRequest
): types.MoveAddress => ({
  type: MOVE_ADDRESS_UPDATE,
  payload,
});

export const moveAddressUpdateSuccess = (
  payload: types.MoveAddressSuccessPayload
): types.MoveAddressSuccess => ({
  type: MOVE_ADDRESS_UPDATE_SUCCESS,
  payload,
});

export const moveAddressUpdateFailure = (
  payload: types.MoveAddressFailurePayload
): types.MoveAddressFailure => ({
  type: MOVE_ADDRESS_UPDATE_ERROR,
  payload,
});

// update move source
export const updateMoveSourceHomeInfo = (
  payload: types.UpdateMoveSourceHomeInfoRequest
): types.UpdateMoveSourceHomeInfo => {
  return {
    type: UPDATE_MOVE_SOURCE_HOME_INFORMATION,
    payload,
  };
};

export const updateMoveSourceHomeInfoSuccess = (
  payload: types.UpdateMoveSourceHomeInfoSuccessPayload
): types.UpdateMoveSourceHomeInfoSuccess => {
  return {
    type: UPDATE_MOVE_SOURCE_HOME_INFORMATION_SUCCESS,
    payload,
  };
};

export const updateMoveSourceHomeInfoFailure = (
  payload: types.UpdateMoveSourceHomeInfoFailurePayload
): types.UpdateMoveSourceHomeInfoFailure => {
  return {
    type: UPDATE_MOVE_SOURCE_HOME_INFORMATION_ERROR,
    payload,
  };
};

// update move destination
export const updateMoveDestinationHomeInfo = (
  payload: types.UpdateMoveDestinationHomeInfoRequest
): types.UpdateMoveDestinationHomeInfo => {
  return {
    type: UPDATE_MOVE_DESTINATION_HOME_INFORMATION,
    payload,
  };
};

export const updateMoveDestinationHomeInfoSuccess = (
  payload: types.UpdateMoveDestinationHomeInfoSuccessPayload
): types.UpdateMoveDestinationHomeInfoSuccess => {
  return {
    type: UPDATE_MOVE_DESTINATION_HOME_INFORMATION_SUCCESS,
    payload,
  };
};

export const updateMoveDestinationHomeInfoFailure = (
  payload: types.UpdateMoveDestinationHomeInfoFailurePayload
): types.UpdateMoveDestinationHomeInfoFailure => {
  return {
    type: UPDATE_MOVE_DESTINATION_HOME_INFORMATION_ERROR,
    payload,
  };
};

// get script
export const scriptGet = (
  payload: types.ScriptGetRequest
): types.ScriptGet => ({
  type: SCRIPT_API_GET,
  payload,
});
export const scriptGetSuccess = (
  payload: types.ScriptGetSuccessPayload
): types.ScriptGetSuccess => ({
  type: SCRIPT_API_GET_SUCCESS,
  payload,
});

export const scriptGetFailure = (
  payload: types.ScriptGetFailurePayload
): types.ScriptGetFailure => ({
  type: SCRIPT_API_GET_ERROR,
  payload,
});

// get move with hash code
export const moveWithHashCode = (
  payload: types.MoveWithHashCodeRequest
): types.MoveWithHashCode => ({
  type: MOVE_API_GET_WITH_HASHCODE,
  payload,
});
export const moveWithHashCodeSuccess = (
  payload: types.MoveWithHashCodeSuccessPayload
): types.MoveWithHashCodeSuccess => ({
  type: MOVE_API_GET_WITH_HASHCODE_SUCCESS,
  payload,
});

export const moveWithHashCodeFailure = (
  payload: types.MoveWithHashCodeFailurePayload
): types.MoveWithHashCodeFailure => ({
  type: MOVE_API_GET_WITH_HASHCODE_ERROR,
  payload,
});

export const appointmentPost = (
  payload: types.AppointmentPostRequest
): types.AppointmentPost => ({
  type: APPOINTMENTS_POST,
  payload,
});
export const appointmentPostSuccess = (
  payload: types.AppointmentPostSuccessPayload
): types.AppointmentPostSuccess => ({
  type: APPOINTMENTS_POST_SUCCESS,
  payload,
});
export const appointmentPostFailure = (
  payload: types.AppointmentPostFailurePayload
): types.AppointmentPostFailure => ({
  type: APPOINTMENTS_POST_ERROR,
  payload,
});

// get user
export const userGet = (payload: types.UserGetRequest): types.UserGet => ({
  type: USER_API_GET,
  payload,
});
export const userGetSuccess = (
  payload: types.UserGetSuccessPayload
): types.UserGetSuccess => ({
  type: USER_API_GET_SUCCESS,
  payload,
});

export const userGetFailure = (
  payload: types.UserGetFailurePayload
): types.UserGetFailure => ({
  type: USER_API_GET_ERROR,
  payload,
});

// get order
export const orderGet = (payload: types.OrderGetRequest): types.OrderGet => ({
  type: ORDER_API_GET,
  payload,
});
export const orderGetSuccess = (
  payload: types.OrderGetSuccessPayload
): types.OrderGetSuccess => ({
  type: ORDER_API_GET_SUCCESS,
  payload,
});

export const orderGetFailure = (
  payload: types.OrderGetFailurePayload
): types.OrderGetFailure => ({
  type: ORDER_API_GET_ERROR,
  payload,
});

// get brokerage
export const brokerageGet = (
  payload: types.BrokerageGetRequest
): types.BrokerageGet => ({
  type: BROKERAGE_API_GET,
  payload,
});
export const brokerageGetSuccess = (
  payload: types.BrokerageGetSuccessPayload
): types.BrokerageGetSuccess => ({
  type: BROKERAGE_API_GET_SUCCESS,
  payload,
});

export const brokerageGetFailure = (
  payload: types.BrokerageGetFailurePayload
): types.BrokerageGetFailure => ({
  type: BROKERAGE_API_GET_ERROR,
  payload,
});

// get realtor
export const realtorGet = (
  payload: types.RealtorGetRequest
): types.RealtorGet => ({
  type: REALTOR_API_GET,
  payload,
});
export const realtorGetSuccess = (
  payload: types.RealtorGetSuccessPayload
): types.RealtorGetSuccess => ({
  type: REALTOR_API_GET_SUCCESS,
  payload,
});

export const realtorGetFailure = (
  payload: types.RealtorGetFailurePayload
): types.RealtorGetFailure => ({
  type: REALTOR_API_GET_ERROR,
  payload,
});

//account post

export const accountPost = (
  payload: types.AccountPostRequest
): types.AccountPost => ({
  type: ACCOUNT_POST,
  payload,
});
export const accountPostSuccess = (
  payload: types.AccountPostSuccessPayload
): types.AccountPostSuccess => ({
  type: ACCOUNT_POST_SUCCESS,
  payload,
});
export const accountPostFailure = (
  payload: types.AccountPostFailurePayload
): types.AccountPostFailure => ({
  type: ACCOUNT_POST_ERROR,
  payload,
});

//extra post

export const extraPost = (
  payload: types.ExtraPostRequest
): types.ExtraPost => ({
  type: EXTRA_POST,
  payload,
});
export const extraPostSuccess = (
  payload: types.ExtraPostSuccessPayload
): types.ExtraPostSuccess => ({
  type: EXTRA_POST_SUCCESS,
  payload,
});
export const extraPostFailure = (
  payload: types.ExtraPostFailurePayload
): types.ExtraPostFailure => ({
  type: EXTRA_POST_ERROR,
  payload,
});

export const startWorkflow = (
  payload: types.StartWorkflowRequest
): types.StartWorkflow => ({
  type: START_WORKFLOW,
  payload,
});
export const startWorkflowSuccess = (
  payload: types.StartWorkflowSuccessPayload
): types.StartWorkflowSuccess => ({
  type: START_WORKFLOW_SUCCESS,
  payload,
});
export const startWorkflowFailure = (
  payload: types.StartWorkflowFailurePayload
): types.StartWorkflowFailure => ({
  type: START_WORKFLOW_ERROR,
  payload,
});

export const noShow = (payload: types.NoShowRequest): types.NoShow => ({
  type: NO_SHOW,
  payload,
});
export const noShowSuccess = (
  payload: types.NoShowSuccessPayload
): types.NoShowSuccess => ({
  type: NO_SHOW_SUCCESS,
  payload,
});
export const noShowFailure = (
  payload: types.NoShowFailurePayload
): types.NoShowFailure => ({
  type: NO_SHOW_ERROR,
  payload,
});

export const noAnswer = (payload: types.NoAnswerRequest): types.NoAnswer => ({
  type: NO_ANSWER,
  payload,
});
export const noAnswerSuccess = (
  payload: types.NoAnswerSuccessPayload
): types.NoAnswerSuccess => ({
  type: NO_ANSWER_SUCCESS,
  payload,
});
export const noAnswerFailure = (
  payload: types.NoAnswerFailurePayload
): types.NoAnswerFailure => ({
  type: NO_ANSWER_ERROR,
  payload,
});

export const getNotes = (payload: types.GetNotesRequest): types.GetNotes => ({
  type: GET_NOTES,
  payload,
});
export const getNotesSuccess = (
  payload: types.GetNotesSuccessPayload
): types.GetNotesSuccess => ({
  type: GET_NOTES_SUCCESS,
  payload,
});
export const getNotesFailure = (
  payload: types.GetNotesFailurePayload
): types.GetNotesFailure => ({
  type: GET_NOTES_ERROR,
  payload,
});

export const addNotes = (payload: types.AddNotesRequest): types.AddNotes => ({
  type: ADD_NOTES,
  payload,
});
export const addNotesSuccess = (
  payload: types.AddNotesSuccessPayload
): types.AddNotesSuccess => ({
  type: ADD_NOTES_SUCCESS,
  payload,
});
export const addNotesFailure = (
  payload: types.AddNotesFailurePayload
): types.AddNotesFailure => ({
  type: ADD_NOTES_ERROR,
  payload,
});

export const updateNotes = (
  payload: types.UpdateNotesRequest
): types.UpdateNotes => ({
  type: UPDATE_NOTES,
  payload,
});
export const updateNotesSuccess = (
  payload: types.UpdateNotesSuccessPayload
): types.UpdateNotesSuccess => ({
  type: UPDATE_NOTES_SUCCESS,
  payload,
});
export const updateNotesFailure = (
  payload: types.UpdateNotesFailurePayload
): types.UpdateNotesFailure => ({
  type: UPDATE_NOTES_ERROR,
  payload,
});

export const updatePrimaryContact = (
  payload: types.UpdatePrimaryContactRequest
): types.UpdatePrimaryContact => ({
  type: UPDATE_PRIMARY_CONTACT,
  payload,
});
export const updatePrimaryContactSuccess = (
  payload: types.UpdatePrimaryContactSuccessPayload
): types.UpdatePrimaryContactSuccess => ({
  type: UPDATE_PRIMARY_CONTACT_SUCCESS,
  payload,
});
export const updatePrimaryContactFailure = (
  payload: types.UpdatePrimaryContactFailurePayload
): types.UpdatePrimaryContactFailure => ({
  type: UPDATE_PRIMARY_CONTACT_ERROR,
  payload,
});

export const updateOrderRemark = (
  payload: types.UpdateOrderRemarkRequest
): types.UpdateOrderRemark => ({
  type: UPDATE_ORDER_REMARK,
  payload,
});
export const updateOrderRemarkSuccess = (
  payload: types.UpdateOrderRemarkSuccessPayload
): types.UpdateOrderRemarkSuccess => ({
  type: UPDATE_ORDER_REMARK_SUCCESS,
  payload,
});
export const updateOrderRemarkFailure = (
  payload: types.UpdateOrderRemarkFailurePayload
): types.UpdateOrderRemarkFailure => ({
  type: UPDATE_ORDER_REMARK_ERROR,
  payload,
});

// Skip service
export const postSkipService = (
  payload: types.PostSkipServiceRequest
): types.PostSkipService => ({
  type: POST_SKIP_SERVICE,
  payload,
});

export const postSkipServiceSuccess = (
  payload: types.PostSkipServiceSuccessPayload
): types.PostSkipServiceSuccess => ({
  type: POST_SKIP_SERVICE_SUCCESS,
  payload,
});

export const postSkipServiceFailure = (
  payload: types.PostSkipServiceFailurePayload
): types.PostSkipServiceFailure => ({
  type: POST_SKIP_SERVICE_ERROR,
  payload,
});

export const getSkipService = (
  payload: types.GetSkipServiceRequest
): types.GetSkipService => ({
  type: GET_SKIP_SERVICE,
  payload,
});

export const getSkipServiceSuccess = (
  payload: types.GetSkipServiceSuccessPayload
): types.GetSkipServiceSuccess => ({
  type: GET_SKIP_SERVICE_SUCCESS,
  payload,
});

export const getSkipServiceFailure = (
  payload: types.GetSkipServiceFailurePayload
): types.GetSkipServiceFailure => ({
  type: GET_SKIP_SERVICE_ERROR,
  payload,
});
