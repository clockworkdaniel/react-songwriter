import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root-reducer';

import Layout from './components/Layout/Layout';

import './main.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('app')
);
