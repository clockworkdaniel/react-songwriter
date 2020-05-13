import { loop, Cmd, LoopReducer } from "redux-loop";

import callApi from "../util/callApi";
import history from "../history";
import { editModalTrigger } from "../actions/Layout/edit-modal-actions";

import {
  newSongRequest,
  newSongSuccess,
  fetchSongsSuccess,
  deleteSongSuccess,
  newSongModalProceed,
  newSongModalSequenceComplete,
  fetchSongsBySingleArtistSuccess
} from "../actions/Songbook/songbook-actions";
import { SongbookUiState } from "../components/Songbook/Songbook";
import Artist from "../types/artist";
import { OrderLogic } from "../types/songbook";
import orderSongs from "../util/orderSongs";
import Song from "../types/song";

interface SongbookState {
  songsByArtist: Artist[];
  orderedSongsByArtist: Artist[];
  orderedSongsBySong: Song[];
  songTitle: string;
  uiState: SongbookUiState;
}

const intialState = {
  songsByArtist: [],
  orderedSongsByArtist: [],
  orderedSongsBySong: [],
  songTitle: "",
  uiState: {
    orderLogic: OrderLogic.Modified,
    isSongPriority: false,
    isAscending: false,
    currentlyFetching: false
  }
};

const songbookReducer: LoopReducer<SongbookState, any> = (
  state = intialState,
  action
) => {
  const existingParams = {
    songsByArtist: state.songsByArtist,
    orderLogic: state.uiState.orderLogic,
    isAscending: state.uiState.isAscending,
    isSongPriority: state.uiState.isSongPriority
  };

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

    case "FETCH_SONGS_SUCCESS": {
      return {
        ...state,
        songsByArtist: action.res.artists,
        ...orderSongs({ ...existingParams, songsByArtist: action.res.artists })
      };
    }

    case "FETCH_SONGS_BY_SINGLE_ARTIST": {
      return loop(
        state,
        Cmd.run(callApi, {
          args: [`artist/${action.artistId}`],
          successActionCreator: fetchSongsBySingleArtistSuccess
        })
      );
    }

    case "FETCH_SONGS_BY_SINGLE_ARTIST_SUCCESS": {
      return {
        ...state,
        songsByArtist: action.res.artists,
        ...orderSongs({
          ...existingParams,
          songsByArtist: action.res.artists,
          isSongPriority: true
        }),
        uiState: {
          ...state.uiState,
          isSongPriority: true
        }
      };
    }

    case "SET_ORDER_LOGIC": {
      return {
        ...state,
        ...orderSongs({ ...existingParams, orderLogic: action.orderLogic }),
        uiState: {
          ...state.uiState,
          orderLogic: action.orderLogic
        }
      };
    }

    case "SET_SONG_PRIORITY": {
      return {
        ...state,
        ...orderSongs({
          ...existingParams,
          isSongPriority: action.isSongPriority
        }),
        uiState: {
          ...state.uiState,
          isSongPriority: action.isSongPriority
        }
      };
    }

    case "SET_ORDER_DIRECTION": {
      return {
        ...state,
        ...orderSongs({ ...existingParams, isAscending: action.isAscending }),
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
      const songsWithSongRemoved = state.songsByArtist.map(artist => {
        artist.songs = artist.songs.filter(
          song => song._id !== action.res.songId
        );
        return artist;
      });
      return {
        ...state,
        songsByArtist: songsWithSongRemoved,
        ...orderSongs({
          ...existingParams,
          songsByArtist: songsWithSongRemoved
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
