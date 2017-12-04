import lastChord from './lastChord.js';

export default function	breakDownLine(line, oldCharacterArray){
	//convert to array of characters
	let splitLine = line.fullLine.split("");
	let splitLineLength = splitLine.length;
	let oldLength = line.characters.length;

	//truncate copy old character array to work with
	let newCharacterArray = oldCharacterArray.slice(0, splitLineLength);

	splitLine.map((character, index) =>{
		//if that character index used to exist keep chord and change character
		if (oldCharacterArray[index]){
			newCharacterArray[index].character = character;
		} 
		//if it didnt make a new character and give it the last chord
		else {
			newCharacterArray.push({"character" : character, "chord" : lastChord(line)});
		}
	});

	return newCharacterArray;

}