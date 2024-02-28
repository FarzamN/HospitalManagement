export const USER_DETAILS = 'USER_DETAILS';
export const ROLE_ID = 'ROLE_ID';
export const OTP = 'OTP';
export const FIRST_SPLASH = 'FIRST_SPLASH';
export const SECOND_SPLASH = 'SECOND_SPLASH';
export const GET_MESSAGES_DATA = 'GET_MESSAGES_DATA';
export const GET_INBOX = 'GET_INBOX';
export const GET_ID = 'GET_ID';
export const STAFF_TYPE = 'STAFF_TYPE';
export const SERVICE_TYPE = 'SERVICE_TYPE';
export const ALL_SHIFT = 'ALL_SHIFT';
export const PERSONAL_SHIFT = 'PERSONAL_SHIFT';
export const GET_BIT_DATA = 'GET_BIT_DATA';
export const STORE_jOB_DETAIL = 'STORE_jOB_DETAIL';
export const UPCOMING_SHIFT = 'UPCOMING_SHIFT';
export const PENDING_SHIFT = 'PENDING_SHIFT';
export const COMPLETED_SHIFT = 'COMPLETED_SHIFT';

export const USER_DASHBOARD = 'USER_DASHBOARD';

export const OTHERS_BITS = 'OTHERS_BITS';
export const USER_PROFILE = 'USER_PROFILE';
export const CHAT_PROFILE = 'CHAT_PROFILE';
export const SINGLE_SHIFT = 'SINGLE_SHIFT';
export const FACILITY_STATUS = 'FACILITY_STATUS';
export const RECENT_BITS = 'RECENT_BITS';
export const NOTIFICATION = 'NOTIFICATION';
export const NOTIFICATION_COUNT = 'NOTIFICATION_COUNT';
export const CHAT_COUNT = 'CHAT_COUNT';
export const TODAYS_SHIFT = 'TODAYS_SHIFT';
export const ALL_USERS = 'ALL_USERS';
export const ALL_COUNTRY_DATA = 'ALL_COUNTRY_DATA';
export const FAV_JOB = 'FAV_JOB';
export const ALL_CHECK = 'ALL_CHECK';
export const MANAGE_STAFF = 'MANAGE_STAFF';
export const ALL_INVOICE = 'ALL_INVOICE';
export const GRAPH_DATA = 'GRAPH_DATA';
export const GET_SERVICE = 'GET_SERVICE';
export const GET_ADMIN_ROLE = 'GET_ADMIN_ROLE';
export const SINGLE_INVOICE_DATA = 'SINGLE_INVOICE_DATA';
export const GET_TERMS_DATA = 'GET_TERMS_DATA';
export const GET_FACILITY_ONGOING = 'GET_FACILITY_ONGOING';

const initial_state = {
  userDetails: null,
  role_id: null,
  otp: null,
  get_id: null,
  first_splash: null,
  second_splash: null,
  get_messages_data: [],
  get_inbox: [],
  staff_type: [],
  service_type: [],
  all_shift: [],
  personal_shift: [],
  get_bit_data: [],
  store_job_detail: [],
  get_upcoming_shift: [],
  get_pending_shift: [],
  get_completed_shift: [],

  get_user_dashboard: {},

  get_others_bits: [],
  get_user_profile: {},
  get_single_shift: {},
  facility_status: 'Pending',
  chat_profile: {},
  get_recent_bits: [],
  notification: [],
  notification_count: 0,
  chat_count: 0,
  get_todays_shift: [],
  get_all_users: [],
  get_all_country_data: [],
  get_fav_job: [],
  get_all_check: [],
  get_manage_staff: [],
  get_all_invoice: [],
  graph_data: [],
  get_service_data: [],
  get_admin_role: [],
  single_invoice_data: {},
  get_terms_data: {},
  get_facility_ongoing: [],
};

const holderReducer = (state = initial_state, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case ROLE_ID:
      return {
        ...state,
        role_id: action.payload,
      };
    case GET_TERMS_DATA:
      return {
        ...state,
        get_terms_data: action.payload,
      };
    case OTP:
      return {
        ...state,
        otp: action.payload,
      };
    case GET_ID:
      return {
        ...state,
        get_id: action.payload,
      };
    case FIRST_SPLASH:
      return {
        ...state,
        first_splash: action.payload,
      };
    case SECOND_SPLASH:
      return {
        ...state,
        second_splash: action.payload,
      };

    case GET_MESSAGES_DATA:
      return {
        ...state,
        get_messages_data: action.payload,
      };
    case GET_INBOX:
      return {
        ...state,
        get_inbox: action.payload,
      };
    case STAFF_TYPE:
      return {
        ...state,
        staff_type: action.payload,
      };
    case SERVICE_TYPE:
      return {
        ...state,
        service_type: action.payload,
      };
    case ALL_SHIFT:
      return {
        ...state,
        all_shift: action.payload,
      };
    case PERSONAL_SHIFT:
      return {
        ...state,
        personal_shift: action.payload,
      };
    case GET_BIT_DATA:
      return {
        ...state,
        get_bit_data: action.payload,
      };
    case STORE_jOB_DETAIL:
      return {
        ...state,
        store_job_detail: action.payload(state),
      };
    case UPCOMING_SHIFT:
      return {
        ...state,
        get_upcoming_shift: action.payload,
      };
    case PENDING_SHIFT:
      return {
        ...state,
        get_pending_shift: action.payload,
      };
    case COMPLETED_SHIFT:
      return {
        ...state,
        get_completed_shift: action.payload,
      };

    case USER_DASHBOARD:
      return {
        ...state,
        get_user_dashboard: action.payload,
      };

    case OTHERS_BITS:
      return {
        ...state,
        get_others_bits: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        get_user_profile: action.payload,
      };
    case SINGLE_SHIFT:
      return {
        ...state,
        get_single_shift: action.payload,
      };
    case FACILITY_STATUS:
      return {
        ...state,
        facility_status: action.payload,
      };
    case CHAT_PROFILE:
      return {
        ...state,
        chat_profile: action.payload,
      };
    case RECENT_BITS:
      return {
        ...state,
        get_recent_bits: action.payload,
      };
    case NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case NOTIFICATION_COUNT:
      return {
        ...state,
        notification_count: action.payload,
      };
    case CHAT_COUNT:
      return {
        ...state,
        chat_count: action.payload,
      };
    case TODAYS_SHIFT:
      return {
        ...state,
        get_todays_shift: action.payload,
      };
    case ALL_USERS:
      return {
        ...state,
        get_all_users: action.payload,
      };
    case ALL_COUNTRY_DATA:
      return {
        ...state,
        get_all_country_data: action.payload,
      };
    case FAV_JOB:
      return {
        ...state,
        get_fav_job: action.payload,
      };
    case ALL_CHECK:
      return {
        ...state,
        get_all_check: action.payload,
      };
    case MANAGE_STAFF:
      return {
        ...state,
        get_manage_staff: action.payload,
      };
    case ALL_INVOICE:
      return {
        ...state,
        get_all_invoice: action.payload,
      };
    case GRAPH_DATA:
      return {
        ...state,
        graph_data: action.payload,
      };
    case GET_SERVICE:
      return {
        ...state,
        get_service_data: action.payload,
      };
    case GET_ADMIN_ROLE:
      return {
        ...state,
        get_admin_role: action.payload,
      };
    case SINGLE_INVOICE_DATA:
      return {
        ...state,
        single_invoice_data: action.payload,
      };
    case GET_FACILITY_ONGOING:
      return {
        ...state,
        get_facility_ongoing: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default holderReducer;
