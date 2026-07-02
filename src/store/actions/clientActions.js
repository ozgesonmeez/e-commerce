import api from "../../api/api.js";

export const SET_USER = "SET_USER";
export const SET_ROLES = "SET_ROLES";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_ADDRESS_LIST = "SET_ADDRESS_LIST";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
});

export const fetchRoles = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/roles");
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const loginUser = (formData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/login", formData);

      api.defaults.headers.common["Authorization"] = response.data.token;

      dispatch(setUser(response.data));

      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      api.defaults.headers.common["Authorization"] = token;

      const response = await api.get("/verify");

      dispatch(setUser(response.data));

      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];

      dispatch(setUser(null));
    }
  };
};

export const fetchAddressList = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        api.defaults.headers.common["Authorization"] = token;
      }

      const response = await api.get("/user/address");

      dispatch(setAddressList(response.data));

      return response.data;
    } catch (error) {
      console.error("Fetch address error:", error);
      throw error;
    }
  };
};