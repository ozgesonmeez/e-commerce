import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CARD_LIST,
  SET_ORDERS,
} from "../actions/clientActions.js";

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  orders: [],
  theme: "",
  language: "",
};

function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

      case SET_ADDRESS_LIST:
  return {
    ...state,
    addressList: action.payload,
  };

  case SET_ORDERS:
  return {
    ...state,
    orders: action.payload,
  };

  case SET_CARD_LIST:
  return {
    ...state,
    creditCards: action.payload,
  };

    default:
      return state;
  }
}

export default clientReducer;