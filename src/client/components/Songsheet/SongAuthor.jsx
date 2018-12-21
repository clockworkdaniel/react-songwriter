import React from 'react';
import { Link } from 'react-router-dom';

export default function SongAuthor({ author, rename, _id }) {

  function handleAuthorRename(event) {
    event.preventDefault();
    const editableText = author;
    const path = ['song', 'author', 'name'];
    rename(editableText, 'Edit author', path);
  }

  return (
    <Link to={`/author/${_id}`}>
      <h3 className="songsheet__author controls__container">
        {author}
        <span className="controls">
          <button className="controls__edit" onClick={handleAuthorRename} type="button">
            <span className="icon-pencil" />
          </button>
        </span>
      </h3>
    </Link>
  );
}
