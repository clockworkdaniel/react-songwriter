import callApi from '../../util/callApi';
import history from '../../history';
import { editModalTrigger } from '../EditModal/edit-modal-actions';

export function addAuthors(authors) {
  return {
    type: 'ADD_AUTHORS',
    authors
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
  }).then((res) => {
    history.push(`/song/${res.song._id}`);
  });
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

export function fetchAuthors() {
  return dispatch => callApi('authors').then((res) => {
    dispatch(addAuthors(res.authors));
  });
}

export function fetchSongsByAuthor(authorId) {
  return dispatch => callApi(`author/${authorId}`).then(res => dispatch(addAuthors(res.authors)));
}

// FIX
export function deleteSongRequest(songId) {
  return dispatch => callApi(`song/${songId}`, 'delete').then(() => dispatch(removeSong(songId)));
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
