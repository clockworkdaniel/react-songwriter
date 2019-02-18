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

export function renderSong(res) {
  return {
    type: 'RENDER_SONG',
    res
  };
}

export function fetchSong(songId) {
  return {
    type: 'FETCH_SONG',
    songId
  };
}

export function songSaved() {
  return {
    type: 'SONG_SAVED'
  };
}

export function saveSong(songId, song) {
  return {
    type: 'SAVE_SONG',
    songId,
    song
  };
}

// for animation
export function resetSongSaved() {
  return {
    type: 'RESET_SONG_SAVED'
  };
}

export function privacySwitched(res) {
  return {
    type: 'PRIVACY_SWITCHED',
    res
  };
}

export function switchPrivacy(songId) {
  return {
    type: 'SWITCH_PRIVACY',
    songId
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
  getCaretPosition,
  resetCaretMonitoring
} from './ui-actions';
