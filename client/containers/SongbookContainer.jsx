import { fetchSongList } from '../actions/fetch-actions.js';

import { connect } from 'react-redux';

import Songbook from '../components/Songbook.jsx';

const mapStateToProps = state => {
	return {
		songList : state.songbookState.songList,
		isFetching : state.songbookState.isFetching
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSongList: () => {
			dispatch(fetchSongList());
		}
	};
};


const SongbookContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Songbook);

export default SongbookContainer;