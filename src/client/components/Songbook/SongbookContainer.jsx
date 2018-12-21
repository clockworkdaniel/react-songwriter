import { connect } from 'react-redux';

import {
  fetchSongs,
  fetchSongsBySingleAuthor,
  newSongModal,
  deleteSongRequest,
  setOrderLogic,
  setSongPriority,
  setAscending
} from '../../actions/Songbook/songbook-actions';

import Songbook from './Songbook';

const mapStateToProps = state => ({
  authorSongList: state.songbookState.authorSongList,
  newSong: state.songbookState.newSong,
  uiState: state.songbookState.uiState
});

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => {
    dispatch(fetchSongs());
  },
  fetchSongsBySingleAuthor: (authorId) => {
    dispatch(fetchSongsBySingleAuthor(authorId));
  },
  deleteSongRequest: (songId) => {
    dispatch(deleteSongRequest(songId));
  },
  newSongModal: () => {
    dispatch(newSongModal());
  },
  setOrderLogic: (orderLogic) => {
    dispatch(setOrderLogic(orderLogic));
  },
  setSongPriority: (songPriority) => {
    dispatch(setSongPriority(songPriority));
  },
  setAscending: (ascending) => {
    dispatch(setAscending(ascending));
  }
});


const SongbookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songbook);

export default SongbookContainer;
