

const intialState = {
  songList: []
};

const songbookReducer = (state = intialState, action) => {
  switch (action.type) {
    // need to change state re loading
      
    case 'ADD_SONGS':
      return Object.assign({}, state, {
        songList: action.songs
      });
    case 'ADD_SONG':
      return Object.assign({}, state, {
        songList: [action.song, ...state.songList]
      });
    case 'REMOVE_SONG':
      return Object.assign({}, state, {
        songList: state.songList.filter(song => song.songId !== action.songId)
      });
    default:
      return state;
  }
};

export default songbookReducer;
