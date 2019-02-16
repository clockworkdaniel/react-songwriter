import React from 'react';

export default class UIControls extends React.Component {

  componentDidMount() {
    const { resetSongSaved } = this.props;
    const saveButton = document.querySelector('.sheet-controls__save-button');
    saveButton && saveButton.addEventListener('animationend', () => {
      resetSongSaved();
    });
  }

  handleChordChange = (event) => {
    const { updateChordToPaint } = this.props;
    updateChordToPaint(event.target.value);
  }

  handleSpecificityChange = (event) => {
    const { updatePaintSpecificity } = this.props;
    updatePaintSpecificity(event.target.value);
  }

  handleSave = () => {
    const { song, saveSong, songSaved } = this.props;
    if (!songSaved) {
      saveSong(song._id, song);
    }
  }

  handlePrivacySwitch = () => {
    const { song, switchPrivacy } = this.props;
    switchPrivacy(song._id);
  }

  render() {
    const {
      chordMode,
      chordToPaint,
      paintSpecificity,
      switchMode,
      songSaved,
      song: {
        isPublic
      },
      editable
    } = this.props;

    const songSavedModifier = songSaved ? 'sheet-controls__save-button--saved' : '';

    return (
      <div className="sheet-controls__container">
        <div className="sheet-controls">
          <div className={`switch${chordMode ? ' switch--on' : ''}`}>
            <label className="switch__label" htmlFor="mode-switch" onClick={switchMode}>
              {chordMode ? 'Chord mode' : 'Lyrics mode'}
            </label>
            <button
              className="switch__button"
              type="button"
              id="mode-switch"
              onClick={switchMode}
            />
          </div>
          {editable && chordMode && (
            <div className="sheet-controls__chord-input">
              <p>Chord:</p>
              <input
                value={chordToPaint}
                type="text"
                onChange={this.handleChordChange}
              />
            </div>
          )}
          {editable && chordMode && (
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
        </div>
        {editable && (
          <div className="sheet-controls sheet-controls--lower">
            <div className={`switch${isPublic ? ' switch--on' : ''}`}>
              <label className="switch__label" htmlFor="privacy-switch" onClick={this.handlePrivacySwitch}>
                {isPublic ? 'Public' : 'Private' }
              </label>
              <button
                className="switch__button"
                type="button"
                id="privacy-switch"
                onClick={this.handlePrivacySwitch}
              />
            </div>
            <button
              className={`sheet-controls__save-button ${songSavedModifier}`}
              onClick={this.handleSave}
              type="button"
            >
              Save
            </button>
          </div>
        )}

      </div>
    );
  }
}
