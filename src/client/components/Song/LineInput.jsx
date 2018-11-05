import React from 'react';

export default class LineInput extends React.Component {
  constructor({
    caretPosition,
    changeLine,
    deleteLine,
    dictateCaret,
    fullLine,
    getCaretAndFocus,
    lineKey,
    resetCaretMonitoring,
    sectionKey
  }) {
    super();
    this.caretPosition = caretPosition;
    this.changeLine = changeLine;
    this.deleteLine = deleteLine;
    this.dictateCaret = dictateCaret;
    this.fullLine = fullLine;
    this.getCaretAndFocus = getCaretAndFocus;
    this.lineKey = lineKey;
    this.resetCaretMonitoring = resetCaretMonitoring;
    this.sectionKey = sectionKey;
  }

  componentDidUpdate() {
    if (this.caretIsBeingSet === true) {
      if (this.sectionFocused === this.sectionKey) {
        if (this.lineFocused === this.lineKey) {

          this.textInput.focus();
          this.textInput.selectionStart = this.caretPosition;
          this.textInput.selectionEnd = this.caretPosition;
          this.resetCaretMonitoring();
        }
      }
    }
  }

  handleChangeLine = (event) => {
    this.changeLine(event.target.value, this.lineKey, this.sectionKey);
  }

  handleKeyDown = (event) => {

    const lineLength = this.fullLine.length;

    // enter
    if (event.keyCode === 13) {
      // pushline to next line, leaving empty line behind
      if (this.caretPosition === 0 && lineLength > 0) {
        this.newLine(this.lineKey, this.sectionKey);
      } else if (this.caretPosition === lineLength) {
        this.newLine(this.lineKey + 1, this.sectionKey);
      } else if (this.caretPosition > 0) {
        this.splitLine(this.lineKey, this.sectionKey, this.caretPosition);
      }
      this.dictateCaret(true, (this.lineKey + 1), this.sectionKey);
    }
    // backspace
    else if (event.keyCode === 8) {
      if (this.caretPosition === 0) {
        if (lineLength > 0) {
          this.dictateCaret(false, (this.lineKey - 1), this.sectionKey);
          event.preventDefault();
          this.joinLines(this.lineKey, this.sectionKey);
        } else {
          // move caret to end of lineBefore
          this.dictateCaret(false, (this.lineKey - 1), this.sectionKey);
          event.preventDefault();
          this.deleteLine(this.lineKey, this.sectionKey);
        }
      }
    }
  }

  getCaretAndPosition = (event) => {
    if (this.caretIsBeingSet === false) {
      this.getCaretAndFocus(
        event.target.selectionStart,
        this.lineKey,
        this.sectionKey
      );
    }
  }

  render() {
    return (
      <div className="line">
        <input
          className="line__lyrics-input"
          type="text"
          value={this.fullLine}
          onChange={this.handleChangeLine}
          onKeyDown={this.handleKeyDown}
          onClick={this.getCaretAndPosition}
          onKeyUp={this.getCaretAndPosition}
          ref={(input) => { this.textInput = input; }}
        />
      </div>
    );
  }

}
