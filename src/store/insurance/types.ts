import {
  UPDATE_MOVE_PERSONAL_INFO,
  UPDATE_MOVE_PERSONAL_INFO_ERROR,
  UPDATE_MOVE_PERSONAL_INFO_SUCCESS,
  UPDATE_MOVE_PROPERTY_INFO,
  UPDATE_MOVE_PROPERTY_INFO_ERROR,
  UPDATE_MOVE_PROPERTY_INFO_SUCCESS,
  INSURANCE_APPOINTMENTS,
  INSURANCE_APPOINTMENTS_ERROR,
  INSURANCE_APPOINTMENTS_SUCCESS,
  INSURANCE_APPOINTMENTS_GET,
  INSURANCE_APPOINTMENTS_GET_ERROR,
  INSURANCE_APPOINTMENTS_GET_SUCCESS,
  INSURANCE_QUOTE,
  INSURANCE_QUOTE_ERROR,
  INSURANCE_QUOTE_SUCCESS,
  INSURANCE_QUOTE_LIST,
  INSURANCE_QUOTE_LIST_ERROR,
  INSURANCE_QUOTE_LIST_SUCCESS,
  GET_BROKERAGE_INSURANCE,
  GET_BROKERAGE_INSURANCE_ERROR,
  GET_BROKERAGE_INSURANCE_SUCCESS,
} from "./actionTypes";

export interface IInsurance {
  quote: any;
  quoteList: any;
  updatePersonal: any;
  updateProperty: any;
  appointment: any;
  appointmentGet: any;
  getBrokerageInsurance: any;
}

export interface InsuranceState {
  quote: IInsurance[];
  isQuote: boolean;
  errorQuote: string | null;
  quoteList: IInsurance[];
  isQuoteList: boolean;
  errorQuoteList: string | null;
  updatePersonal: IInsurance[];
  isUpdatePersonal: boolean;
  errorUpdatePersonal: string | null;
  updateProperty: IInsurance[];
  isUpdateProperty: boolean;
  errorUpdateProperty: string | null;
  appointment: IInsurance[];
  isAppointment: boolean;
  errorAppointment: string | null;
  appointmentGet: IInsurance[];
  isAppointmentGet: boolean;
  errorAppointmentGet: string | null;
  getBrokerageInsurance: IInsurance[];
  isGetBrokerageInsurance: boolean;
  errorGetBrokerageInsurance: string | null;
}

//quote
export interface InsuranceQuoteSuccessPayload {
  quote: IInsurance[];
}

export interface InsuranceQuoteFailurePayload {
  errorQuote: string;
}

export type InsuranceQuote = {
  type: typeof INSURANCE_QUOTE;
};

export type InsuranceQuoteSuccess = {
  type: typeof INSURANCE_QUOTE_SUCCESS;
  payload: InsuranceQuoteSuccessPayload;
};

export type InsuranceQuoteFailure = {
  type: typeof INSURANCE_QUOTE_ERROR;
  payload: InsuranceQuoteFailurePayload;
};

// quoteList
// export interface InsuarnceQuoteListRequest { }

export interface InsuarnceQuoteListSuccessPayload {
  quoteList: IInsurance[];
}

export interface InsuarnceQuoteListFailurePayload {
  errorQuoteList: string;
}

export type InsuarnceQuoteList = {
  type: typeof INSURANCE_QUOTE_LIST;
  // payload: InsuarnceQuoteListRequest;
};

export type InsuarnceQuoteListSuccess = {
  type: typeof INSURANCE_QUOTE_LIST_SUCCESS;
  payload: InsuarnceQuoteListSuccessPayload;
};

export type InsuarnceQuoteListFailure = {
  type: typeof INSURANCE_QUOTE_LIST_ERROR;
  payload: InsuarnceQuoteListFailurePayload;
};

// update property

export interface UpdatePropertyRequest {
  move_id: string | number | null;
  payload: {
    heating_type: string | null;
    roof_material_type: string | null;
    pool_type: string | null;
    year_built: number | string | null;
    total_area_sq_ft: number | string | null;
    stories: number | string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zip_code: number | string | null;
  };
}

export interface UpdatePropertySuccessPayload {
  updateProperty: IInsurance[];
}

export interface UpdatePropertyFailurePayload {
  errorUpdateProperty: string | null;
}

export type UpdateProperty = {
  type: typeof UPDATE_MOVE_PROPERTY_INFO;
  payload: UpdatePropertyRequest;
};

export type UpdatePropertySuccess = {
  type: typeof UPDATE_MOVE_PROPERTY_INFO_SUCCESS;
  payload: UpdatePropertySuccessPayload;
};

export type UpdatePropertyFailure = {
  type: typeof UPDATE_MOVE_PROPERTY_INFO_ERROR;
  payload: UpdatePropertyFailurePayload;
};

// update personal

export interface UpdatePersonalRequest {
  move_id: string | number | null;
  payload: {
    gender: string | null;
    marital_status: string | null;
    occupation: string | null;
    career_status: string | null;
    is_secondary_holder_exist: boolean | null;
    secondary_holder_first_name: string | null;
    secondary_holder_last_name: string | null;
    spouse_gender: string | null;
    accepted_terms: boolean | null;
    date_of_birth: Date | null;
  };
}

export interface UpdatePersonalSuccessPayload {
  updatePersonal: IInsurance[];
}

export interface UpdatePersonalFailurePayload {
  errorUpdatePersonal: string | null;
}

export type UpdatePersonal = {
  type: typeof UPDATE_MOVE_PERSONAL_INFO;
  payload: UpdatePersonalRequest;
};

export type UpdatePersonalSuccess = {
  type: typeof UPDATE_MOVE_PERSONAL_INFO_SUCCESS;
  payload: UpdatePersonalSuccessPayload;
};

export type UpdatePersonalFailure = {
  type: typeof UPDATE_MOVE_PERSONAL_INFO_ERROR;
  payload: UpdatePersonalFailurePayload;
};

// insurance appointment

export interface InsuaranceAppointmentRequest {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | number | null;
  zip_code: string | number | null;
  selected_date: Date | null;
  selected_Time: Date | null;
  quote_id: string | number | null;
  trusted_url: string | null;
}

export interface InsuaranceAppointmentSuccessPayload {
  appointment: IInsurance[];
}

export interface InsuaranceAppointmentFailurePayload {
  errorAppointment: string | null;
}

export type InsuaranceAppointment = {
  type: typeof INSURANCE_APPOINTMENTS;
  payload: InsuaranceAppointmentRequest;
};

export type InsuaranceAppointmentSuccess = {
  type: typeof INSURANCE_APPOINTMENTS_SUCCESS;
  payload: InsuaranceAppointmentSuccessPayload;
};

export type InsuaranceAppointmentFailure = {
  type: typeof INSURANCE_APPOINTMENTS_ERROR;
  payload: InsuaranceAppointmentFailurePayload;
};

//appointment get

export interface InsuaranceAppointmentGetSuccessPayload {
  appointmentGet: IInsurance[];
}

export interface InsuaranceAppointmentGetFailurePayload {
  errorAppointmentGet: string | null;
}

export type InsuaranceAppointmentGet = {
  type: typeof INSURANCE_APPOINTMENTS_GET;
};

export type InsuaranceAppointmentGetSuccess = {
  type: typeof INSURANCE_APPOINTMENTS_GET_SUCCESS;
  payload: InsuaranceAppointmentGetSuccessPayload;
};

export type InsuaranceAppointmentGetFailure = {
  type: typeof INSURANCE_APPOINTMENTS_GET_ERROR;
  payload: InsuaranceAppointmentGetFailurePayload;
};

//brokergae insurance get
export interface GetBrokerageInsuranceRequest {
  getBrokerageInsurance: IInsurance[];
}
export interface GetBrokerageInsuranceSuccessPayload {
  getBrokerageInsurance: IInsurance[];
}

export interface GetBrokerageInsuranceFailurePayload {
  errorGetBrokerageInsurance: string | null;
}

export type GetBrokerageInsurance = {
  type: typeof GET_BROKERAGE_INSURANCE;
  payload: GetBrokerageInsuranceRequest;
};

export type GetBrokerageInsuranceSuccess = {
  type: typeof GET_BROKERAGE_INSURANCE_SUCCESS;
  payload: GetBrokerageInsuranceSuccessPayload;
};

export type GetBrokerageInsuranceFailure = {
  type: typeof GET_BROKERAGE_INSURANCE_ERROR;
  payload: GetBrokerageInsuranceFailurePayload;
};

export type InsuranceActions =
  | InsuaranceAppointment
  | InsuaranceAppointmentSuccess
  | InsuaranceAppointmentFailure
  | InsuarnceQuoteList
  | InsuarnceQuoteListSuccess
  | InsuarnceQuoteListFailure
  | InsuranceQuote
  | InsuranceQuoteSuccess
  | InsuranceQuoteFailure
  | UpdatePersonal
  | UpdatePersonalFailure
  | UpdatePersonalSuccess
  | UpdateProperty
  | UpdatePropertyFailure
  | UpdatePropertySuccess
  | InsuaranceAppointmentGet
  | InsuaranceAppointmentGetSuccess
  | InsuaranceAppointmentGetFailure
  | GetBrokerageInsurance
  | GetBrokerageInsuranceSuccess
  | GetBrokerageInsuranceFailure;
