const intialState = {
  authorList: [],
  songTitle: ''
};

const songbookReducer = (state = intialState, action) => {
  switch (action.type) {
    // need to change state re loading

    case 'ADD_AUTHORS':
      return Object.assign({}, state, {
        authorList: action.authors
      });
    // case 'ADD_SONG':
    //   return Object.assign({}, state, {
    //     songList: [...state.songList, action.song]
    //   });
    case 'REMOVE_SONG':
      return Object.assign({}, state, {
        songList: state.songList.filter(song => song._id !== action.songId)
      });

    case 'SET_NEW_SONG_TITLE':
      return Object.assign({}, state, {
        songTitle: action.songTitle
      });

    default:
      return state;
  }
};

export default songbookReducer;
