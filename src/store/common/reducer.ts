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
  USER_API_GET_SUCCESS,
  USER_API_GET_ERROR,
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
  ACCOUNT_POST_SUCCESS,
  ACCOUNT_POST_ERROR,
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

import { CommonActions, CommonState } from "./types";

const initialState: CommonState = {
  move: [],
  isGetMove: false,
  error: null,
  moveAddressUpdate: [],
  isMoveAddressUpdate: false,
  updateMoveSourceHomeInfo: [],
  isSourceDetailsUpdated: false,
  updateMoveDestinationHomeInfo: [],
  isDestinationDetailsUpdated: false,
  script: [],
  scriptDataArrived: false,
  moveWithHashCode: [],
  isMoveWithHashCode: false,
  appointmentPost: [],
  isAppointmentPost: false,
  user: [],
  userDataArrived: false,
  order: [],
  orderDataArrived: false,
  isBrokerageDataArrived: false,
  brokerage: [],
  realtor: [],
  isRealtorDataArrived: false,
  accountPost: [],
  isAccountPost: false,
  extraPost: [],
  isExtraPost: false,
  startWorkflow: [],
  isStartWorkflow: false,
  noShow: [],
  isNoShow: false,
  noAnswer: [],
  isNoAnswer: false,
  getNotes: [],
  isGetNotes: false,
  addNotes: [],
  isAddNotes: false,
  updateNotes: [],
  isUpdateNotes: false,
  updatePrimaryContact: [],
  isUpdatePrimaryContact: false,
  updateOrderRemark: [],
  isUpdateOrderRemark: false,
  postSkipService: [],
  isPostSkipService: false,
  getSkipService: [],
  isGetSkipService: false,
};

export default (state = initialState, action: CommonActions) => {
  switch (action.type) {
    case MOVE_API_GET:
      return {
        ...state,
        move: [],
        isGetMove: false,
        error: null,
      };
    case MOVE_API_GET_SUCCESS:
      return {
        ...state,
        move: action.payload.move,
        isGetMove: true,
        error: null,
      };
    case MOVE_API_GET_ERROR:
      return {
        ...state,
        move: [],
        isGetMove: false,
        error: action.payload.error,
      };

    case MOVE_ADDRESS_UPDATE:
      return {
        ...state,
        moveAddressUpdate: [],
        isMoveAddressUpdate: false,
        error: null,
      };
    case MOVE_ADDRESS_UPDATE_SUCCESS:
      return {
        ...state,
        moveAddressUpdate: action.payload.moveAddressUpdate,
        isMoveAddressUpdate: true,
        error: null,
      };
    case MOVE_ADDRESS_UPDATE_ERROR:
      return {
        ...state,
        moveAddressUpdate: [],
        isMoveAddressUpdate: false,
        error: action.payload.error,
      };

    case UPDATE_MOVE_SOURCE_HOME_INFORMATION:
      return {
        ...state,
        updateMoveSourceHomeInfo: [],
        isSourceDetailsUpdated: false,
        error: null,
      };
    case UPDATE_MOVE_SOURCE_HOME_INFORMATION_SUCCESS:
      return {
        ...state,
        updateMoveSourceHomeInfo: action.payload.updateMoveSourceHomeInfo,
        isSourceDetailsUpdated: true,
        error: null,
      };
    case UPDATE_MOVE_SOURCE_HOME_INFORMATION_ERROR:
      return {
        ...state,
        updateMoveSourceHomeInfo: [],
        isSourceDetailsUpdated: false,
        error: action.payload.error,
      };
    case UPDATE_MOVE_DESTINATION_HOME_INFORMATION:
      return {
        ...state,
        updateMoveDestinationHomeInfo: [],
        isDestinationDetailsUpdated: false,
        error: null,
      };
    case UPDATE_MOVE_DESTINATION_HOME_INFORMATION_SUCCESS:
      return {
        ...state,
        updateMoveDestinationHomeInfo:
          action.payload.updateMoveDestinationHomeInfo,
        isDestinationDetailsUpdated: true,
        error: null,
      };
    case UPDATE_MOVE_DESTINATION_HOME_INFORMATION_ERROR:
      return {
        ...state,
        updateMoveDestinationHomeInfo: [],
        isDestinationDetailsUpdated: false,
        error: action.payload.error,
      };

    case SCRIPT_API_GET:
      return {
        ...state,
        script: [],
        error: null,
        scriptDataArrived: false,
      };
    case SCRIPT_API_GET_SUCCESS:
      return {
        ...state,
        script: action.payload.script,
        error: null,
        scriptDataArrived: true,
      };
    case SCRIPT_API_GET_ERROR:
      return {
        ...state,
        script: [],
        error: action.payload.error,
        scriptDataArrived: false,
      };

    case MOVE_API_GET_WITH_HASHCODE:
      return {
        ...state,
        moveWithHashCode: [],
        error: null,
        isMoveWithHashCode: false,
      };
    case MOVE_API_GET_WITH_HASHCODE_SUCCESS:
      return {
        ...state,
        moveWithHashCode: action.payload.moveWithHashCode,
        error: null,
        isMoveWithHashCode: true,
      };
    case MOVE_API_GET_WITH_HASHCODE_ERROR:
      return {
        ...state,
        moveWithHashCode: [],
        error: action.payload.error,
        isMoveWithHashCode: false,
      };

    case APPOINTMENTS_POST:
      return {
        ...state,
        appointmentPost: [],
        isAppointmentPost: false,
        error: null,
      };
    case APPOINTMENTS_POST_SUCCESS:
      return {
        ...state,
        appointmentPost: action.payload.appointmentPost,
        isAppointmentPost: true,
        error: null,
      };
    case APPOINTMENTS_POST_ERROR:
      return {
        ...state,
        appointmentPost: [],
        isAppointmentPost: false,
        error: action.payload.errorAppointmentPost,
      };

    case USER_API_GET:
      return {
        ...state,
        user: [],
        error: null,
        userDataArrived: false,
      };
    case USER_API_GET_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: null,
        userDataArrived: true,
      };
    case USER_API_GET_ERROR:
      return {
        ...state,
        user: [],
        error: action.payload.error,
        userDataArrived: false,
      };

    case ORDER_API_GET:
      return {
        ...state,
        order: [],
        error: null,
        orderDataArrived: false,
      };
    case ORDER_API_GET_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        error: null,
        orderDataArrived: true,
      };
    case ORDER_API_GET_ERROR:
      return {
        ...state,
        order: [],
        error: action.payload.error,
        orderDataArrived: false,
      };
    case BROKERAGE_API_GET:
      return {
        ...state,
        brokerage: [],
        error: null,
        brokerageDataArrived: false,
      };
    case BROKERAGE_API_GET_SUCCESS:
      return {
        ...state,
        brokerage: action.payload.brokerage,
        error: null,
        brokerageDataArrived: true,
      };
    case BROKERAGE_API_GET_ERROR:
      return {
        ...state,
        brokerage: [],
        error: action.payload.error,
        brokerageDataArrived: false,
      };
    case REALTOR_API_GET:
      return {
        ...state,
        realtor: [],
        error: null,
        realtorDataArrived: false,
      };
    case REALTOR_API_GET_SUCCESS:
      return {
        ...state,
        realtor: action.payload.realtor,
        error: null,
        realtorDataArrived: true,
      };
    case REALTOR_API_GET_ERROR:
      return {
        ...state,
        realtor: [],
        error: action.payload.error,
        realtorDataArrived: false,
      };

    case ACCOUNT_POST:
      return {
        ...state,
        accountPost: [],
        isAccountPost: false,
        error: null,
      };
    case ACCOUNT_POST_SUCCESS:
      return {
        ...state,
        accountPost: action.payload.accountPost,
        isAccountPost: true,
        error: null,
      };
    case ACCOUNT_POST_ERROR:
      return {
        ...state,
        accountPost: [],
        isAccountPost: false,
        error: action.payload.error,
      };

    case EXTRA_POST:
      return {
        ...state,
        extraPost: [],
        isExtraPost: false,
        error: null,
      };
    case EXTRA_POST_SUCCESS:
      return {
        ...state,
        extraPost: action.payload.extraPost,
        isExtraPost: true,
        error: null,
      };
    case EXTRA_POST_ERROR:
      return {
        ...state,
        extraPost: [],
        isExtraPost: false,
        error: action.payload.error,
      };

    case START_WORKFLOW:
      return {
        ...state,
        startWorkflow: [],
        isStartWorkflow: false,
        error: null,
      };
    case START_WORKFLOW_SUCCESS:
      return {
        ...state,
        startWorkflow: action.payload.startWorkflow,
        isStartWorkflow: true,
        error: null,
      };
    case START_WORKFLOW_ERROR:
      return {
        ...state,
        startWorkflow: [],
        isStartWorkflow: false,
        error: action.payload.error,
      };

    case NO_SHOW:
      return {
        ...state,
        noShow: [],
        isNoShow: false,
        error: null,
      };
    case NO_SHOW_SUCCESS:
      return {
        ...state,
        noShow: action.payload.noShow,
        isNoShow: true,
        error: null,
      };
    case NO_SHOW_ERROR:
      return {
        ...state,
        noShow: [],
        isNoShow: false,
        error: action.payload.error,
      };
    case NO_ANSWER:
      return {
        ...state,
        noAnswer: [],
        isNoAnswer: false,
        error: null,
      };
    case NO_ANSWER_SUCCESS:
      return {
        ...state,
        noAnswer: action.payload.noAnswer,
        isNoAnswer: true,
        error: null,
      };
    case NO_ANSWER_ERROR:
      return {
        ...state,
        noAnswer: [],
        isNoAnswer: false,
        error: action.payload.error,
      };
    case GET_NOTES:
      return {
        ...state,
        getNotes: [],
        isGetNotes: false,
        error: null,
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        getNotes: action.payload.getNotes,
        isGetNotes: true,
        error: null,
      };
    case GET_NOTES_ERROR:
      return {
        ...state,
        getNotes: [],
        isGetNotes: false,
        error: action.payload.error,
      };

    case ADD_NOTES:
      return {
        ...state,
        addNotes: [],
        isAddNotes: false,
        error: null,
      };
    case ADD_NOTES_SUCCESS:
      return {
        ...state,
        addNotes: action.payload.addNotes,
        isAddNotes: true,
        error: null,
      };
    case ADD_NOTES_ERROR:
      return {
        ...state,
        addNotes: [],
        isAddNotes: false,
        error: action.payload.error,
      };
    case UPDATE_NOTES:
      return {
        ...state,
        updateNotes: [],
        isUpdateNotes: false,
        error: null,
      };
    case UPDATE_NOTES_SUCCESS:
      return {
        ...state,
        updateNotes: action.payload.updateNotes,
        isUpdateNotes: true,
        error: null,
      };
    case UPDATE_NOTES_ERROR:
      return {
        ...state,
        updateNotes: [],
        isUpdateNotes: false,
        error: action.payload.error,
      };
    case UPDATE_PRIMARY_CONTACT:
      return {
        ...state,
        updatePrimaryContact: [],
        isUpdatePrimaryContact: false,
        error: null,
      };
    case UPDATE_PRIMARY_CONTACT_SUCCESS:
      return {
        ...state,
        updatePrimaryContact: action.payload.updatePrimaryContact,
        isUpdatePrimaryContact: true,
        error: null,
      };
    case UPDATE_PRIMARY_CONTACT_ERROR:
      return {
        ...state,
        updatePrimaryContact: [],
        isUpdatePrimaryContact: false,
        error: action.payload.error,
      };
    case UPDATE_ORDER_REMARK:
      return {
        ...state,
        updateOrderRemark: [],
        isUpdateOrderRemark: false,
        error: null,
      };
    case UPDATE_ORDER_REMARK_SUCCESS:
      return {
        ...state,
        updateOrderRemark: action.payload.updateOrderRemark,
        isUpdateOrderRemark: true,
        error: null,
      };
    case UPDATE_ORDER_REMARK_ERROR:
      return {
        ...state,
        updateOrderRemark: [],
        isUpdateOrderRemark: false,
        error: action.payload.error,
      };
    case POST_SKIP_SERVICE:
      return {
        ...state,
        postSkipService: [],
        isPostSkipService: false,
        error: null,
      };
    case POST_SKIP_SERVICE_SUCCESS:
      return {
        ...state,
        postSkipService: action.payload.postSkipService,
        isPostSkipService: true,
        error: null,
      };
    case POST_SKIP_SERVICE_ERROR:
      return {
        ...state,
        postSkipService: [],
        isPostSkipService: false,
        error: action.payload.error,
      };
    case GET_SKIP_SERVICE:
      return {
        ...state,
        getSkipService: [],
        isGetSkipService: false,
        error: null,
      };
    case GET_SKIP_SERVICE_SUCCESS:
      return {
        ...state,
        getSkipService: action.payload.getSkipService,
        isGetSkipService: true,
        error: null,
      };
    case GET_SKIP_SERVICE_ERROR:
      return {
        ...state,
        getSkipService: [],
        isGetSkipService: false,
        error: action.payload.error,
      };

    default:
      return {
        ...state,
      };
  }
};
