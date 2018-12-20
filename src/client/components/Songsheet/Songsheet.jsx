import React from 'react';

import UIControls from './UIControls/UIControls';
import SongTitle from './SongTitle';
import SongAuthor from './SongAuthor';
import Section from './Section/Section';
import NewSectionButton from './Section/NewSectionButton';

export default class Songsheet extends React.Component {

  componentDidMount() {
    const { match, fetchSong } = this.props;
    fetchSong(match.params.id);
  }

  render() {
    const {
      uiState,
      song,
      uiHandlers,
      chord,
      sectionHandlers,
      rename
    } = this.props;

    return (
      <div className="songsheet">
        <UIControls
          chordMode={uiState.chordMode}
          switchMode={uiHandlers.switchMode}
          chordToPaint={uiState.chordToPaint}
          updateChordToPaint={uiHandlers.updateChordToPaint}
          paintSpecificity={uiState.paintSpecificity}
          updatePaintSpecificity={uiHandlers.updatePaintSpecificity}
          song={song}
          saveSong={uiHandlers.saveSong}
          songSaved={uiState.songSaved}
          resetSongSaved={uiHandlers.resetSongSaved}
        />
        <SongTitle
          title={song.title}
          rename={rename}
        />
        <SongAuthor
          author={song.author.name}
          rename={rename}
          _id={song.author._id}
        />
        <div className="songsheet__structure">
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
}
