import React from 'react';
import { Link } from 'react-router-dom';
import niceDate from '../../functions/niceDate';


export default function Song({
  song, artistName, orderLogic, songPriority
}) {

  return (
    <Link to={`/song/${song._id}`} title={`${song.title} by ${artistName}`}>
      <li className="song controls__container">
        <h3 className="song__title ">
          {song.title}
        </h3>
        {songPriority && (
          <h4 className="song__artist-name">
            {artistName}
          </h4>
        )}
        {(orderLogic === 'created') ? (
          <p className="song__date">
            <span className="song__date-type">Created on: </span>
            <span className="song__date-date">{niceDate(song.created)}</span>
          </p>
        ) : (
          <p className="song__date">
            <span className="song__date-type">Modified on: </span>
            <span className="song__date-date">{niceDate(song.modified)}</span>
          </p>
        )}
      </li>
    </Link>
  );
}
