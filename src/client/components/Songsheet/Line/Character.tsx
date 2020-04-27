import * as React from "react";
import { Character } from "../../../types/song";

type Props = {
  character: Character;
  characterKey: number;
  chordChange: boolean;
  isEditable: boolean;
  isMouseDown: boolean;
  lineKey: number;
  sectionKey: number;
  updateChord(characterKey: number, lineKey: number, sectionKey: number): void;
};

export default function Character({
  character,
  characterKey,
  chordChange,
  isMouseDown,
  lineKey,
  sectionKey,
  updateChord
}: Props) {
  // should probably keep this from firing all the time
  function mouseOverChordChange() {
    if (isMouseDown) {
      updateChord(characterKey, lineKey, sectionKey);
    }
  }
  function clickChordChange() {
    updateChord(characterKey, lineKey, sectionKey);
  }

  function touchChordChange() {}

  return (
    <span
      className="line__character"
      onClick={clickChordChange}
      onMouseOver={mouseOverChordChange}
      onTouchMove={touchChordChange}
    >
      {chordChange && <span className="line__chord">{character.chord}</span>}
      {character.character}
    </span>
  );
}
