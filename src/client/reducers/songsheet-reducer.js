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
    songSaved: false,
    editable: false
  },
  textBeingEditedPathArray: [],
  song: {
    title: '',
    artist: {},
    user: {},
    structure: [],
    isPublic: false
  }
};

const songsheetReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'RENDER_SONG': {
      return update(state, {
        song: { $set: action.song },
        uiState: { editable: { $set: action.editable } }
      });
    }

    case 'SONG_SAVED': {
      return update(state, { uiState: { songSaved: { $set: true } } });
    }

    case 'RESET_SONG_SAVED': {
      return update(state, { uiState: { songSaved: { $set: false } } });
    }

    case 'CHANGE_LINE': {
      return update(state, {
        song: {
          structure: {
            [action.sectionKey]: {
              lines: {
                [action.lineKey]: { fullLine: { $set: action.text } }
              }
            }
          }
        }
      });
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

    case 'PRIVACY_SWITCHED': {
      return update(state, { song: { isPublic: { $set: action.isPublic } } });
    }

    case 'GET_CARET_POSITION': {
      return {
        ...state,
        uiState: {
          ...state.uiState,
          caretPosition: action.caretPosition,
          lineFocused: action.lineKey,
          sectionFocused: action.sectionKey
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

    // new/split/join/delete line

    case 'NEW_LINE': {

      const blankLine = {
        fullLine: '',
        characters: []
      };

      const blankLineBehind = (state.uiState.caretPosition === 0);
      const startPosition = blankLineBehind ? action.lineKey : action.lineKey + 1;

      return update(state, {
        song: {
          structure: {
            [action.sectionKey]: {
              lines: { $splice: [[startPosition, 0, blankLine]] }
            }
          }
        },
        uiState: {
          caretIsBeingSet: { $set: true },
          caretPosition: { $set: 0 },
          lineFocused: { $set: action.lineKey + 1 }
        }
      });

    }

    case 'SPLIT_LINE': {

      const { caretPosition } = state.uiState;

      const { lines } = state.song.structure[action.sectionKey];
      const lineLength = lines[action.lineKey].fullLine.length;

      // check for leading/trailing spaces
      const leadingSpace = (lines[action.lineKey].fullLine.charAt(caretPosition) === ' ');
      const trailingSpace = (lines[action.lineKey].fullLine.charAt(caretPosition - 1) === ' ');

      // adjust split positions based on leading/trailing spaces
      const afterSplitPos = leadingSpace ? caretPosition + 1 : caretPosition;
      const beforeSplitPos = trailingSpace ? caretPosition - 1 : caretPosition;


      const beforeSplit = {
        fullLine: lines[action.lineKey].fullLine.substr(0, beforeSplitPos),
        characters: lines[action.lineKey].characters.splice(0, beforeSplitPos)
      };

      const afterSplit = {
        fullLine: lines[action.lineKey].fullLine.substring(afterSplitPos, lineLength),
        characters: lines[action.lineKey].characters
      };

      afterSplit.fullLine = afterSplit.fullLine.slice(0, 1).toUpperCase() + afterSplit.fullLine.slice(1);
      afterSplit.characters = (leadingSpace || trailingSpace) ? afterSplit.characters.splice(1) : afterSplit.characters;

      return update(state, {
        song: {
          structure: {
            [action.sectionKey]: {
              lines: { $splice: [[action.lineKey, 1, beforeSplit], [action.lineKey + 1, 0, afterSplit]] }
            }
          }
        },
        uiState: {
          caretIsBeingSet: { $set: true },
          caretPosition: { $set: 0 },
          lineFocused: { $set: action.lineKey + 1 }
        }
      });
    }

    case 'DELETE_LINE': {

      if (action.lineKey === 0) return state;

      const section = state.song.structure[action.sectionKey];
      const newCaretPosition = section.lines[(action.lineKey - 1)].fullLine.length;

      return update(state, {
        song: {
          structure: {
            [action.sectionKey]: {
              lines: { $splice: [[action.lineKey, 1]] }
            }
          }
        },
        uiState: {
          caretIsBeingSet: { $set: true },
          caretPosition: { $set: newCaretPosition },
          lineFocused: { $set: action.lineKey - 1 }
        }
      });
    }

    case 'JOIN_LINES': {

      if (action.lineKey === 0) return state;

      const { lines } = state.song.structure[action.sectionKey];
      const thisLine = lines[action.lineKey];
      const prevLine = lines[action.lineKey - 1];

      const prevLineIsEmpty = (prevLine.fullLine.length === 0);

      const thisLinePrepared = prevLineIsEmpty
        ? thisLine.fullLine.slice(0, 1).toUpperCase() + thisLine.fullLine.slice(1)
        : thisLine.fullLine.slice(0, 1).toLowerCase() + thisLine.fullLine.slice(1);

      // join line on to end of previous one
      const joinedLine = {
        fullLine: prevLine.fullLine + (prevLineIsEmpty ? '' : ' ') + thisLinePrepared,
        characters: prevLine.characters.concat({ character: ' ', chord: lastChord(prevLine) }, thisLine.characters)
      };

      return update(state, {
        song: {
          structure: {
            [action.sectionKey]: {
              lines: { $splice: [[action.lineKey - 1, 2, joinedLine]] }
            }
          }
        },
        uiState: {
          caretIsBeingSet: { $set: true },
          caretPosition: { $set: prevLine.fullLine.length + 1 },
          lineFocused: { $set: action.lineKey - 1 }
        }
      });
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
