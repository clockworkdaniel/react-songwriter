export const updateLine = (text, lineKey, sectionKey) => ({
  type: 'UPDATE_LINE',
  text,
  lineKey,
  sectionKey
});

export const updateChord = (characterKey, lineKey, sectionKey) => ({
  type: 'UPDATE_CHORD',
  characterKey,
  lineKey,
  sectionKey
});

export const newLine = (lineKey, sectionKey) => ({
  type: 'NEW_LINE',
  lineKey,
  sectionKey
});

export const deleteLine = (lineKey, sectionKey) => ({
  type: 'DELETE_LINE',
  lineKey,
  sectionKey
});

export const splitLine = (lineKey, sectionKey, caretPosition) => ({
  type: 'SPLIT_LINE',
  lineKey,
  sectionKey,
  caretPosition
});

export const joinLines = (lineKey, sectionKey) => ({
  type: 'JOIN_LINES',
  lineKey,
  sectionKey
});

export const moveLine = (lineKey, newPosition) => ({
  type: 'MOVE_LINE',
  lineKey,
  newPosition
});
