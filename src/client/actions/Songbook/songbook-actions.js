import callApi from '../../util/callApi';
import { editModalTrigger } from '../EditModal/edit-modal-actions';

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
    songId
  };
}

export function newSongRequest(song) {
  return dispatch => callApi('song/create', 'post', {
    title: song.title,
    author: song.author
  }).then(res => dispatch(addSong(res.song)));
}

export function newSongModalSequenceComplete(songAuthor) {
  return (dispatch, getState) => {
    const { songTitle } = getState().songbookState;
    const song = {
      title: songTitle,
      author: songAuthor
    };
    dispatch(newSongRequest(song));
  };
}

export function setNewSongTitle(songTitle) {
  return {
    type: 'SET_NEW_SONG_TITLE',
    songTitle
  };
}

export function assignSongAuthorModal(songTitle) {
  return (dispatch) => {
    dispatch(setNewSongTitle(songTitle));
    dispatch(editModalTrigger({
      userPrompt: 'Song author',
      actionToTriggerOnCommit: newSongModalSequenceComplete,
      shouldCloseModal: true
    }));
  };
}

export function newSongModal() {
  return (dispatch) => {
    dispatch(editModalTrigger({
      userPrompt: 'Song title',
      actionToTriggerOnCommit: assignSongAuthorModal,
      shouldCloseModal: false
    }));
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

export function deleteSongRequest(songId) {
  return dispatch => callApi(`songs/${songId}`, 'delete').then(() => dispatch(removeSong(songId)));
}
