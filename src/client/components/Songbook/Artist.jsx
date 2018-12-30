import React from 'react';
import { Link } from 'react-router-dom';

import Song from './Song';

export default function Artist({
  _id,
  name,
  songs,
  matchesArtistUrl,
  deleteSongRequest,
  orderLogic,
  songPriority
}) {

  if (!matchesArtistUrl) {
    songs = songs.slice(0, 3);
  }

  return (
    (!!songs.length) && (
      <li className="songbook__artist-item artist">
        <Link to={`/artist/${_id}`}>
          <h4 className="artist__name">
            {name}
          </h4>
        </Link>
        <ul className="artist__song-list">
          {songs && songs.map(song => (
            <Song
              key={song._id}
              song={song}
              artistName={name}
              deleteSongRequest={deleteSongRequest}
              orderLogic={orderLogic}
              songPriority={songPriority}
            />
          ))}
        </ul>
      </li>
    )
  );
}
