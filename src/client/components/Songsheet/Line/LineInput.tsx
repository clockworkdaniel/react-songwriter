import * as React from "react";

type StateProps = {
  getCaretPosition(
    selectionStart: number,
    lineKey: number,
    sectionKey: number
  ): void;
  resetCaretMonitoring(): void;
  updateLine(value: string, lineKey: number, sectionKey: number): void;
  newLine(lineKey: number, sectionKey: number): void;
  deleteLine(lineKey: number, sectionKey: number): void;
  splitLine(lineKey: number, sectionKey: number): void;
  joinLines(linKey: number, sectionKey: number): void;
  uiState: {
    caretIsBeingSet: boolean;
    caretPosition: number;
    lineFocused: number;
    sectionFocused: number;
  };
};

type OwnProps = {
  fullLine: string;
  lineKey: number;
  sectionKey: number;
  isEditable: boolean;
};

export default class LineInput extends React.Component<StateProps & OwnProps> {
  private textInput = React.createRef<HTMLInputElement>();

  componentDidMount() {
    this.setFocusAndCaret();
  }

  componentDidUpdate() {
    this.setFocusAndCaret();
  }

  setFocusAndCaret() {
    const {
      uiState: { caretIsBeingSet, caretPosition, lineFocused, sectionFocused },
      lineKey,
      sectionKey,
      resetCaretMonitoring
    } = this.props;

    if (
      this.textInput.current &&
      caretIsBeingSet === true &&
      sectionFocused === sectionKey &&
      lineFocused === lineKey
    ) {
      this.textInput.current.focus();
      // this.textInput.current.selectionStart = caretPosition;
      // this.textInput.current.selectionEnd = caretPosition;
      // resetCaretMonitoring();
    }
  }

  getCaretPosition = event => {
    const { getCaretPosition, lineKey, sectionKey } = this.props;

    getCaretPosition(event.target.selectionStart, lineKey, sectionKey);
  };

  handleUpdateLine = event => {
    const { updateLine, lineKey, sectionKey } = this.props;
    updateLine(event.target.value, lineKey, sectionKey);
  };

  handleKeyDown = event => {
    const {
      fullLine,
      lineKey,
      sectionKey,
      newLine,
      splitLine,
      joinLines,
      deleteLine,
      uiState: { caretPosition }
    } = this.props;

    const lineLength = fullLine.length;

    // enter
    if (event.keyCode === 13) {
      // push line to next line, leaving empty line behind
      if (caretPosition > 0 && caretPosition < lineLength) {
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
  };

  render() {
    const { fullLine, isEditable } = this.props;

    return (
      <div className="line">
        <input
          className="line__lyrics-input"
          type="text"
          value={fullLine}
          onClick={this.getCaretPosition}
          onKeyUp={this.getCaretPosition}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleUpdateLine}
          ref={this.textInput}
          readOnly={!isEditable}
        />
      </div>
    );
  }
}
