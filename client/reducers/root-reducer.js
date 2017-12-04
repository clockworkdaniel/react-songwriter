import { combineReducers } from 'redux';
import { songsheetReducer } from './songsheet-reducer.js';
import { editModalReducer } from './edit-modal-reducer.js';
//import { songbookReducer } from './songbook-reducer.js';

export default combineReducers({
  "songsheetState" : songsheetReducer,
  "editModalState" : editModalReducer
  //"songbookState" : songbookReducer
});