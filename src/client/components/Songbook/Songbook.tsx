import * as React from "react";
import { RouteComponentProps } from "react-router";

import SignInState from "../../types/signInState";
import Artist from "./Artist";
import Song from "./Song";
import UIControls from "./UIControls/UIControls";
import { OrderLogic } from "../../types/songbook";

interface DispatchProps {
  fetchSongs(): void;
  fetchSongsBySingleArtist(artistId: string): void;
  deleteSongRequest(songId: string): void;
  setOrderLogic(orderLogic: OrderLogic): void;
  setSongPriority(songPriority: boolean): void;
  setOrderDirection(ascending: boolean): void;
}

export interface SongbookUiState {
  orderLogic: OrderLogic;
  songPriority: boolean;
  isAscending: boolean;
  currentlyFetching: boolean;
}

interface StateProps {
  // fix
  artistSongList: Array<any>;
  orderedArtistSongList: Array<any>;
  newSong: any;
  uiState: SongbookUiState;
  signInState: SignInState;
}

const matchesArtistUrlTest = match => !!match.url.includes("/artist/");

export default class Songbook extends React.Component<
  DispatchProps & StateProps & RouteComponentProps,
  {}
> {
  componentDidMount() {
    this.dictateFetchType();
  }

  componentDidUpdate(prevProps) {
    const {
      signInState: { isSignedIn }
    } = this.props;
    if (isSignedIn !== prevProps.signInState.isSignedIn) {
      this.dictateFetchType();
    }
  }

  dictateFetchType() {
    const {
      fetchSongs,
      fetchSongsBySingleArtist,
      match,
      setSongPriority,
      setOrderLogic,
      uiState: { orderLogic }
    } = this.props;

    if (matchesArtistUrlTest(match)) {
      setSongPriority(true); // defaults to artist priority
      fetchSongsBySingleArtist("test");
    } else {
      setSongPriority(false); // defaults to song priority
      orderLogic === OrderLogic.Created && setOrderLogic(OrderLogic.Modified);
      fetchSongs();
    }
  }

  render() {
    const {
      artistSongList,
      orderedArtistSongList,
      deleteSongRequest,
      uiState: { isAscending, songPriority, orderLogic },
      setOrderLogic,
      setSongPriority,
      setOrderDirection,
      match
    } = this.props;

    const matchesArtistUrl = matchesArtistUrlTest(match);

    const artistListJsx = () => {
      if (!matchesArtistUrl) {
        return (
          <ul className="songbook__artist-list">
            {orderedArtistSongList &&
              orderedArtistSongList.map(artist => (
                <Artist
                  key={artist._id}
                  artist={artist}
                  matchesArtistUrl={matchesArtistUrl}
                  orderLogic={orderLogic}
                  songPriority={songPriority}
                  // deleteSongRequest={deleteSongRequest}
                />
              ))}
          </ul>
        );
      }
      return (
        <ul className="songbook__artist-list">
          {/* hmmm don't like that naming */}
          {artistSongList.length && !!orderedArtistSongList.length ? (
            <Artist
              key={artistSongList[0]._id}
              artist={artistSongList[0]}
              songs={orderedArtistSongList}
              matchesArtistUrl={matchesArtistUrl}
              orderLogic={orderLogic}
              songPriority={songPriority}
              // deleteSongRequest={deleteSongRequest}
            />
          ) : null}
        </ul>
      );
    };

    return (
      <div className="songbook">
        <UIControls
          matchesArtistUrl={matchesArtistUrl}
          orderLogic={orderLogic}
          songPriority={songPriority}
          isAscending={isAscending}
          setOrderLogic={setOrderLogic}
          setSongPriority={setSongPriority}
          setOrderDirection={setOrderDirection}
        />
        {artistSongList &&
        orderedArtistSongList &&
        (!songPriority || matchesArtistUrl) ? (
          artistListJsx()
        ) : (
          <ul className="songbook__song-list">
            {orderedArtistSongList.map(song => (
              <Song
                key={song._id}
                song={song}
                artistName={song.artist.name}
                orderLogic={orderLogic}
                // don't this we are using this yet
                // deleteSongRequest={deleteSongRequest}
                songPriority={songPriority}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}
