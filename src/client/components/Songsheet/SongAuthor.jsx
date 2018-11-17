import React from 'react';

export default function SongAuthor({ author, rename }) {

  function handleAuthorRename() {
    const editableText = author;
    const path = ['song', 'author'];
    rename(editableText, 'Edit author', path);
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