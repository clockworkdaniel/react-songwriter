import React from 'react';
import ReactDOM from 'react-dom';

//import express from 'express';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reactSongwriter from './reducers/root-reducer.js';

import SongsheetContainer from './containers/SongsheetContainer.jsx';

require("./scss/standard.scss");
require("./scss/song.scss");
require("./scss/ui-controls.scss");
require("./scss/hover-controls.scss");
require("./scss/edit-modal.scss");

//const app = express();

const store = createStore(reactSongwriter);

//console.log(store.getState());

ReactDOM.render(
	<Provider store={store}>
    <SongsheetContainer />
	</Provider>,
	document.getElementById("app")
);