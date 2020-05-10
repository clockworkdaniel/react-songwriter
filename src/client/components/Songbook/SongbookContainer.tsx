import { connect } from "react-redux";

import {
  fetchSongs,
  fetchSongsBySingleArtist,
  deleteSongRequest,
  setOrderLogic,
  setSongPriority,
  setOrderDirection
} from "../../actions/Songbook/songbook-actions";

import Songbook from "./Songbook";

const mapStateToProps = state => ({
  artistSongList: state.songbookState.artistSongList,
  orderedArtistSongList: state.songbookState.orderedArtistSongList,
  newSong: state.songbookState.newSong,
  uiState: state.songbookState.uiState,
  signInState: state.layoutState.signIn
});

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => {
    dispatch(fetchSongs());
  },
  fetchSongsBySingleArtist: artistId => {
    dispatch(fetchSongsBySingleArtist(artistId));
  },
  deleteSongRequest: songId => {
    dispatch(deleteSongRequest(songId));
  },
  setOrderLogic: orderLogic => {
    dispatch(setOrderLogic(orderLogic));
  },
  setSongPriority: songPriority => {
    dispatch(setSongPriority(songPriority));
  },
  setOrderDirection: ascending => {
    dispatch(setOrderDirection(ascending));
  }
});

const SongbookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Songbook);

export default SongbookContainer;
