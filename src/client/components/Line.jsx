import React from 'react';

import SplitCharacters from './SplitCharacters';
import LineInput from './LineInput';

export default function Line(props) {

  if (props.chordMode) {
    return (
      <SplitCharacters
        characters={props.line.characters}
        lineKey={props.lineKey}
        sectionKey={props.sectionKey}
        updateChord={props.updateChord}
      />
    );
  }

  return ( 
    <LineInput
      fullLine={props.line.fullLine}
      lineKey={props.lineKey}
      sectionKey={props.sectionKey}
      changeLine={props.changeLine}
      caretPosition={props.caretPosition}
      lineFocused={props.lineFocused}
      sectionFocused={props.sectionFocused}
      dictateCaret={props.dictateCaret}
      caretIsBeingSet={props.caretIsBeingSet}
      resetCaretMonitoring={props.resetCaretMonitoring}
      newLine={props.newLine}
      deleteLine={props.deleteLine}
      splitLine={props.splitLine}
      joinLines={props.joinLines}
      getCaretAndFocus={props.getCaretAndFocus}
    />
  );
}
