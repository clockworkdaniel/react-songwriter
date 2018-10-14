import React from "react";

export default function Character(props) {
  function handleChordChange() {
    props.updateChord(props.characterKey, props.lineKey, props.sectionKey);
  }
  return (
    <span className="line__character" onClick={handleChordChange}>
      {props.chordChange && (
        <span className="line__chord">{props.character.chord}</span>
      )}
      {props.character.character}
    </span>
  );
}
