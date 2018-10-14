import { connect } from 'react-redux';

import {
  changeLine,
  updateChord,
  newLine,
  splitLine,
  deleteLine,
  joinLines
} from '../actions/line-actions';


import {
  deleteSection,
  duplicateSection,
  moveSection
} from '../actions/section-actions';

import {
  editModalTrigger
} from '../actions/rename-actions';

import {
  switchMode,
  updateChordToPaint,
  updatePaintSpecificity,
  getCaretAndFocus,
  dictateCaret,
  resetCaretMonitoring
} from '../actions/ui-actions';

import Songsheet from '../components/Songsheet';

const mapStateToProps = (state) => {
  return {
    uiState: state.songsheetState.uiState,
    song: state.songsheetState.song
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
      getCaretAndFocus: (caretPosition, lineKey, sectionKey) => {
        dispatch(getCaretAndFocus(caretPosition, lineKey, sectionKey));
      },
      resetCaretMonitoring: () => {
        dispatch(resetCaretMonitoring());
      }
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
    lineHandlers: {
      changeLine: (value, linekey, sectionKey) => {
        dispatch(changeLine(value, linekey, sectionKey));
      },
      updateChord: (characterKey, lineKey, sectionKey) => {
        dispatch(updateChord(characterKey, lineKey, sectionKey));
      },
      newLine: (linekey, sectionKey) => {
        dispatch(newLine(linekey, sectionKey));
      },
      deleteLine: (lineKey, sectionKey) => {
        dispatch(deleteLine(lineKey, sectionKey));
      },
      splitLine: (lineKey, sectionKey, caretPosition) => {
        dispatch(splitLine(lineKey, sectionKey, caretPosition));
      },
      joinLines: (lineKey, sectionKey) => {
        dispatch(joinLines(lineKey, sectionKey));
      },
      dictateCaret: (frontOfLine, newLineToFocus, sectionKey) => {
        dispatch(dictateCaret(frontOfLine, newLineToFocus, sectionKey));
      }
    },
    rename: (value, key) => {
      dispatch(editModalTrigger(value, key));
    }
  };
};

const SongsheetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songsheet);

export default SongsheetContainer;
