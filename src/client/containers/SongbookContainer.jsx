import { connect } from 'react-redux';

import { getSongs } from '../reducers/songbook-reducer';

import Songbook from '../components/SongBook';

const mapStateToProps = state => ({
  songList: getSongs(state),
});

// const mapDispatchToProps = dispatch => ({
//   getSongs: () => {
//     dispatch(getSongs());
//   }
// });


const SongbookContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Songbook);

export default SongbookContainer;
