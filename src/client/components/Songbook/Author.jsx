import React from 'react';
import { Link } from 'react-router-dom';
import { sort } from '../../functions/arrayStuff';

import Song from './Song';

export default function Author({
  _id,
  name,
  songs,
  matchesAuthorUrl,
  deleteSongRequest,
  orderLogic,
  isAscending
}) {

  let songList;

  if (matchesAuthorUrl) {
    songList = sort(songs, 'title', isAscending);
  } else {
    songList = songs.slice(0, 3);
  }

  return (
    <li className="songbook__author-item author">
      <Link to={`/author/${_id}`}>
        <h4 className="author__name">
          {name}
        </h4>
      </Link>
      <ul className="author__song-list">
        {songList && songList.map(song => (
          <Song key={song._id} song={song} deleteSongRequest={deleteSongRequest} orderLogic={orderLogic} />
        ))}
      </ul>
    </li>

  );
}
