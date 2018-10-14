import fetch from 'isomorphic-fetch';

export function requestSongList() {
  return {
    type: 'REQUEST_SONGLIST'
  };
}

export function receiveSongList(json) {
  return {
    type: 'RECEIVE_SONGLIST',
    songList: json
	};
}

export function fetchSongList() {
  return dispatch => {
    dispatch(requestSongList());
    return fetch('/api/songs')
      .then(response => response.json())
      .then(json => dispatch(receiveSongList(json)));
  };
}