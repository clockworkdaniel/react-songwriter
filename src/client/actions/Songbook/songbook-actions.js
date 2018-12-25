import callApi from '../../util/callApi';
import history from '../../history';
import { editModalTrigger } from '../Layout/edit-modal-actions';

export function addSongs(artistSongs) {
  return {
    type: 'ADD_SONGS',
    artistSongs
  };
}

export function removeSong(songId) {
  return {
    type: 'REMOVE_SONG',
    songId
  };
}

export function setOrderLogic(orderLogic) {
  return {
    type: 'SET_ORDER_LOGIC',
    orderLogic
  };
}

export function setSongPriority(songPriority) {
  return {
    type: 'SET_SONG_PRIORITY',
    songPriority
  };
}

export function setAscending(isAscending) {
  return {
    type: 'SET_ASCENDING',
    isAscending
  };
}

export function newSongRequest(song) {
  return dispatch => callApi('song/create', 'post', {
    title: song.title,
    artist: song.artist
  }).then((res) => {
    history.push(`/song/${res.song._id}`);
    dispatch(setSongPriority('modified'));
  });
}

export function newSongModalSequenceComplete(songArtist) {
  return (dispatch, getState) => {
    const { songTitle } = getState().songbookState;
    const song = {
      title: songTitle,
      artist: songArtist
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

export function assignSongArtistModal(songTitle) {
  return (dispatch) => {
    dispatch(setNewSongTitle(songTitle));
    dispatch(editModalTrigger({
      userPrompt: 'Song artist',
      actionToTriggerOnCommit: newSongModalSequenceComplete,
      shouldCloseModal: true
    }));
  };
}

export function newSongModal() {
  return (dispatch) => {
    dispatch(editModalTrigger({
      userPrompt: 'Song title',
      actionToTriggerOnCommit: assignSongArtistModal,
      shouldCloseModal: false
    }));
  };
}

export function fetchSongs() {
  return dispatch => callApi('artists').then((res) => {
    dispatch(addSongs(res.artists));
  });
}

export function fetchSongsBySingleArtist(artistId) {
  return dispatch => callApi(`artist/${artistId}`).then(res => dispatch(addSongs(res.artists)));
}

export function deleteSongRequest(songId) {
  return dispatch => callApi(`song/${songId}`, 'delete').then(() => dispatch(removeSong(songId)));
}
