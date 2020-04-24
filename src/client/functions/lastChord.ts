export default function lastChord(line) {

  const { length } = line.characters;
  let chord;

  if (line.characters[length - 1]) {
    // eslint-disable-next-line
    chord = line.characters[length - 1].chord;
  } else {
    chord = ' ';
  }
  return chord;
}
