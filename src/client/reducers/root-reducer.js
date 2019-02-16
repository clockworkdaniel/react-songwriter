import { combineReducers } from 'redux-loop';
import layoutReducer from './layout-reducer';
import songbookReducer from './songbook-reducer';
import songsheetReducer from './songsheet-reducer';

export default combineReducers({
  layoutState: layoutReducer,
  songsheetState: songsheetReducer,
  songbookState: songbookReducer
});
