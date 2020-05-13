import * as React from "react";
import { Link } from "react-router-dom";

import Artist from "../../types/artist";
import Song from "./Song";
import { OrderLogic } from "../../types/songbook";

type Props = {
  artist: Artist;
  matchesArtistUrl: boolean;
  // dunno if implemented yet
  deleteSongRequest?: Function;
  orderLogic: OrderLogic;
  isSongPriority: boolean;
};

export default function Artist({
  artist: { _id, name, songs },
  matchesArtistUrl,
  orderLogic,
  isSongPriority
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
            />
          ))}
      </ul>
    </li>
  );
}
