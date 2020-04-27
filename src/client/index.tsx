import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { install, StoreCreator } from "redux-loop";
import logger from "redux-logger";

import rootReducer from "./reducers/root-reducer";

import LayoutContainer from "./components/Layout/LayoutContainer";

import "./main.scss";

const enhancedCreateStore = createStore as StoreCreator;

const enhancer = compose(install(), applyMiddleware(logger));

const store = enhancedCreateStore(rootReducer, undefined, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <LayoutContainer />
  </Provider>,
  document.getElementById("app")
);
