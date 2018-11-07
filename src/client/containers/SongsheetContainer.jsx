import { connect } from 'react-redux';

import {
  deleteSection,
  duplicateSection,
  moveSection
} from '../actions/section-actions';

import {
  editModalTrigger
} from '../actions/rename-actions';

import {
  updateChord
} from '../actions/line-actions';

import {
  switchMode,
  updateChordToPaint,
  updatePaintSpecificity
} from '../actions/ui-actions';

import Songsheet from '../components/Song/Songsheet';

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
  rename: (value, key) => {
    dispatch(editModalTrigger(value, key));
  }
});

const SongsheetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songsheet);

export default SongsheetContainer;
