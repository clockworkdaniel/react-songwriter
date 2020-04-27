import * as React from "react";

import Character from "./Character";
import { Character as CharacterInterface } from "../../../types/song";

type Props = {
  characters: CharacterInterface[];
  lineKey: number;
  sectionKey: number;
  updateChord(characterKey: number, lineKey: number, sectionKey: number): void;
  isMouseDown: boolean;
  isEditable: boolean;
};

export default function SplitCharacters({
  characters,
  lineKey,
  sectionKey,
  updateChord,
  isMouseDown,
  isEditable
}: Props) {
  const splitCharacters: JSX.Element[] = [];

  characters.map((character, index) => {
    let chordChange = false;

    if (index === 0 || character.chord !== characters[index - 1].chord) {
      chordChange = true;
    }

    splitCharacters.push(
      <Character
        chordChange={chordChange}
        character={character}
        key={index}
        characterKey={index}
        lineKey={lineKey}
        sectionKey={sectionKey}
        updateChord={updateChord}
        isMouseDown={isMouseDown}
        isEditable={isEditable}
      />
    );
  });

  return (
    <div className="line expanded">
      <p className="line__chord-input">{splitCharacters}</p>
    </div>
  );
}
