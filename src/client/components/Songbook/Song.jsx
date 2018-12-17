import React from 'react';
import { Link } from 'react-router-dom';
  

export default function Song({ song, deleteSongRequest }) {

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
          <Link to={`song/${song._id}`}>
            <button
              className="controls__edit"
              type="button"
            >
              <span className="icon-pencil" />
            </button>
          </Link>
        </div>
      </h3>
    </li>
  );
}
