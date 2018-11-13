import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root-reducer';

// import SongbookContainer from './containers/SongbookContainer';
import SongsheetContainer from './containers/SongsheetContainer';

import './main.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <SongsheetContainer />
  </Provider>,
  document.getElementById('app')
);
