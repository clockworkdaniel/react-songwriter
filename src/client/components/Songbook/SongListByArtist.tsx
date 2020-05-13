import * as React from "react";
import { OrderLogic } from "../../types/songbook";
import Artist from "./Artist";
import ArtistInterface from "../../types/artist";

type Props = {
  isSongPriority: boolean;
  matchesArtistUrl: boolean;
  orderLogic: OrderLogic;
  orderedSongsByArtist: ArtistInterface[];
};

export default function SongListByArtist({
  matchesArtistUrl,
  orderedSongsByArtist,
  orderLogic,
  isSongPriority
}: Props) {
  return (
    <ul className="songbook__artist-list">
      {orderedSongsByArtist &&
        orderedSongsByArtist.map(artist => (
          <Artist
            key={artist._id}
            artist={artist}
            matchesArtistUrl={matchesArtistUrl}
            orderLogic={orderLogic}
            isSongPriority={isSongPriority}
            // deleteSongRequest={deleteSongRequest}
          />
        ))}
    </ul>
  );
}
