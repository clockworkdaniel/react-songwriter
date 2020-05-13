import { connect } from "react-redux";

import {
  fetchSongs,
  fetchSongsBySingleArtist,
  deleteSongRequest,
  setOrderLogic,
  setIsSongPriority,
  setOrderDirection
} from "../../actions/Songbook/songbook-actions";

import Songbook, { StateProps, DispatchProps } from "./Songbook";

const mapStateToProps = (state): StateProps => ({
  newSong: state.songbookState.newSong,
  orderedSongsByArtist: state.songbookState.orderedSongsByArtist,
  orderedSongsBySong: state.songbookState.orderedSongsBySong,
  signInState: state.layoutState.signIn,
  uiState: state.songbookState.uiState
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
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
  setIsSongPriority: isSongPriority => {
    dispatch(setIsSongPriority(isSongPriority));
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
