import * as React from "react";

import UIControls from "./UIControls/UIControls";
import SongTitle from "./SongTitle/SongTitle";
import SongArtist from "./SongArtist/SongArtist";
import Section from "./Section/Section";
import NewSectionButton from "./Section/NewSectionButton";
import SongUser from "./SongUser/SongUser";
import { SongsheetUiState } from "../../reducers/songsheet-reducer";
import { RouteComponentProps } from "react-router-dom";
import Song from "../../types/song";
import SignInState from "../../types/signInState";

type StateProps = {
  uiState: SongsheetUiState;
  song: Song;
  signInState: SignInState;
};

type DispatchProps = {
  uiHandlers: {
    switchMode(): void;
    updateChordToPaint(newChord: string): void;
    // change to enum
    updatePaintSpecificity(newSpecificity: string): void;
    saveSongRequest(songId: string, song: Song): void;
    resetSongSaved(): void;
  };
  chord: {
    update(characterKey: number, lineKey: number, sectionKey: number): void;
  };
  sectionHandlers: {
    deleteSection(sectionKey: number): void;
    duplicateSection(sectionKey: number): void;
    moveSection(sectionKey: number, newPosition: number): void;
    newSection(): void;
  };
  // fix
  rename(value: string, userPrompt: string, pathArray: any): void;
  fetchSong(songId: string): void;
  switchPrivacyRequest(songId: string): void;
};

type TParams = { id: string };

export default class Songsheet extends React.Component<
  StateProps & DispatchProps & RouteComponentProps<TParams>,
  { isMouseDown: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false
    };
  }

  componentDidMount() {
    const { match, fetchSong } = this.props;
    fetchSong(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const {
      signInState: { isSignedIn },
      fetchSong,
      match
    } = this.props;

    if (isSignedIn !== prevProps.signInState.isSignedIn) {
      fetchSong(match.params.id);
    }
  }

  handleMouseDown = () => {
    this.setState({
      isMouseDown: true
    });
  };

  handleMouseUp = () => {
    this.setState({
      isMouseDown: false
    });
  };

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
      <div
        className="songsheet"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
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
          isEditable={uiState.isEditable}
        />
        <SongTitle title={song.title} rename={rename} />
        {song.artist && song.artist.name && song.artist._id ? (
          <SongArtist
            artist={song.artist.name}
            rename={rename}
            _id={song.artist._id}
          />
        ) : null}
        {song.user && song.user.username && song.user._id ? (
          <SongUser user={song.user.username} _id={song.user._id} />
        ) : null}
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
              isEditable={uiState.isEditable}
              isMouseDown={this.state.isMouseDown}
            />
          ))}
        </div>
        {uiState.isEditable && (
          <NewSectionButton newSection={sectionHandlers.newSection} />
        )}
      </div>
    );
  }
}
