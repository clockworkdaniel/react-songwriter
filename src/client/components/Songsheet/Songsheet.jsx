import React from 'react';

import UIControls from './UIControls/UIControls';
import SongTitle from './SongTitle';
import SongArtist from './SongArtist';
import Section from './Section/Section';
import NewSectionButton from './Section/NewSectionButton';
import SongUser from './SongUser';

export default class Songsheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false
    };
  }

  componentDidMount() {
    const { match, fetchSong } = this.props;
    fetchSong(match.params.id);
  }
  
  componentDidUpdate(prevProps) {
    const {
      signInState: {
        signedIn
      },
      fetchSong,
      match
    } = this.props;

    if (signedIn !== prevProps.signInState.signedIn) {
      fetchSong(match.params.id);
    }
  }

  handleMouseDown = () => {
    this.setState({
      mouseDown: true
    });
  }

  handleMouseUp = () => {
    this.setState({
      mouseDown: false
    });
  }

  render() {
    const {
      uiState,
      song,
      uiHandlers,
      chord,
      sectionHandlers,
      rename,
      switchPrivacyRequest
    } = this.props;

    return (
      <div className="songsheet" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        <UIControls
          chordMode={uiState.chordMode}
          switchMode={uiHandlers.switchMode}
          chordToPaint={uiState.chordToPaint}
          updateChordToPaint={uiHandlers.updateChordToPaint}
          paintSpecificity={uiState.paintSpecificity}
          updatePaintSpecificity={uiHandlers.updatePaintSpecificity}
          song={song}
          saveSongRequest={uiHandlers.saveSongRequest}
          songSaved={uiState.songSaved}
          resetSongSaved={uiHandlers.resetSongSaved}
          switchPrivacyRequest={switchPrivacyRequest}
          editable={uiState.editable}
        />
        <SongTitle
          title={song.title}
          rename={rename}
        />
        <SongArtist
          artist={song.artist.name}
          rename={rename}
          _id={song.artist._id}
        />
        <SongUser
          user={song.user.username}
          _id={song.user._id}
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
              editable={uiState.editable}
              mouseDown={this.state.mouseDown}
            />
          ))}
        </div>
        {uiState.editable && <NewSectionButton />}
      </div>
    );

  }
}
