import React from 'react';

import UIControls from './SongUIControls';
import SongTitle from './SongTitle';
import SongAuthor from './SongAuthor';
import Section from './Section';
import NewSectionButton from './NewSectionButton';
import EditModalContainer from '../../containers/EditModalContainer';

export default function Songsheet({
  uiState,
  song,
  uiHandlers,
  chord,
  sectionHandlers,
  rename
}) {

  return (

    <div className="song">
      <EditModalContainer />
      <UIControls
        chordMode={uiState.chordMode}
        switchMode={uiHandlers.switchMode}
        chordToPaint={uiState.chordToPaint}
        updateChordToPaint={uiHandlers.updateChordToPaint}
        paintSpecificity={uiState.paintSpecificity}
        updatePaintSpecificity={uiHandlers.updatePaintSpecificity}
      />
      <SongTitle title={song.title} rename={rename} />
      <SongAuthor author={song.author} rename={rename} />
      <div className="song-structure">
        {song.structure.map((section, index) => (
          <Section
            section={section}
            key={index}
            sectionKey={index}
            chordMode={uiState.chordMode}
            updateChord={chord.update}
            deleteSection={sectionHandlers.deleteSection}
            duplicateSection={sectionHandlers.duplicateSection}
            moveSection={sectionHandlers.moveSection}
            rename={rename}
          />
        ))}
      </div>
      <NewSectionButton />
    </div>
  );
}
