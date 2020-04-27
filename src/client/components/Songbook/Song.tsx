import * as React from "react";
import { Link } from "react-router-dom";
import niceDate from "../../functions/niceDate";

import Song from "../../types/song";

interface Props {
  song: Song;
  artistName: string;
  // change
  orderLogic: string;
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
        <h3 className="song__title ">{title}</h3>
        {songPriority && <h4 className="song__artist-name">{artistName}</h4>}
        {orderLogic === "created" ? (
          <p className="song__date">
            <span className="song__date-type">Created on: </span>
            <span className="song__date-date">{niceDate(created)}</span>
          </p>
        ) : (
          <p className="song__date">
            <span className="song__date-type">Modified on: </span>
            <span className="song__date-date">{niceDate(modified)}</span>
          </p>
        )}
      </li>
    </Link>
  );
}
