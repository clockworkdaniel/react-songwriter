import { connect } from 'react-redux';

import {
  changeLine,
  newLine,
  splitLine,
  deleteLine,
  joinLines,
  getCaretAndFocus,
  dictateCaret,
  resetCaretMonitoring
} from '../../../actions/Songsheet/songsheet-actions';

import LineInput from './LineInput';

const mapStateToProps = state => ({
  uiState: state.songsheetState.uiState
});

const mapDispatchToProps = dispatch => ({
  caret: {
    getCaretAndFocus: (caretPosition, lineKey, sectionKey) => {
      dispatch(getCaretAndFocus(caretPosition, lineKey, sectionKey));
    },
    resetCaretMonitoring: () => {
      dispatch(resetCaretMonitoring());
    },
    dictateCaret: (frontOfLine, newLineToFocus, sectionKey) => {
      dispatch(dictateCaret(frontOfLine, newLineToFocus, sectionKey));
    }
  },
  lineHandlers: {
    changeLine: (value, linekey, sectionKey) => {
      dispatch(changeLine(value, linekey, sectionKey));
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
    }
  }
});

const LineInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LineInput);

export default LineInputContainer;
