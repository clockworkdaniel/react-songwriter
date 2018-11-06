import React from 'react';
import PropTypes from 'prop-types';


export default class LineInput extends React.Component {
  constructor(props) {
    super();

    this.getCaretAndFocus = props.getCaretAndFocus;
    this.dictateCaret = props.dictateCaret;
    this.resetCaretMonitoring = props.resetCaretMonitoring;

    this.changeLine = props.changeLine;
    this.newLine = props.newLine;
    this.splitLine = props.splitLine;
    this.joinLines = props.joinLines;
    this.deleteLine = props.deleteLine;

    this.handleChangeLine = this.handleChangeLine.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getCaretAndPosition = this.getCaretAndPosition.bind(this);
  }

  componentDidUpdate() {
    if (this.props.caretIsBeingSet === true) {
      if (this.props.sectionFocused === this.props.sectionKey) {
        if (this.props.lineFocused === this.props.lineKey) {

          this.textInput.focus();
          this.textInput.selectionStart = this.props.caretPosition;
          this.textInput.selectionEnd = this.props.caretPosition;
          this.props.resetCaretMonitoring();
        }
      }
    }
  }

  // called on click and keyup
  getCaretAndPosition(event, caretIsBeingSet, lineKey, sectionKey) {

    console.log(event);

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
      caretIsBeingSet,
      caretPosition,
      lineKey,
      sectionKey
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
  fullLine: PropTypes.string.isRequired,
  lineKey: PropTypes.number.isRequired,
  sectionKey: PropTypes.number.isRequired,
  changeLine: PropTypes.func.isRequired,
  caretPosition: PropTypes.number.isRequired,
  lineFocused: PropTypes.number.isRequired,
  sectionFocused: PropTypes.number.isRequired,
  dictateCaret: PropTypes.func.isRequired,
  caretIsBeingSet: PropTypes.bool.isRequired,
  resetCaretMonitoring: PropTypes.func.isRequired,
  newLine: PropTypes.func.isRequired,
  deleteLine: PropTypes.func.isRequired,
  splitLine: PropTypes.func.isRequired,
  joinLines: PropTypes.func.isRequired,
  getCaretAndFocus: PropTypes.func.isRequired,
};
