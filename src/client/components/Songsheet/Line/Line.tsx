import * as React from "react";

import SplitCharacters from "./SplitCharacters";
import LineInputContainer from "./LineInputContainer";
import { Line } from "../../../types/song";

type Props = {
  chordMode: boolean;
  isEditable: boolean;
  isMouseDown: boolean;
  line: Line;
  lineKey: number;
  sectionKey: number;
  updateChord(characterKey: number, lineKey: number, sectionKey: number): void;
};

export default function Line({
  chordMode,
  line,
  lineKey,
  sectionKey,
  updateChord,
  isMouseDown,
  isEditable
}: Props) {
  if (chordMode) {
    return (
      <SplitCharacters
        characters={line.characters}
        isEditable={isEditable}
        isMouseDown={isMouseDown}
        lineKey={lineKey}
        sectionKey={sectionKey}
        updateChord={updateChord}
      />
    );
  }

  return (
    <LineInputContainer
      isEditable={isEditable}
      fullLine={line.fullLine}
      lineKey={lineKey}
      sectionKey={sectionKey}
    />
  );
}
