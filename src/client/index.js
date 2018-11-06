import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reactSongwriter from './reducers/root-reducer';

import SongbookContainer from './containers/SongbookContainer';
// import SongsheetContainer from './containers/SongsheetContainer';

import './main.scss';

const store = createStore(reactSongwriter);

ReactDOM.render(
  <Provider store={store}>
    <SongbookContainer />
  </Provider>,
  document.getElementById('app')
);
