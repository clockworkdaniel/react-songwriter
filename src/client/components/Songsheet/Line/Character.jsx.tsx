import React from 'react';

export default function Character({
  character,
  characterKey,
  chordChange,
  lineKey,
  sectionKey,
  updateChord,
  mouseDown
}) {
  function mouseOverChordChange() {
    if (mouseDown) {
      updateChord(characterKey, lineKey, sectionKey);
    }
  }
  function clickChordChange() {
    updateChord(characterKey, lineKey, sectionKey);
  }

  function touchChordChange() {

  }

  return (
    <span
      className="line__character"
      onClick={clickChordChange}
      onMouseOver={mouseOverChordChange}
      onTouchMove={touchChordChange}
    >
      {chordChange && (
        <span className="line__chord">{character.chord}</span>
      )}
      {character.character}
    </span>
  );
}
