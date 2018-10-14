import React from 'react';

import Character from './Character';

export default function SplitCharacters({
  characters,
  lineKey,
  sectionKey,
  updateChord
}) {

  const splitCharacters = [];

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
      />
    );
  });

  return (
    <div className="line expanded">
      <p className="line__chord-input">
        {splitCharacters}
      </p>
    </div>
  );
}
