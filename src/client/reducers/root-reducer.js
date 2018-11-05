import { combineReducers } from 'redux';
import songsheetReducer from './songsheet-reducer';
import editModalReducer from './edit-modal-reducer';
// import { songbookReducer } from './songbook-reducer.js';

export default combineReducers({
  songsheetState: songsheetReducer,
  editModalState: editModalReducer
  // "songbookState" : songbookReducer
});
