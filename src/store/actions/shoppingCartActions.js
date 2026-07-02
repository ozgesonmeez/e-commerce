import api from "../../api/api.js";

export const SET_CART = "SET_CART";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const addToCart = (product) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const existingItem = cart.find(
      (item) => item.product.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          count: 1,
          checked: true,
          product,
        },
      ];
    }

    dispatch(setCart(updatedCart));
  };
};

export const increaseCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const updatedCart = cart.map((item) =>
      item.product.id === productId
        ? { ...item, count: item.count + 1 }
        : item
    );

    dispatch(setCart(updatedCart));
  };
};

export const decreaseCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const updatedCart = cart.map((item) =>
      item.product.id === productId && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    );

    dispatch(setCart(updatedCart));
  };
};

export const removeCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const updatedCart = cart.filter(
      (item) => item.product.id !== productId
    );

    dispatch(setCart(updatedCart));
  };
};

export const toggleCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const updatedCart = cart.map((item) =>
      item.product.id === productId
        ? { ...item, checked: !item.checked }
        : item
    );

    dispatch(setCart(updatedCart));
  };
};

export const completeOrder = (orderData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = token;
    }

    const response = await api.post("/order", orderData);

    dispatch(setCart([]));

    return response.data;
  };
};