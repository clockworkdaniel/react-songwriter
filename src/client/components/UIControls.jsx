import React from 'react';

export default function UIControls({
  chordMode,
  chordToPaint,
  paintSpecificity,
  switchMode,
  updateChordToPaint,
  updatePaintSpecificity
}) {

  function handleChordChange(event) {
    updateChordToPaint(event.target.value);
  }

  function handleSpecificityChange(event) {
    updatePaintSpecificity(event.target.value);
  }

  return (
    <div className="ui-controls">
      <button
        className="ui-controls__switch-button"
        onClick={switchMode}
        type="button"
      >
        {chordMode ? 'Lyrics Mode' : 'Chord Mode' }
      </button>
      {chordMode && (
        <div className="ui-controls__chord-input">
          <p>Chord:</p>
          <input
            value={chordToPaint}
            type="text" 
            onChange={handleChordChange}
          />
        </div>
      )}
      {chordMode && (
        <div className="ui-controls__specificity-select">
          <p>Assign chord by:</p>
          <select
            value={paintSpecificity}
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
