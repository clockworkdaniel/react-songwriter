import React from 'react';

import Line from './Line';

export default function Section({
  caretPosition,
  caretIsBeingSet,
  changeLine,
  chordMode,
  deleteLine,
  dictateCaret,
  getCaretAndFocus,
  updateChord,
  deleteSection,
  duplicateSection,
  joinLines,
  lineFocused,
  newLine,
  moveSection,
  rename,
  resetCaretMonitoring,
  section,
  sectionFocused,
  sectionKey,
  splitLine,
}) {

  function handleDelete() {
    deleteSection(sectionKey);
  }

  function handleDuplicate() {
    duplicateSection(sectionKey);
  }

  function handleRename() {
    const textToEdit = section.sectionName;
    const path = ['song', 'structure', Number(sectionKey), 'sectionName'];
    rename(textToEdit, path);
  }

  function handleMoveUp() {
    moveSection(sectionKey, sectionKey - 1);
  }

  function handleMoveDown() {
    moveSection(sectionKey, sectionKey + 1);
  }

  return (
    <div className="song-section">
      <div className="song-section__top-labels">
        <div className="song-section__controls">
          <button className="controls__edit" onClick={handleRename} type="button">
            <span className="icon-pencil" />
          </button>
          <button className="controls__duplicate" onClick={handleDuplicate} type="button">
            <span className="icon-copy" />
          </button>
          <button className="controls__delete" onClick={handleDelete} type="button">
            <span className="icon-cross" />
          </button>
        </div>
        <h4 className="song-section__name">
          {section.sectionName}
          <span className="song-section__move-labels">
            <button className="controls__move-up" onClick={handleMoveUp} type="button">
              <span className="icon-move-up" />
            </button>
            <button className="controls__move-down" onClick={handleMoveDown} type="button">
              <span className="icon-move-down" />
            </button>
          </span>
        </h4>
      </div>
      <div className="lines">
        {section.lines.map((line, index) => (
          <Line
            line={line}
            key={index}
            lineKey={index}
            sectionKey={sectionKey}
            changeLine={changeLine}
            chordMode={chordMode}
            updateChord={updateChord}
            caretPosition={caretPosition}
            lineFocused={lineFocused}
            sectionFocused={sectionFocused}
            dictateCaret={dictateCaret}
            caretIsBeingSet={caretIsBeingSet}
            resetCaretMonitoring={resetCaretMonitoring}
            newLine={newLine}
            deleteLine={deleteLine}
            splitLine={splitLine}
            joinLines={joinLines}
            getCaretAndFocus={getCaretAndFocus}
          />
        ))}
      </div>
    </div>
  );
}
