import { connect } from 'react-redux';

import {
  fetchSongs,
  newSongModal,
  deleteSongRequest
} from '../actions/Songbook/songbook-actions';

import Songbook from '../components/Songbook';

const mapStateToProps = state => ({
  songList: state.songbookState.songList,
  newSong: state.songbookState.newSong
});

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => {
    dispatch(fetchSongs());
  },
  deleteSongRequest: () => {
    dispatch(deleteSongRequest());
  },
  newSongModal: () => {
    dispatch(newSongModal());
  }

});


const SongbookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songbook);

export default SongbookContainer;
