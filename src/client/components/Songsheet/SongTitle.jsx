import React from 'react';

export default function SongTitle({ title, rename }) {

  function handleTitleRename() {
    const editableText = title;
    const path = ['song', 'title'];
    rename(editableText, 'Rename song', path);
  }

  return (

    <div className="songsheet__title ss-title">
      <h1 className="ss-title__heading controls__container">
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
