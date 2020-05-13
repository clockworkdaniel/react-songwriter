import { OrderLogic } from "../../types/songbook";
import Song from "../../types/song";

export function fetchSongs() {
  return {
    type: "FETCH_SONGS"
  };
}

export function fetchSongsBySingleArtist(artistId: string) {
  return {
    type: "FETCH_SONGS_BY_SINGLE_ARTIST",
    artistId
  };
}

export function fetchSongsSuccess(res) {
  return {
    type: "FETCH_SONGS_SUCCESS",
    res
  };
}

export function fetchSongsBySingleArtistSuccess(res) {
  return {
    type: "FETCH_SONGS_BY_SINGLE_ARTIST_SUCCESS",
    res
  };
}

export function setOrderLogic(orderLogic: OrderLogic) {
  return {
    type: "SET_ORDER_LOGIC",
    orderLogic
  };
}

export function setIsSongPriority(isSongPriority: boolean) {
  return {
    type: "SET_SONG_PRIORITY",
    isSongPriority
  };
}

export function setOrderDirection(isAscending: boolean) {
  return {
    type: "SET_ORDER_DIRECTION",
    isAscending
  };
}

export function newSongRequest(song: Partial<Song>) {
  return {
    type: "NEW_SONG_REQUEST",
    song
  };
}

export function newSongSuccess(res) {
  return {
    type: "NEW_SONG_SUCCESS",
    res
  };
}

export function deleteSongSuccess(res) {
  return {
    type: "DELETE_SONG_SUCCESS",
    res
  };
}

export function deleteSongRequest(songId: string) {
  return {
    type: "DELETE_SONG_REQUEST",
    songId
  };
}

export function newSongModalSequenceComplete(songArtist) {
  return {
    type: "NEW_SONG_MODAL_SEQUENCE_COMPLETE",
    songArtist
  };
}

export function newSongModalProceed(songTitle: string) {
  return {
    type: "NEW_SONG_MODAL_PROCEED",
    songTitle
  };
}

export function newSongModal() {
  return {
    type: "NEW_SONG_MODAL"
  };
}
