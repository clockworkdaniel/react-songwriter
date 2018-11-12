import { connect } from 'react-redux';

import { 
  fetchSongs,
  newSongRequest,
  deleteSongRequest
} from '../actions/songbook-actions';

import Songbook from '../components/SongBook';

const mapStateToProps = state => ({
  songList: state.songbookState.songList
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
  }
  
});


const SongbookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songbook);

export default SongbookContainer;
