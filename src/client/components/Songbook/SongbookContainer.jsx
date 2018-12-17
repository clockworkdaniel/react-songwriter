import { connect } from 'react-redux';

import {
  fetchAuthors,
  fetchSongsByAuthor,
  newSongModal,
  deleteSongRequest
} from '../../actions/Songbook/songbook-actions';

import Songbook from './Songbook';

const mapStateToProps = state => ({
  authorList: state.songbookState.authorList,
  newSong: state.songbookState.newSong
});

const mapDispatchToProps = dispatch => ({
  fetchAuthors: () => {
    dispatch(fetchAuthors());
  },
  fetchSongsByAuthor: (authorId) => {
    dispatch(fetchSongsByAuthor(authorId));
  },
  deleteSongRequest: (songId) => {
    dispatch(deleteSongRequest(songId));
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
