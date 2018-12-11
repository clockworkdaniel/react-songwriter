import React from 'react';
import Song from './Song';

export default class Songbook extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.handleNewSongModal = this.handleNewSongModal.bind(this);
  }

  componentDidMount() {
    const { fetchSongs } = this.props;
    fetchSongs();
  }

  handleNewSongModal() {
    const { newSongModal } = this.props;
    newSongModal();
  }

  render() {
    const { songList, deleteSongRequest } = this.props;
    return (
      <div className="songbook">
        <ul className="songbook__list">
          { songList && songList.map(song => (
            <Song key={song._id} song={song} deleteSongRequest={deleteSongRequest} />
          ))}
        </ul>
        <button
          className="songbook__new-song"
          type="button"
          onClick={this.handleNewSongModal}
        >
          New Song
        </button>
      </div>
    );
  }
}
