import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { logger } from "redux-logger";

import clientReducer from "./reducers/clientReducer.js";
import productReducer from "./reducers/productReducer.js";
import shoppingCartReducer from "./reducers/shoppingCartReducer.js";

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(thunk, logger)
      )
    : applyMiddleware(thunk, logger)
);

export default store;