export function sortAlphabetically(array, propToSortBy, isAscending) {

  const sortedArray = array.sort((a, b) => {
    const A = a[propToSortBy].toLowerCase().replace(/\s/gi, '');
    const B = b[propToSortBy].toLowerCase().replace(/\s/gi, '');
    if (A < B) { return -1; }
    if (A > B) { return 1; }
    return 0;
  });

  return isAscending ? sortedArray.reverse() : sortedArray;

}

export function sortByDate(array, dateToSortBy, isAscending) {

  const sortedArray = array.sort((a, b) => new Date(a[dateToSortBy]) - new Date(b[dateToSortBy]));

  return isAscending ? sortedArray : sortedArray.reverse();
}

export function toSongPriority(array) {

  const arraysOfSongsByAuthor = array.map(author => author.songs.map((song) => {
    song.author = {
      _id: author._id,
      name: author.name
    };
    return song;
  }));

  return [].concat(...arraysOfSongsByAuthor);
}
