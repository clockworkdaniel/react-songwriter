const intialState = {
  authorSongList: [],
  songTitle: '',
  uiState: {
    orderLogic: 'alphabetically',
    songPriority: false,
    isAscending: false
  }
};

const songbookReducer = (state = intialState, action) => {
  switch (action.type) {
    // need to change state re loading

    case 'ADD_AUTHORS':
      return Object.assign({}, state, {
        authorSongList: action.authors
      });
    case 'SET_ORDER_LOGIC':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          orderLogic: action.orderLogic
        }
      };
    case 'SET_SONG_PRIORITY':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          songPriority: action.songPriority
        }
      };
    case 'SET_ASCENDING':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          isAscending: action.isAscending
        }
      };
    case 'REMOVE_SONG':
      return {
        ...state,
        authorSongList: state.authorSongList.map((author) => {
          author.songs = author.songs.filter(song => song._id !== action.songId);
          return author;
        })
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
