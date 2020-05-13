import { OrderLogic } from "../types/songbook";
import { sortAlphabetically, toSongPriority, sortByDate } from "./arrayStuff";
import Artist from "../types/artist";

type CommonParams = {
  songsByArtist: Artist[];
  orderLogic: OrderLogic;
  isAscending: boolean;
};

export function orderSongsByArtist({
  songsByArtist,
  orderLogic,
  isAscending
}: CommonParams) {
  switch (orderLogic) {
    case OrderLogic.Alphabetical:
      return sortAlphabetically(songsByArtist, "name", isAscending);
    case OrderLogic.Modified:
      return sortByDate(songsByArtist, OrderLogic.Modified, isAscending);
    case OrderLogic.Created:
      return sortByDate(songsByArtist, OrderLogic.Created, isAscending);
    default:
      break;
  }
}

export function orderSongsBySong({
  songsByArtist,
  orderLogic,
  isAscending
}: CommonParams) {
  const songsBySong = toSongPriority(songsByArtist);
  switch (orderLogic) {
    case OrderLogic.Alphabetical:
      return sortAlphabetically(songsBySong, "title", isAscending);
    case OrderLogic.Modified:
      return sortByDate(songsBySong, OrderLogic.Modified, isAscending);
    case OrderLogic.Created:
      return sortByDate(songsBySong, OrderLogic.Created, isAscending);
    default:
      break;
  }
}

export default function orderSongs({
  isSongPriority,
  songsByArtist,
  orderLogic,
  isAscending
}: CommonParams & { isSongPriority: boolean }) {
  if (isSongPriority) {
    return {
      orderedSongsBySong: orderSongsBySong({
        songsByArtist,
        orderLogic,
        isAscending
      })
    };
  }
  return {
    orderedSongsByArtist: orderSongsByArtist({
      songsByArtist,
      orderLogic,
      isAscending
    })
  };
}
