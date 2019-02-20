export function fetchSongs() {
  return {
    type: 'FETCH_SONGS'
  };
}

export function fetchSongsBySingleArtist(artistId) {
  return {
    type: 'FETCH_SONGS_BY_SINGLE_ARTIST',
    artistId
  };
}

export function fetchSongsSuccess(res) {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    res
  };
}

export function setOrderLogic(orderLogic) {
  return {
    type: 'SET_ORDER_LOGIC',
    orderLogic
  };
}

export function setSongPriority(songPriority) {
  return {
    type: 'SET_SONG_PRIORITY',
    songPriority
  };
}

export function setOrderDirection(isAscending) {
  return {
    type: 'SET_ORDER_DIRECTION',
    isAscending
  };
}

export function newSongRequest(song) {
  return {
    type: 'NEW_SONG_REQUEST',
    song
  };
}

export function newSongSuccess(res) {
  return {
    type: 'NEW_SONG_SUCCESS',
    res
  };
}

export function deleteSongSuccess(res) {
  return {
    type: 'DELETE_SONG_SUCCESS',
    res
  };
}

export function deleteSongRequest(songId) {
  return {
    type: 'DELETE_SONG_REQUEST',
    songId
  };
}

export function newSongModalSequenceComplete(songArtist) {
  return {
    type: 'NEW_SONG_MODAL_SEQUENCE_COMPLETE',
    songArtist
  };
}

export function newSongModalProceed(songTitle) {
  return {
    type: 'NEW_SONG_MODAL_PROCEED',
    songTitle
  };
}

export function newSongModal() {
  return {
    type: 'NEW_SONG_MODAL'
  };
}
