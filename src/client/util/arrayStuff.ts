import Song from "../types/song";
import Artist from "../types/artist";
import { OrderLogic } from "../types/songbook";

export function sortAlphabetically(array, propToSortBy, isAscending) {
  const sortedArray = array.sort((a, b) => {
    const A = a[propToSortBy].toLowerCase().replace(/\s/gi, "");
    const B = b[propToSortBy].toLowerCase().replace(/\s/gi, "");
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  });

  return isAscending ? sortedArray.reverse() : sortedArray;
}

export function sortByDate(
  array: Song[] | Artist[],
  dateToSortBy: OrderLogic.Modified | OrderLogic.Created,
  isAscending: boolean
) {
  const sortedArray = array.sort((a, b) => {
    if (!a[dateToSortBy] || !b[dateToSortBy]) {
      return 1;
    }
    return (
      new Date(a[dateToSortBy]).getTime() - new Date(b[dateToSortBy]).getTime()
    );
  });

  return isAscending ? sortedArray.reverse() : sortedArray;
}

export function toSongPriority(array) {
  const arraysOfSongsByArtist = array.map(artist =>
    artist.songs.map(song => {
      song.artist = {
        _id: artist._id,
        name: artist.name
      };
      return song;
    })
  );

  return [].concat(...arraysOfSongsByArtist);
}
