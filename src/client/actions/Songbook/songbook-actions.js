import { editModalTrigger } from '../Layout/edit-modal-actions';

export function fetchSongs() {
  return {
    type: 'FETCH_SONGS'
  };
}

export function fetchSongsBySingleArtist(artistId) {
  return {
    type: 'FETCH_SONGS_BY_SINGLE_ARTIST',
    artistId
  };
}

export function fetchSongsSuccess(res) {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    res
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

export function setOrderDirection(isAscending) {
  return {
    type: 'SET_ORDER_DIRECTION',
    isAscending
  };
}

export function newSongRequest(song) {
  return {
    type: 'NEW_SONG_REQUEST',
    song
  };
}

export function newSongSuccess(res) {
  return {
    type: 'NEW_SONG_SUCCESS',
    res
  };
}

export function deleteSongSuccess(res) {
  return {
    type: 'DELETE_SONG_SUCCESS',
    res
  };
}

export function deleteSongRequest(songId) {
  return {
    type: 'DELETE_SONG_REQUEST',
    songId
  };
}

export function setNewSongTitle(songTitle) {
  return {
    type: 'SET_NEW_SONG_TITLE',
    songTitle
  };
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
