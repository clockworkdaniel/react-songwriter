import React from 'react';
import EditModalContainer from '../EditModal/EditModalContainer';
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
      <div>
        <EditModalContainer />
        <h1>Blah</h1>
        <button
          type="button"
          onClick={this.handleNewSongModal}
        >
          New Song
        </button>
        <ul className="song-list">
          { songList && songList.map(song => (
            <Song key={song._id} song={song} deleteSongRequest={deleteSongRequest} />
          ))}
        </ul>
      </div>
    );
  }
}
