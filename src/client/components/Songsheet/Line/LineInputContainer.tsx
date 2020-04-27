import { connect } from "react-redux";

import {
  updateLine,
  newLine,
  splitLine,
  deleteLine,
  joinLines,
  getCaretPosition,
  resetCaretMonitoring
} from "../../../actions/Songsheet/songsheet-actions";

import LineInput from "./LineInput";

const mapStateToProps = state => ({
  uiState: state.songsheetState.uiState
});

const mapDispatchToProps = dispatch => ({
  /* caret handlers */
  getCaretPosition: (caretPosition, lineKey, sectionKey) => {
    dispatch(getCaretPosition(caretPosition, lineKey, sectionKey));
  },
  resetCaretMonitoring: () => {
    dispatch(resetCaretMonitoring());
  },
  /* line handlers */
  updateLine: (value, linekey, sectionKey) => {
    dispatch(updateLine(value, linekey, sectionKey));
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
});

const LineInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LineInput);

export default LineInputContainer;
