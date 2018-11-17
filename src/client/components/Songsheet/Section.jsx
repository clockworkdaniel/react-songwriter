import React from 'react';

import Line from './Line';

export default function Section({
  chordMode,
  updateChord,
  deleteSection,
  duplicateSection,
  moveSection,
  rename,
  section,
  sectionKey,
}) {

  function handleDelete() {
    deleteSection(sectionKey);
  }

  function handleDuplicate() {
    duplicateSection(sectionKey);
  }

  function handleRename() {
    const editableText = section.sectionName;
    const path = ['song', 'structure', Number(sectionKey), 'sectionName'];
    rename(editableText, 'Rename section', path);
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
            chordMode={chordMode}
            updateChord={updateChord}
          />
        ))}
      </div>
    </div>
  );
}
