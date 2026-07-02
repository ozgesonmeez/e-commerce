import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_SORT,
} from "../actions/productActions.js";
import { FETCH_STATES } from "../actions/globalActions.js";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  fetchState: FETCH_STATES.NOT_FETCHED,
  limit: 25,
  offset: 0,
  filter: "",
  sort: "",
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };

    case SET_TOTAL:
      return { ...state, total: action.payload };

    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };

    case SET_LIMIT:
      return { ...state, limit: action.payload };

    case SET_OFFSET:
      return { ...state, offset: action.payload };

    case SET_FILTER:
      return { ...state, filter: action.payload };

    case SET_SORT:
      return { ...state, sort: action.payload };

    default:
      return state;
  }
}

export default productReducer;