import React from 'react';
import PropTypes from 'prop-types';

export default class LineInput extends React.Component {
  constructor({ caret, lineHandlers }) {
    super();

    this.getCaretAndFocus = caret.getCaretAndFocus;
    this.dictateCaret = caret.dictateCaret;
    this.resetCaretMonitoring = caret.resetCaretMonitoring;

    this.changeLine = lineHandlers.changeLine;
    this.newLine = lineHandlers.newLine;
    this.splitLine = lineHandlers.splitLine;
    this.joinLines = lineHandlers.joinLines;
    this.deleteLine = lineHandlers.deleteLine;

    this.handleChangeLine = this.handleChangeLine.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getCaretAndPosition = this.getCaretAndPosition.bind(this);
  }

  componentDidUpdate() {

    const {
      uiState: {
        caretIsBeingSet,
        caretPosition,
        lineFocused,
        sectionFocused
      },
      lineKey,
      sectionKey
    } = this.props;

    if (caretIsBeingSet === true) {
      if (sectionFocused === sectionKey) {
        if (lineFocused === lineKey) {

          this.textInput.focus();
          this.textInput.selectionStart = caretPosition;
          this.textInput.selectionEnd = caretPosition;
          this.resetCaretMonitoring();
        }
      }
    }
  }

  // called on click and keyup
  getCaretAndPosition(event, caretIsBeingSet, lineKey, sectionKey) {
    if (caretIsBeingSet === false) {
      this.getCaretAndFocus(
        event.target.selectionStart,
        lineKey,
        sectionKey
      );
    }
  }

  handleChangeLine(event, lineKey, sectionKey) {

    this.changeLine(event.target.value, lineKey, sectionKey);
  }

  handleKeyDown(event, fullLine, caretPosition, lineKey, sectionKey) {
    const lineLength = fullLine.length;

    // enter
    if (event.keyCode === 13) {
      // pushline to next line, leaving empty line behind
      if (caretPosition === 0 && lineLength > 0) {
        this.newLine(lineKey, sectionKey);
      } else if (caretPosition === lineLength) {
        this.newLine(lineKey + 1, sectionKey);
      } else if (caretPosition > 0) {
        this.splitLine(lineKey, sectionKey, caretPosition);
      }
      this.dictateCaret(true, (lineKey + 1), sectionKey);
    }
    // backspace
    else if (event.keyCode === 8) {
      if (caretPosition === 0) {
        if (lineLength > 0) {
          this.dictateCaret(false, (lineKey - 1), sectionKey);
          event.preventDefault();
          this.joinLines(lineKey, sectionKey);
        } else {
          // move caret to end of lineBefore
          this.dictateCaret(false, (lineKey - 1), sectionKey);
          event.preventDefault();
          this.deleteLine(lineKey, sectionKey);
        }
      }
    }
  }

  render() {

    const {
      fullLine,
      lineKey,
      sectionKey,
      uiState: {
        caretIsBeingSet,
        caretPosition,
      }
    } = this.props;

    return (
      <div className="line">
        <input
          className="line__lyrics-input"
          type="text"
          value={fullLine}
          onChange={e => this.handleChangeLine(e, lineKey, sectionKey)}
          onKeyDown={e => this.handleKeyDown(e, fullLine, caretPosition, lineKey, sectionKey)}
          onClick={e => this.getCaretAndPosition(e, caretIsBeingSet, lineKey, sectionKey)}
          onKeyUp={e => this.getCaretAndPosition(e, caretIsBeingSet, lineKey, sectionKey)}
          ref={(input) => { this.textInput = input; }}
        />
      </div>
    );
  }
}

LineInput.propTypes = {
  caret: PropTypes.shape({
    getCaretAndFocus: PropTypes.func.isRequired,
    dictateCaret: PropTypes.func.isRequired,
    resetCaretMonitoring: PropTypes.func.isRequired
  }).isRequired,
  lineHandlers: PropTypes.shape({
    changeLine: PropTypes.func.isRequired,
    newLine: PropTypes.func.isRequired,
    deleteLine: PropTypes.func.isRequired,
    splitLine: PropTypes.func.isRequired,
    joinLines: PropTypes.func.isRequired
  }).isRequired,
  uiState: PropTypes.shape({
    caretIsBeingSet: PropTypes.bool.isRequired,
    caretPosition: PropTypes.number.isRequired,
    lineFocused: PropTypes.number.isRequired,
    sectionFocused: PropTypes.number.isRequired,
  }).isRequired,
  fullLine: PropTypes.string.isRequired,
  lineKey: PropTypes.number.isRequired,
  sectionKey: PropTypes.number.isRequired,
};
