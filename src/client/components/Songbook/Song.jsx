import React from 'react';
import { Link } from 'react-router-dom';


export default function Song({
  song, deleteSongRequest, author, orderLogic
}) {

  function handleDeleteSong() {
    deleteSongRequest(song._id);
  }

  return (
    <li className="song">
      <h3 className="song__title controls__container">
        {song.title}
        <div className="controls">
          <button
            className="controls__delete"
            onClick={handleDeleteSong}
            type="button"
          >
            <span className="icon-cross" />
          </button>
          <Link to={`/song/${song._id}`}>
            <button
              className="controls__edit"
              type="button"
            >
              <span className="icon-pencil" />
            </button>
          </Link>
        </div>
        {author && (
          <Link to={`/author/${author._id}`}>
            <h4 className="song__author-name">
              {author.name}
            </h4>
          </Link>
        )}
        {(orderLogic === 'created') && (
          <p className="song__date">
            <span className="song__date-type">Created on:</span>
            <span className="song__date-date">{song.created}</span>
          </p>
        )}
        {(orderLogic === 'modified') && (
          <p className="song__date">
            <span className="song__date-type">Modified on:</span>
            <span className="song__date-date">{song.modified}</span>
          </p>
        )}
      </h3>
    </li>
  );
}
