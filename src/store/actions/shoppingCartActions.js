import api from "../../api/api.js";

export const SET_CART = "SET_CART";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const CLEAR_FAVORITES = "CLEAR_FAVORITES";

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

export const addFavorite = (product) => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});

export const removeFavorite = (productId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: productId,
});

export const clearFavorites = () => ({
  type: CLEAR_FAVORITES,
});

export const clearCart = () => {
  return (dispatch) => {
    dispatch(setCart([]));
  };
};

export const toggleFavorite = (product) => {
  return (dispatch, getState) => {
    const favorites = getState().shoppingCart.favorites || [];
    const isFavorite = favorites.some((item) => item.id === product.id);

    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };
};

export const addToCart = (product, quantity = 1) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart || [];

    const safeQuantity =
      Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

    const existingItem = cart.find(
      (item) => item.product.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              count: item.count + safeQuantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          count: safeQuantity,
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
    const cart = getState().shoppingCart.cart || [];

    const updatedCart = cart.map((item) => {
      if (item.product.id !== productId) {
        return item;
      }

      const stock = Number(item.product.stock);

      if (Number.isFinite(stock) && item.count >= stock) {
        return item;
      }

      return {
        ...item,
        count: item.count + 1,
      };
    });

    dispatch(setCart(updatedCart));
  };
};

export const decreaseCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart || [];

    const updatedCart = cart
      .map((item) =>
        item.product.id === productId
          ? { ...item, count: item.count - 1 }
          : item
      )
      .filter((item) => item.count > 0);

    dispatch(setCart(updatedCart));
  };
};

export const removeCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart || [];

    const updatedCart = cart.filter(
      (item) => item.product.id !== productId
    );

    dispatch(setCart(updatedCart));
  };
};

export const toggleCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart || [];

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