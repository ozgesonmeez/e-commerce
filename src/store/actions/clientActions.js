import api from "../../api/api.js";

export const SET_USER = "SET_USER";
export const SET_ROLES = "SET_ROLES";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_ADDRESS_LIST = "SET_ADDRESS_LIST";
export const SET_CARD_LIST = "SET_CARD_LIST";
export const SET_ORDERS = "SET_ORDERS";

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

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const setCardList = (cardList) => ({
  type: SET_CARD_LIST,
  payload: cardList,
});

export const fetchRoles = () => {
  return async (dispatch, getState) => {
    const roles = getState().client.roles || [];

    if (roles.length > 0) {
      return roles;
    }

    try {
      const response = await api.get("/roles");

      dispatch(setRoles(response.data));

      return response.data;
    } catch (error) {
      console.error("Fetch roles error:", error);
      throw error;
    }
  };
};

export const loginUser = (formData, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/auth/login", formData);

      const { token, user } = response.data;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }

      dispatch(setUser(user));

      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(setUser({}));
      return;
    }

    try {
      const response = await api.get("/auth/verify");

      const renewedToken = response.data.token;
      const user = response.data.user;

      localStorage.setItem("token", renewedToken);
      dispatch(setUser(user));

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(setUser({}));

      console.error(
        "Token verification failed:",
        error.response?.data || error
      );
    }
  };
};

export const fetchAddressList = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/user/address");

      dispatch(setAddressList(response.data));

      return response.data;
    } catch (error) {
      console.error("Fetch address error:", error);
      throw error;
    }
  };
};

export const addAddress = (addressData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/user/address", addressData);

      await dispatch(fetchAddressList());

      return response.data;
    } catch (error) {
      console.error("Add address error:", error);
      throw error;
    }
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/user/address/${addressId}`);

      await dispatch(fetchAddressList());
    } catch (error) {
      console.error("Delete address error:", error);
      throw error;
    }
  };
};

export const updateAddress = (addressData) => {
  return async (dispatch) => {
    try {
      const response = await api.put("/user/address", addressData);

      await dispatch(fetchAddressList());

      return response.data;
    } catch (error) {
      console.error("Update address error:", error);
      throw error;
    }
  };
};

export const fetchCardList = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/user/card");

      dispatch(setCardList(response.data));

      return response.data;
    } catch (error) {
      console.error("Fetch cards error:", error);
      throw error;
    }
  };
};

export const addCard = (cardData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/user/card", cardData);

      await dispatch(fetchCardList());

      return response.data;
    } catch (error) {
      console.error("Add card error:", error);
      throw error;
    }
  };
};

export const deleteCard = (cardId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/user/card/${cardId}`);

      await dispatch(fetchCardList());
    } catch (error) {
      console.error("Delete card error:", error);
      throw error;
    }
  };
};

export const updateCard = (cardData) => {
  return async (dispatch) => {
    try {
      const response = await api.put("/user/card", cardData);

      await dispatch(fetchCardList());

      return response.data;
    } catch (error) {
      console.error("Update card error:", error);
      throw error;
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/order");

      dispatch(setOrders(response.data));

      return response.data;
    } catch (error) {
      console.error("Fetch orders error:", error);
      throw error;
    }
  };
};