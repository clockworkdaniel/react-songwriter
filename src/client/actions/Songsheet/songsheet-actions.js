import { editModalTrigger } from '../EditModal/edit-modal-actions';

export const updateTextBeingEditedPath = path => ({
  type: 'UPDATE_TEXT_BEING_EDITED_PATH',
  path
});

export const updateEditedText = commitedTextObj => ({
  type: 'UPDATE_EDITED_TEXT',
  commitedTextObj
});

export const rename = (editableText, userPrompt, path) => (dispatch) => {
  dispatch(updateTextBeingEditedPath(path));
  dispatch(editModalTrigger({
    editableText,
    userPrompt,
    actionToTriggerOnCommit: updateEditedText,
    shouldCloseModal: true
  }));
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
