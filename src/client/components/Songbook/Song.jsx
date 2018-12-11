import React from 'react';
import { Link } from 'react-router-dom';
  

export default function Song({ song, deleteSongRequest }) {

  function handleDeleteSong() {
    deleteSongRequest(song._id);
  }

  let author;
  if (song.author) {
    author = song.author.name;
  } else {
    author = 'Unknown Author';
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
          <button
            className="controls__edit"
            type="button"
          >
            <span className="icon-pencil" />
          </button>
        </div>
      </h3>
      <Link to={`author/${song.author._id}`}>
        <h4 className="song__author">
          {author}
        </h4>
      </Link>
    </li>
  );
}
