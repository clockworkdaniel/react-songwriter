import React from 'react';

export default function UIControls(props) {

  function handleChordChange(event) {
    props.updateChordToPaint(event.target.value);
  }

  function handleSpecificityChange(event) {
    props.updatePaintSpecificity(event.target.value);
  }

  return (
    <div className="ui-controls">
      <button
        className="ui-controls__switch-button"
        onClick={props.switchMode}
        type="button"
      >
        {props.chordMode ? 'Lyrics Mode' : 'Chord Mode' }
      </button>
      {props.chordMode && (
        <div className="ui-controls__chord-input">
          <p>Chord:</p>
          <input
            value={props.chordToPaint}
            type="text" 
            onChange={handleChordChange}
          />
        </div>
      )}
      {props.chordMode && (
        <div className="ui-controls__specificity-select">
          <p>Assign chord by:</p>
          <select
            value={props.paintSpecificity}
            onChange={handleSpecificityChange}
          >
            <option value="character">Character</option>
            <option value="word">Word</option>
            <option value="line">Line</option>
          </select>
        </div>
      )}
    </div>
  );
}
