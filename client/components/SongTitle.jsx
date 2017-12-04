import React from 'react';

export default function SongTitle(props){
	
	function handleTitleRename(){
		let textToEdit = props.title;
		let path = ['song', 'title'];
		props.rename(textToEdit, path);
	}

	return (

		<div>
			<h1 className="song-title controls__container">
				{props.title}
				<span className="controls">
					<button className="controls__edit" onClick={handleTitleRename}>
						<span className="icon-pencil"></span>
					</button>
				</span>
			</h1>
		</div>

	);
}