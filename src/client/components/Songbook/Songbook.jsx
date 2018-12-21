import React from 'react';
import Artist from './Artist';
import Song from './Song';
import UIControls from './UIControls/UIControls';
import { sortAlphabetically, sortByDate, toSongPriority } from '../../functions/arrayStuff';

export default class Songbook extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.handleNewSongModal = this.handleNewSongModal.bind(this);
  }

  componentDidMount() {
    const {
      fetchSongs, fetchSongsBySingleArtist, match, setSongPriority
    } = this.props;
    this.matchesArtistUrl = !!match.url.includes('/artist/');
    if (this.matchesArtistUrl) {
      setSongPriority(true); // defaults to artist priority
      fetchSongsBySingleArtist(match.params.id);
    } else {
      setSongPriority(false); // defaults to song priority
      fetchSongs();
    }
  }

  orderArtistSongList(artistSongList) {
    const {
      uiState: {
        isAscending,
        songPriority,
        orderLogic
      },
    } = this.props;

    if (this.matchesArtistUrl) {
      return artistSongList;
    }

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


  handleNewSongModal() {
    const { newSongModal } = this.props;
    newSongModal();
  }

  render() {
    const {
      artistSongList,
      deleteSongRequest,
      uiState: {
        isAscending,
        songPriority,
        orderLogic
      },
      setOrderLogic,
      setSongPriority,
      setAscending
    } = this.props;

    const sortedArtistSongList = this.orderArtistSongList(artistSongList);

    return (
      <div className="songbook">
        <UIControls
          matchesArtistUrl={this.matchesArtistUrl}
          orderLogic={orderLogic}
          songPriority={songPriority}
          isAscending={isAscending}
          setOrderLogic={setOrderLogic}
          setSongPriority={setSongPriority}
          setAscending={setAscending}
        />
        {(!songPriority || this.matchesArtistUrl) ? (
          <ul className="songbook__artist-list">
            {sortedArtistSongList && sortedArtistSongList.map(artist => (
              <Artist
                key={artist._id}
                name={artist.name}
                _id={artist._id}
                songs={artist.songs}
                matchesArtistUrl={this.matchesArtistUrl}
                orderLogic={orderLogic}
                songPriority={songPriority}
                isAscending={isAscending}
                deleteSongRequest={deleteSongRequest}
              />
            ))}
          </ul>
        ) : (
          <ul className="songbook__song-list">
            {sortedArtistSongList && sortedArtistSongList.map(song => (
              <Song
                key={song._id}
                song={song}
                artistName={song.artist.name}
                orderLogic={orderLogic}
                deleteSongRequest={deleteSongRequest}
                songPriority={songPriority}
              />
            ))}
          </ul>
        )}
        <button
          className="songbook__new-song"
          type="button"
          onClick={this.handleNewSongModal}
        >
          New Song
        </button>
      </div>
    );
  }
}
