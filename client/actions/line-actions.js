export function changeLine(text, lineKey, sectionKey){
  return {
    type: 'CHANGE_LINE',
    text,
    lineKey,
    sectionKey
  };
}

export function updateChord(characterKey, lineKey, sectionKey){
	return {
		type: 'UPDATE_CHORD',
		characterKey,
		lineKey,
		sectionKey
	};
}

export function newLine(lineKey, sectionKey){
  return {
    type: 'NEW_LINE',
    lineKey,
    sectionKey
  };
}

export function deleteLine(lineKey, sectionKey){
  return {
    type: 'DELETE_LINE',
    lineKey,
    sectionKey
  };
}

export function splitLine(lineKey, sectionKey, caretPosition){
  return {
    type: 'SPLIT_LINE',
    lineKey,
    sectionKey,
    caretPosition
  };
}

export function joinLines(lineKey, sectionKey){
  return {
    type: 'JOIN_LINES',
    lineKey,
    sectionKey
  };
}

export function moveLine(lineKey, newPosition){
	return {
		type: 'MOVE_LINE',
		lineKey,
		newPosition
	};
}