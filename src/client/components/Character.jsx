import React from 'react';

export default function Character({
  character,
  characterKey,
  chordChange,
  lineKey,
  sectionKey,
  updateChord
}) {
  function handleChordChange() {
    updateChord(characterKey, lineKey, sectionKey);
  }
  return (
    <span className="line__character" onClick={handleChordChange}>
      {chordChange && (
        <span className="line__chord">{character.chord}</span>
      )}
      {character.character}
    </span>
  );
}
