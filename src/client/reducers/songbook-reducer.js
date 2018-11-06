

const intialState = {
  songList: []
};

const songbookReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      return Object.assign({}, state, {
        songList: [action.song, ...state.songList]
      });
    case 'ADD_SONGS':
      return {
        songList: action.songs
      };
    case 'DELETE_SONG':
      return {
        songList: state.songList.filter(song => song.songId !== action.songId)
      };
    default:
      return state;
  }
};

export const getSongs = state => state.songList;

export const getSong = (state, songId) => state.songList.data.filter(song => song.songId === songId)[0];

export default songbookReducer;
