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

export function renderSong(song) {
  return {
    type: 'RENDER_SONG',
    song
  };
}

export function fetchSong(songId) {
  return dispatch => callApi(`song/${songId}`).then(res => dispatch(renderSong(res.song)));
}

export function songSaved() {
  return {
    type: 'SONG_SAVED'
  };
}

export function saveSong(songId, song) {
  return dispatch => callApi(`song/${songId}`, 'put', song).then(() => dispatch(songSaved()));
}

export function resetSongSaved() {
  return {
    type: 'RESET_SONG_SAVED'
  };
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
  getCaretAndFocus,
  dictateCaret,
  resetCaretMonitoring
} from './ui-actions';
