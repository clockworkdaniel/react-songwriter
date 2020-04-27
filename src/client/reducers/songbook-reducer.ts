import { loop, Cmd, LoopReducer } from "redux-loop";

import {
  sortAlphabetically,
  sortByDate,
  toSongPriority
} from "../functions/arrayStuff";
import callApi from "../util/callApi";
import history from "../history";
import { editModalTrigger } from "../actions/Layout/edit-modal-actions";

import {
  newSongRequest,
  newSongSuccess,
  fetchSongsSuccess,
  deleteSongSuccess,
  newSongModalProceed,
  newSongModalSequenceComplete
} from "../actions/Songbook/songbook-actions";
import { SongbookUiState } from "../components/Songbook/Songbook";
import Artist from "../types/artist";

interface SongbookState {
  artistSongList: Artist[];
  orderedArtistSongList: string[];
  songTitle: string;
  uiState: SongbookUiState;
}

const intialState = {
  artistSongList: [],
  orderedArtistSongList: [],
  songTitle: "",
  uiState: {
    orderLogic: "modified",
    songPriority: false,
    isAscending: false,
    currentlyFetching: false
  }
};

const songbookReducer: LoopReducer<SongbookState, any> = (
  state = intialState,
  action
) => {
  const { uiState } = state;

  function orderArtistSongList({
    artistSongList = state.artistSongList,
    songPriority = uiState.songPriority,
    orderLogic = uiState.orderLogic,
    isAscending = uiState.isAscending
  }) {
    switch (orderLogic) {
      case "alphabetically":
        if (!songPriority) {
          return sortAlphabetically(artistSongList, "name", isAscending);
        }
        return sortAlphabetically(
          toSongPriority(artistSongList),
          "title",
          isAscending
        );
      case "modified":
        if (!songPriority) {
          return sortByDate(artistSongList, "modified", isAscending);
        }
        return sortByDate(
          toSongPriority(artistSongList),
          "modified",
          isAscending
        );
      case "created":
        return sortByDate(
          toSongPriority(artistSongList),
          "created",
          isAscending
        );
      default:
        break;
    }
  }

  let songListWithSongRemoved; // only comes into play on song removal

  switch (action.type) {
    case "FETCH_SONGS": {
      return loop(
        { ...state, uiState: { ...state.uiState, currentlyFetching: true } },
        Cmd.run(callApi, {
          args: ["artists"],
          successActionCreator: fetchSongsSuccess
        })
      );
    }

    case "FETCH_SONGS_BY_SINGLE_ARTIST": {
      return loop(
        state,
        Cmd.run(callApi, {
          args: [`artist/${action.artistId}`],
          successActionCreator: fetchSongsSuccess
        })
      );
    }

    case "FETCH_SONGS_SUCCESS": {
      return {
        ...state,
        artistSongList: action.res.artists,
        orderedArtistSongList: orderArtistSongList({
          artistSongList: action.res.artists
        })
      };
    }

    case "SET_ORDER_LOGIC": {
      return {
        ...state,
        orderedArtistSongList: orderArtistSongList({
          orderLogic: action.orderLogic
        }),
        uiState: {
          ...state.uiState,
          orderLogic: action.orderLogic
        }
      };
    }

    case "SET_SONG_PRIORITY": {
      return {
        ...state,
        orderedArtistSongList: orderArtistSongList({
          songPriority: action.songPriority
        }),
        uiState: {
          ...state.uiState,
          songPriority: action.songPriority
        }
      };
    }

    case "SET_ORDER_DIRECTION": {
      return {
        ...state,
        orderedArtistSongList: orderArtistSongList({
          isAscending: action.isAscending
        }),
        uiState: {
          ...state.uiState,
          isAscending: action.isAscending
        }
      };
    }

    case "NEW_SONG_REQUEST": {
      return loop(
        state,
        Cmd.run(callApi, {
          args: [
            "song/create",
            "post",
            { title: action.song.title, artist: action.song.artist }
          ],
          successActionCreator: newSongSuccess
        })
      );
    }

    case "NEW_SONG_SUCCESS": {
      return loop(
        state,
        Cmd.run(history.push, { args: [`/song/${action.res.song._id}`] })
      );
    }

    // NOTE: needs reimplementing in the UI when logged in
    case "DELETE_SONG_REQUEST": {
      return loop(
        state,
        Cmd.run(callApi, {
          args: [`song/${action.songId}`, "delete"],
          successActionCreator: deleteSongSuccess
        })
      );
    }

    case "DELETE_SONG_SUCCESS": {
      songListWithSongRemoved = state.artistSongList.map(artist => {
        artist.songs = artist.songs.filter(
          song => song._id !== action.res.songId
        );
        return artist;
      });
      return {
        ...state,
        artistSongList: songListWithSongRemoved,
        orderedArtistSongList: orderArtistSongList({
          artistSongList: songListWithSongRemoved
        })
      };
    }

    case "NEW_SONG_MODAL": {
      return loop(
        state,
        Cmd.action(
          editModalTrigger({
            userPrompt: "Song title",
            actionToTriggerOnCommit: newSongModalProceed,
            shouldCloseModal: false
          })
        )
      );
    }

    case "NEW_SONG_MODAL_PROCEED": {
      return loop(
        { ...state, songTitle: action.songTitle },
        Cmd.action(
          editModalTrigger({
            userPrompt: "Song artist",
            actionToTriggerOnCommit: newSongModalSequenceComplete,
            shouldCloseModal: true
          })
        )
      );
    }

    case "NEW_SONG_MODAL_SEQUENCE_COMPLETE": {
      return loop(
        { ...state, songTitle: action.songTitle },
        Cmd.action(
          newSongRequest({
            title: state.songTitle,
            artist: action.songArtist
          })
        )
      );
    }

    default:
      return state;
  }
};

export default songbookReducer;
