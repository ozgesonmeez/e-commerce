import api from "../../api/api.js";
import { FETCH_STATES } from "./globalActions.js";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";
export const SET_SORT = "SET_SORT";
export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
});

export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: product,
});

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/categories");
      dispatch(setCategories(response.data));
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  };
};

export const fetchProducts = (params = {}) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState(FETCH_STATES.FETCHING));

      const queryParams = new URLSearchParams();

      if (params.category) queryParams.append("category", params.category);
      if (params.filter) queryParams.append("filter", params.filter);
      if (params.sort) queryParams.append("sort", params.sort);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.offset !== undefined) queryParams.append("offset", params.offset);

      const queryString = queryParams.toString();
      const url = queryString ? `/products?${queryString}` : "/products";

      const response = await api.get(url);

      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
      dispatch(setFetchState(FETCH_STATES.FETCHED));
    } catch (error) {
      console.error("Fetch products error:", error);
      dispatch(setFetchState(FETCH_STATES.FAILED));
    }
  };
};

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState(FETCH_STATES.FETCHING));

      const response = await api.get(`/products/${productId}`);

      dispatch(setSelectedProduct(response.data));
      dispatch(setFetchState(FETCH_STATES.FETCHED));
    } catch (error) {
      console.error("Fetch product error:", error);
      dispatch(setFetchState(FETCH_STATES.FAILED));
    }
  };
};