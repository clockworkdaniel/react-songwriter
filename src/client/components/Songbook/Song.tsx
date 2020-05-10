import * as React from "react";
import { Link } from "react-router-dom";

import Song from "../../types/song";
import { OrderLogic } from "../../types/songbook";
import SongDate from "./SongDate";

interface Props {
  song: Song;
  artistName: string;
  orderLogic: OrderLogic;
  songPriority: boolean;
}

export default function Song({
  song: { _id, title, created, modified },
  artistName,
  orderLogic,
  songPriority
}: Props) {
  return (
    <Link to={`/song/${_id}`} title={`${title} by ${artistName}`}>
      <li className="song controls__container">
        <h3 className="song__title">{title}</h3>
        {songPriority && <h4 className="song__artist-name">{artistName}</h4>}
        {orderLogic === "created" ? (
          <SongDate label={"Created"} date={created} />
        ) : (
          <SongDate label={"Modified"} date={modified} />
        )}
      </li>
    </Link>
  );
}
