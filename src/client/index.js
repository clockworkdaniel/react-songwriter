import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { install } from 'redux-loop';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root-reducer';

import LayoutContainer from './components/Layout/LayoutContainer';

import './main.scss';

const enhancer = compose(
  install(),
  applyMiddleware(thunk, logger)
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <LayoutContainer />
  </Provider>,
  document.getElementById('app')
);
