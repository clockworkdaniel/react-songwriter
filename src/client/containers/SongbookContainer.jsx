import { connect } from 'react-redux';

import { fetchSongList } from '../actions/fetch-actions';

import Songbook from '../components/Songbook';

const mapStateToProps = (state) => {
  return {
    songList : state.songbookState.songList,
    isFetching : state.songbookState.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongList: () => {
      dispatch(fetchSongList());
    }
  };
};


const SongbookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songbook);

export default SongbookContainer;
