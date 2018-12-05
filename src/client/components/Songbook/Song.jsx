import React from 'react';

export default function Song({ song, deleteSongRequest }) {

  // function handleRenameSong() {
  //   renameSong(song._id);
  // }

  function handleDeleteSong() {
    deleteSongRequest(song._id);
  }

  return (
    <li>
      <h3>{song.title}</h3>
      <h3>{song.author.name}</h3>
      {/* <button
        type="button"
        onClick={handleRenameSong}
      >
        Rename Song
      </button> */}
      <button
        type="button"
        onClick={handleDeleteSong}
      >
        Delete Song
      </button>
    </li>
  );
}
