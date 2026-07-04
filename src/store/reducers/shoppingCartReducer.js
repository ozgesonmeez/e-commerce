import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
} from "../actions/shoppingCartActions.js";

const getInitialCart = () => {
  const savedCart = localStorage.getItem("cart");

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart);
  } catch {
    localStorage.removeItem("cart");
    return [];
  }
};

const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem("favorites");

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch {
    localStorage.removeItem("favorites");
    return [];
  }
};

const initialState = {
  cart: getInitialCart(),
  favorites: getInitialFavorites(),
  payment: {},
  address: {},
};

function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      localStorage.setItem("cart", JSON.stringify(action.payload));

      return {
        ...state,
        cart: action.payload,
      };
    }

    case ADD_TO_FAVORITES: {
      const isAlreadyFavorite = state.favorites.some(
        (item) => item.id === action.payload.id
      );

      if (isAlreadyFavorite) {
        return state;
      }

      const updatedFavorites = [...state.favorites, action.payload];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        ...state,
        favorites: updatedFavorites,
      };
    }

    case REMOVE_FROM_FAVORITES: {
      const updatedFavorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        ...state,
        favorites: updatedFavorites,
      };
    }

    case CLEAR_FAVORITES: {
      localStorage.setItem("favorites", JSON.stringify([]));

      return {
        ...state,
        favorites: [],
      };
    }

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
}

export default shoppingCartReducer;