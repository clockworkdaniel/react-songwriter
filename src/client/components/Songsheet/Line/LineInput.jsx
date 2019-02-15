import React from 'react';
import PropTypes from 'prop-types';

export default class LineInput extends React.Component {
  constructor() {
    super();
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.setFocusAndCaret();
  }

  componentDidUpdate() {
    this.setFocusAndCaret();
  }

  setFocusAndCaret() {
    const {
      uiState: {
        caretIsBeingSet,
        caretPosition,
        lineFocused,
        sectionFocused
      },
      lineKey,
      sectionKey,
      caret: {
        resetCaretMonitoring
      }
    } = this.props;

    if (caretIsBeingSet === true) {
      if (sectionFocused === sectionKey) {
        if (lineFocused === lineKey) {
          this.textInput.current.focus();
          this.textInput.current.selectionStart = caretPosition;
          this.textInput.current.selectionEnd = caretPosition;
          resetCaretMonitoring();
        }
      }
    }
  }

  getCaretPosition = (event) => {

    const {
      caret: { getCaretPosition }, lineKey, sectionKey
    } = this.props;

    getCaretPosition(event.target.selectionStart, lineKey, sectionKey);
  }

  handleChangeLine = (event) => {

    const {
      lineHandlers: {
        changeLine
      },
      lineKey,
      sectionKey
    } = this.props;
    changeLine(event.target.value, lineKey, sectionKey);
  }

  handleKeyDown = (event) => {

    const {
      fullLine,
      lineKey,
      sectionKey,
      lineHandlers: {
        newLine,
        splitLine,
        joinLines,
        deleteLine
      },
      uiState: { caretPosition },
    } = this.props;

    const lineLength = fullLine.length;

    // enter
    if (event.keyCode === 13) {
      // push line to next line, leaving empty line behind
      if ((caretPosition > 0) && (caretPosition < lineLength)) {
        splitLine(lineKey, sectionKey);
      } else {
        newLine(lineKey, sectionKey);
      }
    }
    // backspace
    else if (event.keyCode === 8) {
      if (caretPosition === 0) {
        if (lineLength > 0) {
          event.preventDefault();
          joinLines(lineKey, sectionKey);
        } else {
          // move caret to end of prev line
          event.preventDefault();
          deleteLine(lineKey, sectionKey);
        }
      }
    }
  }

  render() {

    const { fullLine, editable } = this.props;

    return (
      <div className="line">
        <input
          className="line__lyrics-input"
          type="text"
          value={fullLine}
          onClick={this.getCaretPosition}
          onKeyUp={this.getCaretPosition}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChangeLine}
          ref={this.textInput}
          readOnly={!editable && 'readOnly'}
        />
      </div>
    );
  }
}

LineInput.propTypes = {
  caret: PropTypes.shape({
    getCaretPosition: PropTypes.func.isRequired,
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
