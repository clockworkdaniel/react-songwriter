import callApi from '../../util/callApi';

export function addSongs(songs) {
  return {
    type: 'ADD_SONGS',
    songs
  };
}

export function addSong(song) {
  return {
    type: 'ADD_SONG',
    song
  };
}

export function removeSong(songId) {
  return {
    type: 'REMOVE_SONG',
    songId,
  };
}

export function fetchSong(songId) {
  return dispatch => callApi(`song/${songId}`).then(res => dispatch(addSong(res.song)));
}

export function fetchSongs() {
  return dispatch => callApi('songs').then((res) => {
    dispatch(addSongs(res.songs));
  });
}

export function newSongRequest(song) {
  return dispatch => callApi('songs/create', 'post', {
    song: {
      title: song.title,
      author: song.author,
    },
  }).then(res => dispatch(addSong(res.song)));
}

export function deleteSongRequest(songId) {
  return dispatch => callApi(`songs/${songId}`, 'delete').then(() => dispatch(removeSong(songId)));
}
