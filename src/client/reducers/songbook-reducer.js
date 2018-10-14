import {
  REQUEST_SONGLIST,
  RECEIVE_SONGLIST
} from '../actions/fetch-actions';

const intialState = {
	isFetching: false,
	songList: []
};

export const songbookReducer = (state = intialState, action) =>  {
  switch (action.type) {
    case REQUEST_SONGLIST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_SONGLIST:
      return Object.assign({}, state, {
        isFetching: false,
        songList: action.songList
      });
    default:
      return state;
  }
};