import React from 'react';

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
      <h3 className="song__title">
        {song.title}
        <div className="song__controls">
          <a
            className="controls__edit"
          >
            <span className="icon-pencil" />
          </a>
          <button
            className="controls__delete"
            onClick={handleDeleteSong}
            type="button"
          >
            <span className="icon-cross" />
          </button>
        </div>
      </h3>
      <h3 className="song__author">
        {author}
      </h3>
    </li>
  );
}
