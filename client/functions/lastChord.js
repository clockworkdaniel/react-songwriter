export default function lastChord(line){
	var length = line.characters.length;
	var chord;
	if (line.characters[length - 1]) {
		chord = line.characters[length - 1].chord;
	} else {
		chord = " ";
	}
	
	return chord;
}