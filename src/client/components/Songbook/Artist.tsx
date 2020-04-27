import * as React from "react";
import { Link } from "react-router-dom";

import Artist from "../../types/artist";
import SongInterface from "../../types/song";
import Song from "./Song";

interface Props {
  artist: Artist;
  songs?: SongInterface[];
  matchesArtistUrl: boolean;
  // dunno if implemented yet
  deleteSongRequest?: Function;
  // change
  orderLogic: string;
  songPriority: boolean;
}

export default function Artist({
  artist: { _id, name, songs },
  matchesArtistUrl,
  orderLogic,
  songPriority
}: Props) {
  if (!matchesArtistUrl) {
    songs = songs.slice(0, 3);
  }

  return (
    <li className="songbook__artist-item artist">
      <Link to={`/artist/${_id}`}>
        <h4 className="artist__name">{name}</h4>
      </Link>
      <ul className="artist__song-list">
        {songs &&
          songs.map(song => (
            <Song
              key={song._id}
              song={song}
              artistName={name}
              // deleteSongRequest={deleteSongRequest}
              orderLogic={orderLogic}
              songPriority={songPriority}
            />
          ))}
      </ul>
    </li>
  );
}
