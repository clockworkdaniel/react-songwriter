export const updateChordToPaint = chord => ({
  type: 'UPDATE_CHORD_TO_PAINT',
  chord
});

export const switchMode = () => ({
  type: 'SWITCH_MODE'
});

export const updatePaintSpecificity = newSpecificity => ({
  type: 'UPDATE_PAINT_SPECIFICITY',
  newSpecificity
});

export const getCaretAndFocus = (caretPosition, lineKey, sectionKey) => ({
  type: 'GET_CARET_AND_FOCUS',
  caretPosition,
  lineKey,
  sectionKey
});

export const dictateCaret = (frontOfLine, newLineToFocus, sectionKey) => ({
  type: 'DICTATE_CARET',
  frontOfLine,
  newLineToFocus,
  sectionKey
});

export const resetCaretMonitoring = () => ({
  type: 'RESET_CARET_MONITORING'
});
