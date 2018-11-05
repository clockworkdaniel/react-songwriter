import React from 'react';

export default class Songbook extends React.Component {
  constructor({ fetchSongList }) {
    super({ fetchSongList });
    this.fetchSongList = fetchSongList;
  }

  componentDidMount() {
    this.fetchSongList();
  }

  render() {
    const { songList } = this.props;

    return (
      <div>
        <h1>Blah</h1>
        <ul className="song-list">
          { songList.length && songList.map((song, index) => (
            <li key={index}>
              <h3>{song.title}</h3>
              <h3>{song.author}</h3>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
