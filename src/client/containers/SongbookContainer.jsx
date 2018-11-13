import { connect } from 'react-redux';

import { getSongs } from '../reducers/songbook-reducer';

import { editModalTrigger } from '../actions/rename-actions';

import Songbook from '../components/SongBook';

const mapStateToProps = state => ({
  songList: getSongs(state),
});

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => {
    dispatch(fetchSongs());
  },
  newSongRequest: () => {
    dispatch(newSongRequest());
  },
  deleteSongRequest: () => {
    dispatch(deleteSongRequest());
  },
  newText: () => {
    dispatch(editModalTrigger());
  }
  
});


const SongbookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songbook);

export default SongbookContainer;
