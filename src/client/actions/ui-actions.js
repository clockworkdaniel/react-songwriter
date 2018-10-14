export const updateChordToPaint = chord => {
	return {
		type: 'UPDATE_CHORD_TO_PAINT',
		chord
	};
};

export const switchMode = () => {
  return {
    type: 'SWITCH_MODE'
  };
};

export const updatePaintSpecificity = newSpecificity => {
	return {
		type: 'UPDATE_PAINT_SPECIFICITY',
		newSpecificity
	};
};

export const getCaretAndFocus = (caretPosition, lineKey, sectionKey) => {
	return {
		type: 'GET_CARET_AND_FOCUS',
		caretPosition,
		lineKey,
		sectionKey
	};
};

export function dictateCaret(frontOfLine, newLineToFocus, sectionKey){
	return {
		type: 'DICTATE_CARET',
		frontOfLine,
		newLineToFocus,
		sectionKey
	};
}

export function resetCaretMonitoring(){
	return {
		type: 'RESET_CARET_MONITORING'
	};
}