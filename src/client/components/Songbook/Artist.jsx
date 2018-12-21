import React from 'react';
import { Link } from 'react-router-dom';
import { sortAlphabetically, sortByDate } from '../../functions/arrayStuff';

import Song from './Song';

export default function Artist({
  _id,
  name,
  songs,
  matchesArtistUrl,
  deleteSongRequest,
  orderLogic,
  isAscending,
  songPriority
}) {

  let songList;

  if (matchesArtistUrl) {
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
    <li className="songbook__artist-item artist">
      <Link to={`/artist/${_id}`}>
        <h4 className="artist__name">
          {name}
        </h4>
      </Link>
      <ul className="artist__song-list">
        {songList && songList.map(song => (
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

  );
}
