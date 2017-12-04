import React from 'react';

import Character from './Character.jsx';

export default function SplitCharacters(props){

	var splitCharacters = [];

	props.characters.map((character, index) => {

		let chordChange = false;

		if (index === 0 || character.chord !== props.characters[index-1].chord) {
			chordChange = true;
		}

		splitCharacters.push(<Character
			chordChange={chordChange}
			character={character}
			key={index}
			characterKey={index}
			lineKey={props.lineKey}
			sectionKey={props.sectionKey}
			updateChord={props.updateChord} 
			/>
		);
	});

	return (
		<div className="line expanded">
			<p className="line__chord-input">
				{splitCharacters}
			</p>
		</div>
	);
}
