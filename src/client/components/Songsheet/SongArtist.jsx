import React from 'react';
import { Link } from 'react-router-dom';

export default function SongArtist({ artist, rename, _id }) {

  function handleArtistRename(event) {
    event.preventDefault();
    const editableText = artist;
    const path = ['song', 'artist', 'name'];
    rename(editableText, 'Edit artist', path);
  }

  return (
    <div>
      <span className="songsheet__by">by</span>
      <Link to={`/artist/${_id}`}>
        <h3 className="songsheet__artist controls__container">
          {artist}
          <span className="controls">
            <button className="controls__edit" onClick={handleArtistRename} type="button">
              <span className="icon-pencil" />
            </button>
          </span>
        </h3>
      </Link>
    </div>
  );
}
