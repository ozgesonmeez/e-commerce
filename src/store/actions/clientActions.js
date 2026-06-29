import api from "../../api/api.js";

export const SET_USER = "SET_USER";
export const SET_ROLES = "SET_ROLES";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";

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

      dispatch(setUser(response.data));

      return response.data;
    } catch (error) {
      throw error;
    }
  };
};