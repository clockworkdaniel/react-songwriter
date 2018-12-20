import React from 'react';
import { Link } from 'react-router-dom';
import niceDate from '../../functions/niceDate';


export default function Song({
  song, deleteSongRequest, author, orderLogic
}) {

  function handleDeleteSong(event) {
    event.preventDefault();
    deleteSongRequest(song._id);
  }

  return (
    <Link to={`/song/${song._id}`}>
      <li className="song controls__container">
        <h3 className="song__title ">
          {song.title}
        </h3>
        <div className="controls">
          <button
            className="controls__edit"
            type="button"
          >
            <span className="icon-pencil" />
          </button>
          <button
            className="controls__delete"
            onClick={handleDeleteSong}
            type="button"
          >
            <span className="icon-cross" />
          </button>
        </div>
        {author && (
          <h4 className="song__author-name">
            {author.name}
          </h4>
        )}
        {(orderLogic === 'created') ? (
          <p className="song__date">
            <span className="song__date-type">Created on: </span>
            <span className="song__date-date">{niceDate(song.created)}</span>
          </p>
        ) : (
          <p className="song__date">
            <span className="song__date-type">Modified on: </span>
            <span className="song__date-date">{niceDate(song.modified)}</span>
          </p>
        )}
      </li>
    </Link>
  );
}
