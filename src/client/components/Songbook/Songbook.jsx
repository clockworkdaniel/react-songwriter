import React from 'react';
import Artist from './Artist';
import Song from './Song';
import UIControls from './UIControls/UIControls';

export default class Songbook extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  componentDidMount() {
    const {
      fetchSongs,
      fetchSongsBySingleArtist,
      match,
      setSongPriority,
      setOrderLogic,
      uiState: {
        orderLogic
      }
    } = this.props;
    this.matchesArtistUrl = !!match.url.includes('/artist/');
    if (this.matchesArtistUrl) {
      setSongPriority(true); // defaults to artist priority
      fetchSongsBySingleArtist(match.params.id);
    } else {
      setSongPriority(false); // defaults to song priority
      (orderLogic === 'created') && setOrderLogic('modified');
      fetchSongs();
    }
  }

  render() {
    const {
      artistSongList,
      orderedArtistSongList,
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

    const artistListJsx = () => {
      if (!this.matchesArtistUrl) {
        return (
          <ul className="songbook__artist-list">
            {orderedArtistSongList && orderedArtistSongList.map(artist => (
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
        );
      }
      return (
        <ul className="songbook__artist-list">
          {(artistSongList.length && orderedArtistSongList) && (
            <Artist
              key={artistSongList[0]._id}
              name={artistSongList[0].name}
              _id={artistSongList[0]._id}
              songs={orderedArtistSongList}
              matchesArtistUrl={this.matchesArtistUrl}
              orderLogic={orderLogic}
              songPriority={songPriority}
              isAscending={isAscending}
              deleteSongRequest={deleteSongRequest}
            />
          )}
        </ul>
      );
    };

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
        {(artistSongList && orderedArtistSongList)
          && (!songPriority || this.matchesArtistUrl) ? (
            artistListJsx()
          ) : (
            <ul className="songbook__song-list">
              {orderedArtistSongList.map(song => (
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
          )
        }
      </div>
    );
  }
}
