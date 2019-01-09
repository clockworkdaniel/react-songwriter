import callApi from '../../util/callApi';
import { editModalTrigger } from '../Layout/edit-modal-actions';

export function updateTextBeingEditedPath(path) {
  return {
    type: 'UPDATE_TEXT_BEING_EDITED_PATH',
    path
  };
}

export function updateEditedText(commitedTextObj) {
  return {
    type: 'UPDATE_EDITED_TEXT',
    commitedTextObj
  };
}

export function rename(editableText, userPrompt, path) {
  return (dispatch) => {
    dispatch(updateTextBeingEditedPath(path));
    dispatch(editModalTrigger({
      editableText,
      userPrompt,
      actionToTriggerOnCommit: updateEditedText,
      shouldCloseModal: true
    }));
  };
}

export function renderSong(song, editable) {
  return {
    type: 'RENDER_SONG',
    song,
    editable
  };
}

export function fetchSong(songId) {
  return dispatch => callApi(`song/${songId}`).then(res => dispatch(renderSong(res.song, res.editable)));
}

export function songSaved() {
  return {
    type: 'SONG_SAVED'
  };
}

export function saveSong(songId, song) {
  return dispatch => callApi(`song/${songId}`, 'put', song).then(() => dispatch(songSaved()));
}

// for animation
export function resetSongSaved() {
  return {
    type: 'RESET_SONG_SAVED'
  };
}

export function privacySwitched(isPublic) {
  return {
    type: 'PRIVACY_SWITCHED',
    isPublic
  };
}

export function switchPrivacy(songId) {
  return dispatch => callApi(`song/${songId}/togglePrivacy`, 'put').then(res => dispatch(privacySwitched(res.isPublic)));
}

export {
  changeLine,
  updateChord,
  newLine,
  deleteLine,
  splitLine,
  joinLines,
  moveLine
} from './line-actions';

export {
  newSection,
  duplicateSection,
  deleteSection,
  moveSection
} from './section-actions';

export {
  updateChordToPaint,
  switchMode,
  updatePaintSpecificity,
  getCaretPosition,
  resetCaretMonitoring
} from './ui-actions';
