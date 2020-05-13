import * as React from "react";
import { Link } from "react-router-dom";

import Song from "../../types/song";
import { OrderLogic } from "../../types/songbook";
import SongDate from "./SongDate";

type Props = {
  song: Song;
  artistName?: string;
  orderLogic: OrderLogic;
  showArtistName?: boolean;
};

export default function Song({
  song: { _id, title, created, modified },
  artistName,
  orderLogic,
  showArtistName
}: Props) {
  return (
    <Link to={`/song/${_id}`} title={`${title} by ${artistName}`}>
      <li className="song controls__container">
        <h3 className="song__title">{title}</h3>
        {showArtistName && <h4 className="song__artist-name">{artistName}</h4>}
        {orderLogic === "created" ? (
          <SongDate label={"Created"} date={created} />
        ) : (
          <SongDate label={"Modified"} date={modified} />
        )}
      </li>
    </Link>
  );
}
