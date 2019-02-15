import React from 'react';

export default function Character({
  character,
  characterKey,
  chordChange,
  lineKey,
  sectionKey,
  updateChord,
  editable
}) {
  function handleChordChange() {
    if (editable) {
      updateChord(characterKey, lineKey, sectionKey);
    }
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
