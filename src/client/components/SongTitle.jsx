import React from 'react';

export default function SongTitle({ title, rename }) {

  function handleTitleRename() {
    const textToEdit = title;
    const path = ['song', 'title'];
    rename(textToEdit, path);
  }

  return (

    <div>
      <h1 className="song-title controls__container">
        {title}
        <span className="controls">
          <button
            className="controls__edit"
            onClick={handleTitleRename}
            type="button"
          >
            <span className="icon-pencil" />
          </button>
        </span>
      </h1>
    </div>

  );
}
