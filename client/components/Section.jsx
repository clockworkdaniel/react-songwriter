import React from 'react';

import Line from './Line.jsx';

export default function Section(props) {

	function handleDelete(){
		props.deleteSection(props.sectionKey);
	}

	function handleDuplicate(){
		props.duplicateSection(props.sectionKey);
	}

	function handleRename(){
		let textToEdit = props.section.sectionName;
		let path = ['song', 'structure', Number(props.sectionKey), 'sectionName'];
		props.rename(textToEdit, path);
	}

	function handleMoveUp(){
		props.moveSection(props.sectionKey, props.sectionKey-1);
	}

	function handleMoveDown(){
		props.moveSection(props.sectionKey, props.sectionKey+1);
	}

	return (
		<div className="song-section">
			<div className="song-section__top-labels">
				<div className="song-section__controls">
					<button className="controls__edit" onClick={handleRename}>
						<span className="icon-pencil"></span>
					</button>
					<button className="controls__duplicate" onClick={handleDuplicate}>
						<span className="icon-copy"></span>
					</button>
					<button className="controls__delete" onClick={handleDelete}>
						<span className="icon-cross"></span>
					</button>
				</div>
				<h4 className="song-section__name">
					{props.section.sectionName}
					<span className="song-section__move-labels">
						<button className="controls__move-up" onClick={handleMoveUp}>
							<span className="icon-move-up"></span>
						</button>
						<button className="controls__move-down" onClick={handleMoveDown}>
							<span className="icon-move-down"></span>
						</button>						
					</span>
				</h4>
			</div>
			<div className="lines">
				{props.section.lines.map((line, index) =>
					<Line
						line={line}
						key={index}
						lineKey={index}
						sectionKey={props.sectionKey}
						changeLine={props.changeLine}
						chordMode={props.chordMode}
						updateChord={props.updateChord}
						caretPosition={props.caretPosition}
						lineFocused={props.lineFocused}
						sectionFocused={props.sectionFocused}
						dictateCaret={props.dictateCaret}
						caretIsBeingSet={props.caretIsBeingSet}
						resetCaretMonitoring={props.resetCaretMonitoring}
						newLine={props.newLine}
						deleteLine={props.deleteLine}
						splitLine={props.splitLine}
						joinLines={props.joinLines}
						getCaretAndFocus={props.getCaretAndFocus}
					/>
				)}
				</div>
		</div>
	);
	
}