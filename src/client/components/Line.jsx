import React from 'react';

import SplitCharacters from './SplitCharacters';
import LineInput from './LineInput';

export default function Line({
  caretIsBeingSet,
  caretPosition,
  changeLine,
  chordMode,
  deleteLine,
  dictateCaret,
  getCaretAndFocus,
  joinLines,
  line,
  lineFocused,
  lineKey,
  newLine,
  resetCaretMonitoring,
  sectionKey,
  sectionFocused,
  splitLine,
  updateChord
}) {

  if (chordMode) {
    return (
      <SplitCharacters
        characters={line.characters}
        lineKey={lineKey}
        sectionKey={sectionKey}
        updateChord={updateChord}
      />
    );
  }

  return ( 
    <LineInput
      fullLine={line.fullLine}
      lineKey={lineKey}
      sectionKey={sectionKey}
      changeLine={changeLine}
      caretPosition={caretPosition}
      lineFocused={lineFocused}
      sectionFocused={sectionFocused}
      dictateCaret={dictateCaret}
      caretIsBeingSet={caretIsBeingSet}
      resetCaretMonitoring={resetCaretMonitoring}
      newLine={newLine}
      deleteLine={deleteLine}
      splitLine={splitLine}
      joinLines={joinLines}
      getCaretAndFocus={getCaretAndFocus}
    />
  );
}
