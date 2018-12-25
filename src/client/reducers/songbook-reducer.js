import { sortAlphabetically, sortByDate, toSongPriority } from '../functions/arrayStuff'; 

const intialState = {
  artistSongList: [],
  orderedArtistSongList: [],
  songTitle: '',
  uiState: {
    orderLogic: 'modified',
    songPriority: false,
    isAscending: false
  }
};

const songbookReducer = (state = intialState, action) => {

  const { uiState } = state;

  function orderArtistSongList({
    artistSongList = state.artistSongList,
    songPriority = uiState.songPriority,
    orderLogic = uiState.orderLogic,
    isAscending = uiState.isAscending
  }) {
    switch (orderLogic) {
      case 'alphabetically':
        if (!songPriority) {
          return sortAlphabetically(artistSongList, 'name', isAscending);
        }
        return sortAlphabetically(toSongPriority(artistSongList), 'title', isAscending);
      case 'modified':
        if (!songPriority) {
          return sortByDate(artistSongList, 'modified', isAscending);
        }
        return sortByDate(toSongPriority(artistSongList), 'modified', isAscending);
      case 'created':
        return sortByDate(toSongPriority(artistSongList), 'created', isAscending);
      default:
        break;
    }
  }

  let songListWithSongRemoved; // only comes into play on song removal

  switch (action.type) {
    // need to change state re loading
    case 'ADD_SONGS':
      return {
        ...state,
        artistSongList: action.artistSongs,
        orderedArtistSongList: orderArtistSongList({ artistSongList: action.artistSongs })
      };
    case 'SET_ORDER_LOGIC':
      return {
        ...state,
        orderedArtistSongList: orderArtistSongList({ orderLogic: action.orderLogic }),
        uiState: {
          ...state.uiState,
          orderLogic: action.orderLogic
        }
      };
    case 'SET_SONG_PRIORITY':
      return {
        ...state,
        orderedArtistSongList: orderArtistSongList({ songPriority: action.songPriority }),
        uiState: {
          ...state.uiState,
          songPriority: action.songPriority
        }
      };
    case 'SET_ASCENDING':
      return {
        ...state,
        orderedArtistSongList: orderArtistSongList({ isAscending: action.isAscending }),
        uiState: {
          ...state.uiState,
          isAscending: action.isAscending
        }
      };
    case 'REMOVE_SONG':
      songListWithSongRemoved = state.artistSongList.map((artist) => {
        artist.songs = artist.songs.filter(song => song._id !== action.songId);
        return artist;
      });
      return {
        ...state,
        artistSongList: songListWithSongRemoved,
        orderedArtistSongList: orderArtistSongList({ artistSongList: songListWithSongRemoved })
      };

    case 'SET_NEW_SONG_TITLE':
      return {
        ...state,
        songTitle: action.songTitle
      };

    default:
      return state;
  }
};

export default songbookReducer;
