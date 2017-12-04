import React from 'react';

export default function SongAuthor(props){

	function handleAuthorRename(){
		let textToEdit = props.author;
		let path = ['song', 'author'];
		props.rename(textToEdit, path);
	}

	return (

		<div>
			<h3 className="song-author controls__container">
				{props.author}
				<span className="controls">
					<button className="controls__edit" onClick={handleAuthorRename}>
						<span className="icon-pencil"></span>
					</button>
				</span>
			</h3>
		</div>		
	);
}

	