import React from 'react';

import SplitCharacters from './SplitCharacters';
import LineInputContainer from './LineInputContainer';

export default function Line({
  chordMode,
  line,
  lineKey,
  sectionKey,
  updateChord,
  mouseDown,
  editable
}) {

  if (chordMode) {
    return (
      <SplitCharacters
        characters={line.characters}
        lineKey={lineKey}
        sectionKey={sectionKey}
        updateChord={updateChord}
        mouseDown={mouseDown}
        editable={editable}
      />
    );
  }

  return (
    <LineInputContainer
      fullLine={line.fullLine}
      lineKey={lineKey}
      sectionKey={sectionKey}
      editable={editable}
    />
  );
}
