import React from 'react';
import { Link } from 'react-router-dom';
import { sortAlphabetically, sortByDate } from '../../functions/arrayStuff';

import Song from './Song';

export default function Author({
  _id,
  name,
  songs,
  matchesAuthorUrl,
  deleteSongRequest,
  orderLogic,
  isAscending,
  songPriority
}) {

  let songList;

  if (matchesAuthorUrl) {
    switch (orderLogic) {
      case 'alphabetically':
        songList = sortAlphabetically(songs, 'title', isAscending);
        break;
      case 'modified':
        songList = sortByDate(songs, 'modified', isAscending);
        break;
      case 'created':
        songList = sortByDate(songs, 'created', isAscending);
        break;
      default:
        break;
    }
  } else {
    songList = sortByDate(songs, 'modified', isAscending).slice(0, 3);
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
          <Song
            key={song._id}
            song={song}
            authorName={name}
            deleteSongRequest={deleteSongRequest}
            orderLogic={orderLogic}
            songPriority={songPriority}
          />
        ))}
      </ul>
    </li>

  );
}
