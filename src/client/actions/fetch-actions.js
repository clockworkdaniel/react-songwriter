import callApi from '../util/callApi';

export function fetchSong(songId) {
  return (dispatch) => {
    return callApi(`song/${songId}`).then(res => dispatch(addSong(res.song)));
  };
}

export function fetchSongs() {
  return (dispatch) => {
    return callApi('songs').then((res) => {
      dispatch(addSongs(res.songs));
    });
  }
}

export function addSong(song) {
  return {
    type: 'ADD_SONG',
    song
  };
}

export function addSongs(songs) {
  return {
    type: 'ADD_SONGS',
    songs
  };
}

export function addSongRequest(song) {
  return (dispatch) => {
    return callApi('songs', 'post', {
      post: {
        name: song.title,
        title: song.author,
      },
    }).then(res => dispatch(addSong(res.post)));
  };
}

export function deleteSong(songId) {
  return {
    type: 'DELETE_SONG',
    songId,
  };
}

export function deletePostRequest(songId) {
  return (dispatch) => {
    return callApi(`posts/${songId}`, 'delete').then(() => dispatch(deleteSong(songId)));
  };
}
