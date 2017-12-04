import React from 'react';

export default class LineInput extends React.Component{

	constructor(props){
		super(props);
		this.handleChangeLine = this.handleChangeLine.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.getCaretAndPosition = this.getCaretAndPosition.bind(this);
	}

	handleChangeLine(event){
		this.props.changeLine(event.target.value, this.props.lineKey, this.props.sectionKey);
	}

	handleKeyDown(event){

		let lineLength = this.props.fullLine.length;

		//enter
		if (event.keyCode == 13) {
			//pushline to next line, leaving empty line behind
			if(this.props.caretPosition === 0 && lineLength > 0){
				this.props.newLine(this.props.lineKey, this.props.sectionKey);
			} else if (this.props.caretPosition === lineLength) {
				this.props.newLine(this.props.lineKey+1, this.props.sectionKey);
			} else if (this.props.caretPosition > 0) {
				this.props.splitLine(this.props.lineKey, this.props.sectionKey, this.props.caretPosition);
			}
			this.props.dictateCaret(true, (this.props.lineKey+1), this.props.sectionKey);
		} 
		//backspace
		else if (event.keyCode == 8){
			if (this.props.caretPosition === 0) {
				if (lineLength > 0) {
					this.props.dictateCaret(false, (this.props.lineKey-1), this.props.sectionKey);
					event.preventDefault();
					this.props.joinLines(this.props.lineKey, this.props.sectionKey);	
				} else {
					//move caret to end of lineBefore
					this.props.dictateCaret(false, (this.props.lineKey-1), this.props.sectionKey);
					event.preventDefault();
					this.props.deleteLine(this.props.lineKey, this.props.sectionKey);
				}
			}
		}
	}

	getCaretAndPosition(event){
		if (this.props.caretIsBeingSet === false) {
			this.props.getCaretAndFocus(event.target.selectionStart, this.props.lineKey, this.props.sectionKey);
		}
	}

	componentDidUpdate(){
		if (this.props.caretIsBeingSet === true) {
			if(this.props.sectionFocused === this.props.sectionKey) {
				if( this.props.lineFocused === this.props.lineKey) {

					this.textInput.focus();
					this.textInput.selectionStart = this.props.caretPosition;
					this.textInput.selectionEnd = this.props.caretPosition;
					this.props.resetCaretMonitoring();
				}
			}
		}
	}

	render(){

		return ( 
			<div className="line">
				<input
					className="line__lyrics-input" 
					type="text"
					value={this.props.fullLine}
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