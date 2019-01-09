import { connect } from 'react-redux';

import {
  deleteSection,
  duplicateSection,
  moveSection,
  updateChord,
  switchMode,
  updateChordToPaint,
  updatePaintSpecificity,
  rename,
  fetchSong,
  saveSong,
  resetSongSaved,
  switchPrivacy
} from '../../actions/Songsheet/songsheet-actions';

import Songsheet from './Songsheet';

const mapStateToProps = state => ({
  uiState: state.songsheetState.uiState,
  song: state.songsheetState.song
});

const mapDispatchToProps = dispatch => ({
  uiHandlers: {
    switchMode: () => {
      dispatch(switchMode());
    },
    updateChordToPaint: (newChord) => {
      dispatch(updateChordToPaint(newChord));
    },
    updatePaintSpecificity: (newSpecificity) => {
      dispatch(updatePaintSpecificity(newSpecificity));
    },
    saveSong: (songId, song) => {
      dispatch(saveSong(songId, song));
    },
    resetSongSaved: () => {
      dispatch(resetSongSaved());
    }
  },
  chord: {
    update: (characterKey, lineKey, sectionKey) => {
      dispatch(updateChord(characterKey, lineKey, sectionKey));
    },
  },
  sectionHandlers: {
    deleteSection: (sectionKey) => {
      dispatch(deleteSection(sectionKey));
    },
    duplicateSection: (sectionKey) => {
      dispatch(duplicateSection(sectionKey));
    },
    moveSection: (sectionKey, newPosition) => {
      dispatch(moveSection(sectionKey, newPosition));
    }
  },
  rename: (value, userPrompt, pathArray) => {
    dispatch(rename(value, userPrompt, pathArray));
  },
  fetchSong: (songId) => {
    dispatch(fetchSong(songId));
  },
  switchPrivacy: (songId) => {
    dispatch(switchPrivacy(songId));
  }
});

const SongsheetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songsheet);

export default SongsheetContainer;
