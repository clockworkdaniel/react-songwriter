export function updateEditedText(committedTextObj) {
  return {
    type: "UPDATE_EDITED_TEXT",
    committedTextObj
  };
}

export function rename(editableText, userPrompt, path) {
  return {
    type: "RENAME",
    editableText,
    userPrompt,
    path
  };
}

export function fetchSongSuccess(res) {
  return {
    type: "FETCH_SONG_SUCCESS",
    res
  };
}

export function fetchSong(songId) {
  return {
    type: "FETCH_SONG",
    songId
  };
}

export function songSaved() {
  return {
    type: "SAVE_SONG_SUCCESS"
  };
}

export function saveSongRequest(songId, song) {
  return {
    type: "SAVE_SONG_REQUEST",
    songId,
    song
  };
}

// for animation
export function resetSongSaved() {
  return {
    type: "RESET_SONG_SAVED"
  };
}

export function switchPrivacySuccess(res) {
  return {
    type: "SWITCH_PRIVACY_SUCCESS",
    res
  };
}

export function switchPrivacyRequest(songId) {
  return {
    type: "SWITCH_PRIVACY_REQUEST",
    songId
  };
}

export {
  updateLine,
  updateChord,
  newLine,
  deleteLine,
  splitLine,
  joinLines,
  moveLine
} from "./line-actions";

export {
  newSection,
  duplicateSection,
  deleteSection,
  moveSection
} from "./section-actions";

export {
  updateChordToPaint,
  switchMode,
  updatePaintSpecificity,
  getCaretPosition,
  resetCaretMonitoring
} from "./ui-actions";
