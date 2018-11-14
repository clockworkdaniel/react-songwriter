export const rename = (editableText,
  path) => ({
  type: 'RENAME',
  editableText,
  path
});

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
