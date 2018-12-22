import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root-reducer';

import LayoutContainer from './components/Layout/LayoutContainer';

import './main.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <LayoutContainer />
  </Provider>,
  document.getElementById('app')
);
