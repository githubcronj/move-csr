import { AnyMxRecord } from "dns";
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
  SCRIPT_API_GET_ERROR,
  SCRIPT_API_GET_SUCCESS,
  MOVE_API_GET_WITH_HASHCODE,
  MOVE_API_GET_WITH_HASHCODE_SUCCESS,
  MOVE_API_GET_WITH_HASHCODE_ERROR,
  APPOINTMENTS_POST,
  APPOINTMENTS_POST_SUCCESS,
  APPOINTMENTS_POST_ERROR,
  USER_API_GET,
  USER_API_GET_ERROR,
  USER_API_GET_SUCCESS,
  ORDER_API_GET,
  ORDER_API_GET_ERROR,
  ORDER_API_GET_SUCCESS,
  BROKERAGE_API_GET,
  BROKERAGE_API_GET_ERROR,
  BROKERAGE_API_GET_SUCCESS,
  REALTOR_API_GET,
  REALTOR_API_GET_ERROR,
  REALTOR_API_GET_SUCCESS,
  ACCOUNT_POST,
  ACCOUNT_POST_ERROR,
  ACCOUNT_POST_SUCCESS,
  EXTRA_POST,
  EXTRA_POST_ERROR,
  EXTRA_POST_SUCCESS,
  NO_SHOW,
  NO_SHOW_ERROR,
  NO_SHOW_SUCCESS,
  NO_ANSWER,
  NO_ANSWER_ERROR,
  NO_ANSWER_SUCCESS,
  START_WORKFLOW,
  START_WORKFLOW_ERROR,
  START_WORKFLOW_SUCCESS,
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

export interface ICommon {
  move: any;
  moveAddressUpdate: any;
  updateMoveSourceHomeInfo: any;
  updateMoveDestinationHomeInfo: any;
  script: any;
  moveWithHashCode: any;
  appointmentPost: any;
  user: any;
  order: any;
  brokerage: any;
  realtor: any;
  accountPost: any;
  extraPost: any;
  startWorkflow: any;
  noShow: any;
  noAnswer: any;
  getNotes: any;
  addNotes: any;
  updateNotes: any;
  updatePrimaryContact: any;
  updateOrderRemark: any;
}

export interface CommonState {
  move: ICommon[];
  isGetMove: boolean;
  error: string | null;
  moveAddressUpdate: ICommon[];
  isMoveAddressUpdate: boolean;
  updateMoveSourceHomeInfo: ICommon[];
  isSourceDetailsUpdated: boolean;
  updateMoveDestinationHomeInfo: ICommon[];
  isDestinationDetailsUpdated: boolean;
  script: ICommon[];
  scriptDataArrived: boolean;
  moveWithHashCode: ICommon[];
  isMoveWithHashCode: boolean;
  appointmentPost: ICommon[];
  isAppointmentPost: boolean;
  user: ICommon[];
  userDataArrived: boolean;
  order: ICommon[];
  orderDataArrived: boolean;
  brokerage: ICommon[];
  isBrokerageDataArrived: boolean;
  realtor: ICommon[];
  isRealtorDataArrived: boolean;
  accountPost: ICommon[];
  isAccountPost: boolean;
  extraPost: ICommon[];
  isExtraPost: boolean;
  noShow: ICommon[];
  isNoShow: boolean;
  noAnswer: ICommon[];
  isNoAnswer: boolean;
  startWorkflow: ICommon[];
  isStartWorkflow: boolean;
  getNotes: ICommon[];
  isGetNotes: boolean;
  addNotes: ICommon[];
  isAddNotes: boolean;
  updateNotes: ICommon[];
  isUpdateNotes: boolean;
  updatePrimaryContact: ICommon[];
  isUpdatePrimaryContact: boolean;
  updateOrderRemark: ICommon[];
  isUpdateOrderRemark: boolean;
  postSkipService: ICommon[];
  isPostSkipService: boolean;
  getSkipService: ICommon[];
  isGetSkipService: boolean;
}

// move get
export interface MoveGetSuccessPayload {
  move: ICommon[];
}
export interface MoveGetFailurePayload {
  error: string;
}
export type MoveGet = {
  type: typeof MOVE_API_GET;
};
export type MoveGetSuccess = {
  type: typeof MOVE_API_GET_SUCCESS;
  payload: MoveGetSuccessPayload;
};
export type MoveGetFailure = {
  type: typeof MOVE_API_GET_ERROR;
  payload: MoveGetFailurePayload;
};

// move address update
export interface MoveAddressRequest {
  destination_detail: string;
  move_id: string | number;
}
export interface MoveAddressSuccessPayload {
  moveAddressUpdate: ICommon[];
}
export interface MoveAddressFailurePayload {
  error: string;
}
export type MoveAddress = {
  type: typeof MOVE_ADDRESS_UPDATE;
  payload: MoveAddressRequest;
};
export type MoveAddressSuccess = {
  type: typeof MOVE_ADDRESS_UPDATE_SUCCESS;
  payload: MoveAddressSuccessPayload;
};
export type MoveAddressFailure = {
  type: typeof MOVE_ADDRESS_UPDATE_ERROR;
  payload: MoveAddressFailurePayload;
};

// update move source
export interface UpdateMoveSourceHomeInfoRequest {
  updateMoveSourceHomeInfo: ICommon[];
}

export interface UpdateMoveSourceHomeInfoSuccessPayload {
  updateMoveSourceHomeInfo: ICommon[];
}

export interface UpdateMoveSourceHomeInfoFailurePayload {
  error: string;
}

export type UpdateMoveSourceHomeInfo = {
  type: typeof UPDATE_MOVE_SOURCE_HOME_INFORMATION;
  payload: UpdateMoveSourceHomeInfoRequest;
};

export type UpdateMoveSourceHomeInfoSuccess = {
  type: typeof UPDATE_MOVE_SOURCE_HOME_INFORMATION_SUCCESS;
  payload: UpdateMoveSourceHomeInfoSuccessPayload;
};

export type UpdateMoveSourceHomeInfoFailure = {
  type: typeof UPDATE_MOVE_SOURCE_HOME_INFORMATION_ERROR;
  payload: UpdateMoveSourceHomeInfoFailurePayload;
};

// update move destination
export interface UpdateMoveDestinationHomeInfoRequest {
  updateMoveDestinationHomeInfo: ICommon[];
}

export interface UpdateMoveDestinationHomeInfoSuccessPayload {
  updateMoveDestinationHomeInfo: ICommon[];
}

export interface UpdateMoveDestinationHomeInfoFailurePayload {
  error: string;
}

export type UpdateMoveDestinationHomeInfo = {
  type: typeof UPDATE_MOVE_DESTINATION_HOME_INFORMATION;
  payload: UpdateMoveDestinationHomeInfoRequest;
};

export type UpdateMoveDestinationHomeInfoSuccess = {
  type: typeof UPDATE_MOVE_DESTINATION_HOME_INFORMATION_SUCCESS;
  payload: UpdateMoveDestinationHomeInfoSuccessPayload;
};

export type UpdateMoveDestinationHomeInfoFailure = {
  type: typeof UPDATE_MOVE_DESTINATION_HOME_INFORMATION_ERROR;
  payload: UpdateMoveDestinationHomeInfoFailurePayload;
};

// script get
export interface ScriptGetRequest {
  script: ICommon[];
}
export interface ScriptGetSuccessPayload {
  script: ICommon[];
}
export interface ScriptGetFailurePayload {
  error: string;
}
export type ScriptGet = {
  type: typeof SCRIPT_API_GET;
  payload: ScriptGetRequest;
};
export type ScriptGetSuccess = {
  type: typeof SCRIPT_API_GET_SUCCESS;
  payload: ScriptGetSuccessPayload;
};
export type ScriptGetFailure = {
  type: typeof SCRIPT_API_GET_ERROR;
  payload: ScriptGetFailurePayload;
};

// move get with hashCode  get
export interface MoveWithHashCodeRequest {
  moveWithHashCode: ICommon[];
}
export interface MoveWithHashCodeSuccessPayload {
  moveWithHashCode: ICommon[];
}
export interface MoveWithHashCodeFailurePayload {
  error: string;
}
export type MoveWithHashCode = {
  type: typeof MOVE_API_GET_WITH_HASHCODE;
  payload: MoveWithHashCodeRequest;
};
export type MoveWithHashCodeSuccess = {
  type: typeof MOVE_API_GET_WITH_HASHCODE_SUCCESS;
  payload: MoveWithHashCodeSuccessPayload;
};
export type MoveWithHashCodeFailure = {
  type: typeof MOVE_API_GET_WITH_HASHCODE_ERROR;
  payload: MoveWithHashCodeFailurePayload;
};

//appointment post
export interface AppointmentPostRequest {
  appointmentPost: ICommon[];
}
export interface AppointmentPostSuccessPayload {
  appointmentPost: ICommon[];
}

export interface AppointmentPostFailurePayload {
  errorAppointmentPost: string | null;
}

export type AppointmentPost = {
  type: typeof APPOINTMENTS_POST;
  payload: AppointmentPostRequest;
};

export type AppointmentPostSuccess = {
  type: typeof APPOINTMENTS_POST_SUCCESS;
  payload: AppointmentPostSuccessPayload;
};

export type AppointmentPostFailure = {
  type: typeof APPOINTMENTS_POST_ERROR;
  payload: AppointmentPostFailurePayload;
};

// user get
export interface UserGetRequest {
  user: ICommon[];
}
export interface UserGetSuccessPayload {
  user: ICommon[];
}
export interface UserGetFailurePayload {
  error: string;
}
export type UserGet = {
  type: typeof USER_API_GET;
  payload: UserGetRequest;
};
export type UserGetSuccess = {
  type: typeof USER_API_GET_SUCCESS;
  payload: UserGetSuccessPayload;
};
export type UserGetFailure = {
  type: typeof USER_API_GET_ERROR;
  payload: UserGetFailurePayload;
};

// order get
export interface OrderGetRequest {
  order: ICommon[];
}
export interface OrderGetSuccessPayload {
  order: ICommon[];
}
export interface OrderGetFailurePayload {
  error: string;
}
export type OrderGet = {
  type: typeof ORDER_API_GET;
  payload: OrderGetRequest;
};
export type OrderGetSuccess = {
  type: typeof ORDER_API_GET_SUCCESS;
  payload: OrderGetSuccessPayload;
};
export type OrderGetFailure = {
  type: typeof ORDER_API_GET_ERROR;
  payload: OrderGetFailurePayload;
};

// brokerage get
export interface BrokerageGetRequest {
  brokerage: ICommon[];
}
export interface BrokerageGetSuccessPayload {
  brokerage: ICommon[];
}
export interface BrokerageGetFailurePayload {
  error: string;
}
export type BrokerageGet = {
  type: typeof BROKERAGE_API_GET;
  payload: BrokerageGetRequest;
};
export type BrokerageGetSuccess = {
  type: typeof BROKERAGE_API_GET_SUCCESS;
  payload: BrokerageGetSuccessPayload;
};
export type BrokerageGetFailure = {
  type: typeof BROKERAGE_API_GET_ERROR;
  payload: BrokerageGetFailurePayload;
};

// realtor get
export interface RealtorGetRequest {
  realtor: ICommon[];
}
export interface RealtorGetSuccessPayload {
  realtor: ICommon[];
}
export interface RealtorGetFailurePayload {
  error: string;
}
export type RealtorGet = {
  type: typeof REALTOR_API_GET;
  payload: RealtorGetRequest;
};
export type RealtorGetSuccess = {
  type: typeof REALTOR_API_GET_SUCCESS;
  payload: RealtorGetSuccessPayload;
};
export type RealtorGetFailure = {
  type: typeof REALTOR_API_GET_ERROR;
  payload: RealtorGetFailurePayload;
};

//account post
export interface AccountPostRequest {
  accountPost: ICommon[];
}
export interface AccountPostSuccessPayload {
  accountPost: ICommon[];
}

export interface AccountPostFailurePayload {
  error: string | null;
}

export type AccountPost = {
  type: typeof ACCOUNT_POST;
  payload: AccountPostRequest;
};

export type AccountPostSuccess = {
  type: typeof ACCOUNT_POST_SUCCESS;
  payload: AccountPostSuccessPayload;
};

export type AccountPostFailure = {
  type: typeof ACCOUNT_POST_ERROR;
  payload: AccountPostFailurePayload;
};

//extra post
export interface ExtraPostRequest {
  extraPost: ICommon[];
}
export interface ExtraPostSuccessPayload {
  extraPost: ICommon[];
}

export interface ExtraPostFailurePayload {
  error: string | null;
}

export type ExtraPost = {
  type: typeof EXTRA_POST;
  payload: ExtraPostRequest;
};

export type ExtraPostSuccess = {
  type: typeof EXTRA_POST_SUCCESS;
  payload: ExtraPostSuccessPayload;
};

export type ExtraPostFailure = {
  type: typeof EXTRA_POST_ERROR;
  payload: ExtraPostFailurePayload;
};

export interface StartWorkflowRequest {
  startWorkflow: ICommon[];
}
export interface StartWorkflowSuccessPayload {
  startWorkflow: ICommon[];
}

export interface StartWorkflowFailurePayload {
  error: string | null;
}

export type StartWorkflow = {
  type: typeof START_WORKFLOW;
  payload: StartWorkflowRequest;
};

export type StartWorkflowSuccess = {
  type: typeof START_WORKFLOW_SUCCESS;
  payload: StartWorkflowSuccessPayload;
};

export type StartWorkflowFailure = {
  type: typeof START_WORKFLOW_ERROR;
  payload: StartWorkflowFailurePayload;
};

export interface NoShowRequest {
  noShow: ICommon[];
}
export interface NoShowSuccessPayload {
  noShow: ICommon[];
}

export interface NoShowFailurePayload {
  error: string | null;
}

export type NoShow = {
  type: typeof NO_SHOW;
  payload: NoShowRequest;
};

export type NoShowSuccess = {
  type: typeof NO_SHOW_SUCCESS;
  payload: NoShowSuccessPayload;
};

export type NoShowFailure = {
  type: typeof NO_SHOW_ERROR;
  payload: NoShowFailurePayload;
};

export interface NoAnswerRequest {
  noAnswer: ICommon[];
}
export interface NoAnswerSuccessPayload {
  noAnswer: ICommon[];
}

export interface NoAnswerFailurePayload {
  error: string | null;
}

export type NoAnswer = {
  type: typeof NO_ANSWER;
  payload: NoAnswerRequest;
};

export type NoAnswerSuccess = {
  type: typeof NO_ANSWER_SUCCESS;
  payload: NoAnswerSuccessPayload;
};

export type NoAnswerFailure = {
  type: typeof NO_ANSWER_ERROR;
  payload: NoAnswerFailurePayload;
};

export interface GetNotesRequest {
  getNotes: ICommon[];
}
export interface GetNotesSuccessPayload {
  getNotes: ICommon[];
}

export interface GetNotesFailurePayload {
  error: string | null;
}

export type GetNotes = {
  type: typeof GET_NOTES;
  payload: GetNotesRequest;
};

export type GetNotesSuccess = {
  type: typeof GET_NOTES_SUCCESS;
  payload: GetNotesSuccessPayload;
};

export type GetNotesFailure = {
  type: typeof GET_NOTES_ERROR;
  payload: GetNotesFailurePayload;
};

export interface AddNotesRequest {
  addNotes: ICommon[];
}
export interface AddNotesSuccessPayload {
  addNotes: ICommon[];
}

export interface AddNotesFailurePayload {
  error: string | null;
}

export type AddNotes = {
  type: typeof ADD_NOTES;
  payload: AddNotesRequest;
};

export type AddNotesSuccess = {
  type: typeof ADD_NOTES_SUCCESS;
  payload: AddNotesSuccessPayload;
};

export type AddNotesFailure = {
  type: typeof ADD_NOTES_ERROR;
  payload: AddNotesFailurePayload;
};

export interface UpdateNotesRequest {
  updateNotes: ICommon[];
}
export interface UpdateNotesSuccessPayload {
  updateNotes: ICommon[];
}

export interface UpdateNotesFailurePayload {
  error: string | null;
}

export type UpdateNotes = {
  type: typeof UPDATE_NOTES;
  payload: UpdateNotesRequest;
};

export type UpdateNotesSuccess = {
  type: typeof UPDATE_NOTES_SUCCESS;
  payload: UpdateNotesSuccessPayload;
};

export type UpdateNotesFailure = {
  type: typeof UPDATE_NOTES_ERROR;
  payload: UpdateNotesFailurePayload;
};

export interface UpdatePrimaryContactRequest {
  updatePrimaryContact: ICommon[];
}
export interface UpdatePrimaryContactSuccessPayload {
  updatePrimaryContact: ICommon[];
}

export interface UpdatePrimaryContactFailurePayload {
  error: string | null;
}

export type UpdatePrimaryContact = {
  type: typeof UPDATE_PRIMARY_CONTACT;
  payload: UpdatePrimaryContactRequest;
};

export type UpdatePrimaryContactSuccess = {
  type: typeof UPDATE_PRIMARY_CONTACT_SUCCESS;
  payload: UpdatePrimaryContactSuccessPayload;
};

export type UpdatePrimaryContactFailure = {
  type: typeof UPDATE_PRIMARY_CONTACT_ERROR;
  payload: UpdatePrimaryContactFailurePayload;
};

export interface UpdateOrderRemarkRequest {
  updateOrderRemark: ICommon[];
}
export interface UpdateOrderRemarkSuccessPayload {
  updateOrderRemark: ICommon[];
}

export interface UpdateOrderRemarkFailurePayload {
  error: string | null;
}

export type UpdateOrderRemark = {
  type: typeof UPDATE_ORDER_REMARK;
  payload: UpdateOrderRemarkRequest;
};

export type UpdateOrderRemarkSuccess = {
  type: typeof UPDATE_ORDER_REMARK_SUCCESS;
  payload: UpdateOrderRemarkSuccessPayload;
};

export type UpdateOrderRemarkFailure = {
  type: typeof UPDATE_ORDER_REMARK_ERROR;
  payload: UpdateOrderRemarkFailurePayload;
};

export interface PostSkipServiceRequest {
  postSkipService: ICommon[];
}
export interface PostSkipServiceSuccessPayload {
  postSkipService: ICommon[];
}

export interface PostSkipServiceFailurePayload {
  error: string | null;
}

export type PostSkipService = {
  type: typeof POST_SKIP_SERVICE;
  payload: PostSkipServiceRequest;
};

export type PostSkipServiceSuccess = {
  type: typeof POST_SKIP_SERVICE_SUCCESS;
  payload: PostSkipServiceSuccessPayload;
};

export type PostSkipServiceFailure = {
  type: typeof POST_SKIP_SERVICE_ERROR;
  payload: PostSkipServiceFailurePayload;
};

export interface GetSkipServiceRequest {
  getSkipService: ICommon[];
}
export interface GetSkipServiceSuccessPayload {
  getSkipService: ICommon[];
}

export interface GetSkipServiceFailurePayload {
  error: string | null;
}

export type GetSkipService = {
  type: typeof GET_SKIP_SERVICE;
  payload: GetSkipServiceRequest;
};

export type GetSkipServiceSuccess = {
  type: typeof GET_SKIP_SERVICE_SUCCESS;
  payload: GetSkipServiceSuccessPayload;
};

export type GetSkipServiceFailure = {
  type: typeof GET_SKIP_SERVICE_ERROR;
  payload: GetSkipServiceFailurePayload;
};

export type CommonActions =
  | MoveGet
  | MoveGetSuccess
  | MoveGetFailure
  | MoveAddress
  | MoveAddressSuccess
  | MoveAddressFailure
  | UpdateMoveSourceHomeInfo
  | UpdateMoveSourceHomeInfoSuccess
  | UpdateMoveSourceHomeInfoFailure
  | UpdateMoveDestinationHomeInfo
  | UpdateMoveDestinationHomeInfoSuccess
  | UpdateMoveDestinationHomeInfoFailure
  | ScriptGet
  | ScriptGetSuccess
  | ScriptGetFailure
  | MoveWithHashCode
  | MoveWithHashCodeSuccess
  | MoveWithHashCodeFailure
  | AppointmentPost
  | AppointmentPostSuccess
  | AppointmentPostFailure
  | UserGet
  | UserGetFailure
  | UserGetSuccess
  | OrderGet
  | OrderGetFailure
  | OrderGetSuccess
  | BrokerageGet
  | BrokerageGetFailure
  | BrokerageGetSuccess
  | RealtorGet
  | RealtorGetFailure
  | RealtorGetSuccess
  | AccountPost
  | AccountPostFailure
  | AccountPostSuccess
  | ExtraPost
  | ExtraPostFailure
  | ExtraPostSuccess
  | StartWorkflow
  | StartWorkflowFailure
  | StartWorkflowSuccess
  | NoShow
  | NoShowFailure
  | NoShowSuccess
  | NoAnswer
  | NoAnswerFailure
  | NoAnswerSuccess
  | GetNotes
  | GetNotesFailure
  | GetNotesSuccess
  | AddNotes
  | AddNotesFailure
  | AddNotesSuccess
  | UpdateNotes
  | UpdateNotesFailure
  | UpdateNotesSuccess
  | UpdatePrimaryContact
  | UpdatePrimaryContactFailure
  | UpdatePrimaryContactSuccess
  | UpdateOrderRemark
  | UpdateOrderRemarkFailure
  | UpdateOrderRemarkSuccess
  | PostSkipService
  | PostSkipServiceFailure
  | PostSkipServiceSuccess
  | GetSkipService
  | GetSkipServiceFailure
  | GetSkipServiceSuccess;
