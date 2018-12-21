import update from 'immutability-helper';


import breakDownLine from '../functions/breakDownLine';
import lastChord from '../functions/lastChord';

const initialState = {
  uiState: {
    chordMode: false,
    chordToPaint: 'E',
    paintSpecificity: 'word',
    caretPosition: 0,
    lineFocused: 0,
    sectionFocused: 0,
    caretIsBeingSet: false,
    songSaved: false
  },
  textBeingEditedPathArray: [],
  song: {
    title: '',
    artist: {},
    structure: []
  }
};

const songsheetReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'RENDER_SONG': {
      return update(state, { song: { $set: action.song } });
    }

    case 'SONG_SAVED': {
      return update(state, { uiState: { songSaved: { $set: true } } });
    }

    case 'RESET_SONG_SAVED': {
      return update(state, { uiState: { songSaved: { $set: false } } });
    }

    case 'CHANGE_LINE': {
      return update(state,
        { song: { structure: { [action.sectionKey]: { lines: { [action.lineKey]: { fullLine: { $set: action.text } } } } } } });
    }

    case 'UPDATE_CHORD': {

      const lineCopy = JSON.parse(JSON.stringify(state.song.structure[action.sectionKey].lines[action.lineKey]));

      // change chord on per character basis
      if (state.uiState.paintSpecificity === 'character') {
        lineCopy.characters[action.characterKey].chord = state.uiState.chordToPaint;
      }
      // change chord on per word basis
      else if (state.uiState.paintSpecificity === 'word') {
        // assign this character and previous characters in word to given chord
        for (let i = action.characterKey; i > -1 && lineCopy.characters[i].character !== ' '; i--) {
          lineCopy.characters[i].chord = state.uiState.chordToPaint;
        }
        // assign next characters in word to given chord
        for (let i = action.characterKey + 1, end = false; end === false; i++) {
          if (lineCopy.characters[i]) {
            lineCopy.characters[i].chord = state.uiState.chordToPaint;
          }
          end = !!((!lineCopy.characters[i] || lineCopy.characters[i].character === ' '));
        }
      }
      // change chord on per line basis
      else if (state.uiState.paintSpecificity === 'line') {
        lineCopy.characters.map((character) => {
          character.chord = state.uiState.chordToPaint;
        });
      }

      return update(state, { song: { structure: { [action.sectionKey]: { lines: { [action.lineKey]: { $set: lineCopy } } } } } });
    }

    case 'DICTATE_CARET': {

      const uiStateCopy = JSON.parse(JSON.stringify(state.uiState));

      const lengthOfFocusedLine = JSON.parse(JSON.stringify(state.song.structure[action.sectionKey].lines[action.newLineToFocus].fullLine.length));

      const caretPosition = action.frontOfLine ? 0 : lengthOfFocusedLine;

      uiStateCopy.caretIsBeingSet = true;
      uiStateCopy.caretPosition = caretPosition;
      uiStateCopy.lineFocused = action.newLineToFocus;
      uiStateCopy.sectionFocused = action.sectionKey;

      return update(state, { uiState: { $set: uiStateCopy } });
    }

    case 'RESET_CARET_MONITORING': {
      return update(state, { uiState: { caretIsBeingSet: { $set: false } } });
    }

    // song controls

    case 'SWITCH_MODE': {

      const newBool = !state.uiState.chordMode;
      const songCopy = JSON.parse(JSON.stringify(state.song));

      if (!state.uiState.chordMode) {
        songCopy.structure.map((section, index) => {
          const sectionKey = index;
          section.lines.map((line, index) => {
            const { characters } = line;
            const newCharacterArray = breakDownLine(line, characters);

            songCopy.structure[sectionKey].lines[index].characters = newCharacterArray;
          });
        });
      }

      const newState = update(state, {
        uiState: { chordMode: { $set: newBool } },
        song: { $set: songCopy }
      });

      return newState;
    }

    case 'UPDATE_CHORD_TO_PAINT': {
      return update(state, { uiState: { chordToPaint: { $set: action.chord } } });
    }

    case 'UPDATE_PAINT_SPECIFICITY': {
      return update(state, { uiState: { paintSpecificity: { $set: action.newSpecificity } } });
    }

    case 'GET_CARET_AND_FOCUS': {

      const { caretPosition, lineKey, sectionKey } = action;

      return {
        ...state,
        uiState: {
          ...state.uiState,
          caretPosition,
          lineFocused: lineKey,
          sectionFocused: sectionKey
        }
      };
    }

    // section controls

    case 'NEW_SECTION': {
      const blankSection = [{
        sectionName: 'New Section',
        lines: [
          {
            fullLine: '',
            characters: []
          }
        ]
      }];
      return update(state, { song: { structure: { $push: blankSection } } });
    }

    case 'DELETE_SECTION': {
      return update(state, { song: { structure: { $splice: [[action.sectionKey, 1]] } } });
    }

    case 'DUPLICATE_SECTION': {
      const newSection = JSON.parse(JSON.stringify(state.song.structure[action.sectionKey]));
      return update(state, { song: { structure: { $splice: [[action.sectionKey, 0, newSection]] } } });
    }

    case 'MOVE_SECTION': {
      const copiedStructure = JSON.parse(JSON.stringify(state.song.structure));
      let sectionToMove = copiedStructure.splice(action.sectionKey, 1);

      sectionToMove = sectionToMove.pop();
      copiedStructure.splice(action.newPosition, 0, sectionToMove);

      return update(state, { song: { structure: { $set: copiedStructure } } });
    }

    // new/join/delete line

    case 'NEW_LINE': {

      const blankLine = {
        fullLine: '',
        characters: []
      };

      return update(state, {
        song: {
          structure: {
            [action.sectionKey]: {
              lines: { $splice: [[action.lineKey, 0, blankLine]] }
            }
          }
        }
      });

    }

    case 'DELETE_LINE': {
      return update(state, { song: { structure: { [action.sectionKey]: { lines: { $splice: [[action.lineKey, 1]] } } } } });
    }

    case 'SPLIT_LINE': {

      const sectionCopy = JSON.parse(JSON.stringify(state.song.structure[action.sectionKey]));

      const { lines } = sectionCopy;

      const lineLength = sectionCopy.lines[action.lineKey].fullLine.length;

      // check for trailing/leading spaces
      const trailingSpace = lines[action.lineKey].characters[action.caretPosition - 1].character === ' ';
      const leadingSpace = lines[action.lineKey].characters[action.caretPosition].character === ' ';
      // adjust split positions based on trailing/leading spaces
      const beforeSplitPos = trailingSpace ? action.caretPosition - 1 : action.caretPosition;
      const afterSplitPos = leadingSpace ? action.caretPosition + 1 : action.caretPosition;

      const beforeSplit = {
        fullLine: lines[action.lineKey].fullLine.substr(0, beforeSplitPos),
        characters: lines[action.lineKey].characters.splice(0, beforeSplitPos)
      };

      const afterSplit = {
        fullLine: lines[action.lineKey].fullLine.substring(afterSplitPos, lineLength),
        characters: lines[action.lineKey].characters
      };

      afterSplit.fullLine = afterSplit.fullLine.slice(0, 1).toUpperCase() + afterSplit.fullLine.slice(1);

      if (leadingSpace || trailingSpace) {
        afterSplit.characters = afterSplit.characters.splice(1);
      }

      lines.splice(action.lineKey, 1, beforeSplit);
      lines.splice(action.lineKey + 1, 0, afterSplit);

      return update(state, { song: { structure: { [action.sectionKey]: { $set: sectionCopy } } } });
    }

    case 'JOIN_LINES': {

      const sectionCopy = JSON.parse(JSON.stringify(state.song.structure[action.sectionKey]));

      const { lines } = sectionCopy;

      const prevLineIsEmpty = (lines[action.lineKey - 1].fullLine.length === 0);

      lines[action.lineKey].fullLine = prevLineIsEmpty
        ? lines[action.lineKey].fullLine.slice(0, 1).toUpperCase() + lines[action.lineKey].fullLine.slice(1)
        : lines[action.lineKey].fullLine.slice(0, 1).toLowerCase() + lines[action.lineKey].fullLine.slice(1);

      // join line on to end of old one
      lines[action.lineKey - 1] = {
        fullLine: lines[action.lineKey - 1].fullLine + (prevLineIsEmpty ? '' : ' ') + lines[action.lineKey].fullLine,
        characters: lines[action.lineKey - 1].characters.concat({ character: ' ', chord: lastChord(lines[action.lineKey - 1]) }, lines[action.lineKey].characters)
      };

      lines.splice(action.lineKey, 1);

      return update(state, { song: { structure: { [action.sectionKey]: { $set: sectionCopy } } } });
    }

    // edit modal

    case 'UPDATE_TEXT_BEING_EDITED_PATH': {
      return { ...state, textBeingEditedPathArray: action.path };
    }

    case 'UPDATE_EDITED_TEXT': {
      // build up new object from inside out
      let newObject = { $set: action.commitedTextObj };
      const reversedPathArray = state.textBeingEditedPathArray.reverse();
      reversedPathArray.forEach((value) => {
        const newLayer = {};
        newLayer[value] = newObject;
        newObject = newLayer;
      });

      return update(state, newObject);
    }

    // default

    default: {
      return state;
    }

  }
};

export default songsheetReducer;
