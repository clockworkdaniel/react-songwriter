import React from 'react';

export default class UIControls extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.handleChordChange = this.handleChordChange.bind(this);
    this.handleSpecificityChange = this.handleSpecificityChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { resetSongSaved } = this.props;
    const saveButton = document.querySelector('.sheet-controls__save-button');
    saveButton.addEventListener('animationend', () => {
      resetSongSaved();
    });
  }

  handleChordChange(event) {
    const { updateChordToPaint } = this.props;
    updateChordToPaint(event.target.value);
  }

  handleSpecificityChange(event) {
    const { updatePaintSpecificity } = this.props;
    updatePaintSpecificity(event.target.value);
  }

  handleSave() {
    const { song, saveSong, songSaved } = this.props;
    if (!songSaved) {
      saveSong(song._id, song);
    }
  }

  render() {
    const {
      chordMode,
      chordToPaint,
      paintSpecificity,
      switchMode,
      songSaved
    } = this.props;

    const songSavedModifier = songSaved ? 'sheet-controls__save-button--saved' : '';

    return (
      <div className="sheet-controls">
        <button
          className="sheet-controls__switch-button"
          onClick={switchMode}
          type="button"
        >
          {chordMode ? 'Lyrics Mode' : 'Chord Mode' }
        </button>
        {chordMode && (
          <div className="sheet-controls__chord-input">
            <p>Chord:</p>
            <input
              value={chordToPaint}
              type="text"
              onChange={this.handleChordChange}
            />
          </div>
        )}
        {chordMode && (
          <div className="sheet-controls__specificity-select">
            <p>Assign chord by:</p>
            <select
              value={paintSpecificity}
              onChange={this.handleSpecificityChange}
            >
              <option value="character">Character</option>
              <option value="word">Word</option>
              <option value="line">Line</option>
            </select>
          </div>
        )}
        <button
          className={`sheet-controls__save-button ${songSavedModifier}`}
          onClick={this.handleSave}
          type="button"
        >
          Save
        </button>
      </div>
    );
  }
}
