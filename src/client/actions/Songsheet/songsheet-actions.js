import { editModalTrigger } from '../EditModal/edit-modal-actions';

export const updateTextBeingEditedPath = path => ({
  type: 'UPDATE_TEXT_BEING_EDITED_PATH',
  path
});

export const updateEditedText = commitedText => ({
  type: 'UPDATE_EDITED_TEXT',
  commitedText
});

export const rename = (editableText, path) => (dispatch) => {
  dispatch(updateTextBeingEditedPath(path));
  dispatch(editModalTrigger(editableText, updateEditedText));
};

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
