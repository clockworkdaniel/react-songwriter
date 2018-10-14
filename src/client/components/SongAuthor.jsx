import React from 'react';

export default function SongAuthor({ author }) {

  function handleAuthorRename() {
    const textToEdit = props.author;
    const path = ['song', 'author'];
    props.rename(textToEdit, path);
  }

  return (

    <div>
      <h3 className="song-author controls__container">
        {author}
        <span className="controls">
          <button className="controls__edit" onClick={handleAuthorRename} type="button">
            <span className="icon-pencil" />
          </button>
        </span>
      </h3>
    </div>
  );
}
