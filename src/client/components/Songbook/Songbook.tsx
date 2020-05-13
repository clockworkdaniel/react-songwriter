import * as React from "react";
import { RouteComponentProps } from "react-router";

import SignInState from "../../types/signInState";
import Song from "./Song";
import UIControls from "./UIControls/UIControls";
import { OrderLogic } from "../../types/songbook";
import SongListByArtist from "./SongListByArtist";
import Artist from "../../types/artist";
import SongInterface from "../../types/song";

export type DispatchProps = {
  fetchSongs(): void;
  fetchSongsBySingleArtist(artistId: string): void;
  deleteSongRequest(songId: string): void;
  setOrderLogic(orderLogic: OrderLogic): void;
  setIsSongPriority(isSongPriority: boolean): void;
  setOrderDirection(ascending: boolean): void;
};

export type SongbookUiState = {
  orderLogic: OrderLogic;
  isSongPriority: boolean;
  isAscending: boolean;
  currentlyFetching: boolean;
};

export type StateProps = {
  orderedSongsByArtist?: Artist[];
  orderedSongsBySong?: SongInterface[];
  newSong: any;
  uiState: SongbookUiState;
  signInState: SignInState;
};

const matchesArtistUrlTest = match => !!match.url.includes("/artist/");

export default class Songbook extends React.Component<
  DispatchProps & StateProps & RouteComponentProps<{ id: string }>,
  {}
> {
  componentDidMount() {
    this.intialise();
  }

  componentDidUpdate(prevProps) {
    const {
      signInState: { isSignedIn }
    } = this.props;
    if (isSignedIn !== prevProps.signInState.isSignedIn) {
      this.intialise();
    }
  }

  intialise() {
    const {
      fetchSongs,
      fetchSongsBySingleArtist,
      match,
      setIsSongPriority,
      setOrderLogic,
      uiState: { orderLogic }
    } = this.props;

    setIsSongPriority(false);
    if (matchesArtistUrlTest(match)) {
      fetchSongsBySingleArtist(match.params.id);
    } else {
      orderLogic === OrderLogic.Created && setOrderLogic(OrderLogic.Modified);
      fetchSongs();
    }
  }

  render() {
    const {
      deleteSongRequest,
      orderedSongsByArtist,
      orderedSongsBySong,
      setIsSongPriority,
      setOrderDirection,
      setOrderLogic,
      uiState: { isAscending, isSongPriority, orderLogic },
      match
    } = this.props;

    const matchesArtistUrl = matchesArtistUrlTest(match);

    return (
      <div className="songbook">
        <UIControls
          matchesArtistUrl={matchesArtistUrl}
          orderLogic={orderLogic}
          isSongPriority={isSongPriority}
          isAscending={isAscending}
          setOrderLogic={setOrderLogic}
          setIsSongPriority={setIsSongPriority}
          setOrderDirection={setOrderDirection}
        />
        {!isSongPriority && !matchesArtistUrl && orderedSongsByArtist ? (
          <SongListByArtist
            matchesArtistUrl={matchesArtistUrl}
            orderLogic={orderLogic}
            isSongPriority={isSongPriority}
            orderedSongsByArtist={orderedSongsByArtist}
          />
        ) : (
          <ul className="songbook__song-list">
            {orderedSongsBySong &&
              orderedSongsBySong.map(song => (
                <Song
                  key={song._id}
                  song={song}
                  // tslint ignore0nex
                  artistName={song.artist ? song.artist.name : undefined}
                  orderLogic={orderLogic}
                  // don't this we are using this yet
                  // deleteSongRequest={deleteSongRequest}
                  showArtistName={!matchesArtistUrl}
                />
              ))}
          </ul>
        )}
      </div>
    );
  }
}
