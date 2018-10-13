import React from 'react';

import UIControls from './UIControls.jsx';
import SongTitle from './SongTitle.jsx';
import SongAuthor from './SongAuthor.jsx';
import Section from './Section.jsx';
import NewSectionButton from './NewSectionButton.jsx';
import EditModalContainer from '../containers/EditModalContainer.jsx';

export default function Songsheet({uiState, song, uiHandlers, sectionHandlers, lineHandlers, rename}) {

	return (

		<div className="song">
			<EditModalContainer/>
			<UIControls 
				chordMode={uiState.chordMode}
				switchMode={uiHandlers.switchMode}
				chordToPaint={uiState.chordToPaint}
				updateChordToPaint={uiHandlers.updateChordToPaint}
				paintSpecificity={uiState.paintSpecificity}
				updatePaintSpecificity={uiHandlers.updatePaintSpecificity}
			/>
			<SongTitle title={song.title} rename={rename} />
			<SongAuthor author={song.author} rename={rename} />
			<div className="song-structure">
				{song.structure.map((section, index) =>
					<Section 
						section={section}
						key={index}
						sectionKey={index}
						chordMode={uiState.chordMode}
						caretPosition={uiState.caretPosition}
						lineFocused={uiState.lineFocused}
						sectionFocused={uiState.sectionFocused}
						changeLine={lineHandlers.changeLine}
						newLine={lineHandlers.newLine}
						deleteLine={lineHandlers.deleteLine}
						splitLine={lineHandlers.splitLine}
						joinLines={lineHandlers.joinLines}
						updateChord={lineHandlers.updateChord}
						getCaretAndFocus={uiHandlers.getCaretAndFocus}
						caretIsBeingSet={uiState.caretIsBeingSet}
						resetCaretMonitoring={uiHandlers.resetCaretMonitoring}
						dictateCaret={lineHandlers.dictateCaret} 					
						deleteSection={sectionHandlers.deleteSection}
						duplicateSection={sectionHandlers.duplicateSection}
						moveSection={sectionHandlers.moveSection}
						rename={rename}
					/>
				)}
			</div>
			<NewSectionButton />
		</div>

	);
	
}




