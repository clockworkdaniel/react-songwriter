import React from 'react';
import { shallow } from 'enzyme';
import Songsheet from './Songsheet';

import mockStructure from '../../../server/mockStructures/RockyRacoon';
import { initialState } from '../../reducers/songsheet-reducer';

describe('Songsheet', () => {

  const wrapper = shallow(
    <Songsheet
      fetchSong={jest.fn()}
      uiState={{ ...initialState.uiState }}
      song={{
        _id: '5c6415032bff251e109178e3',
        title: 'Rocky Racoon',
        artist: {
          _id: '5c6415022bff251e109178d4',
          name: 'The Beatles'
        },
        user: {
          _id: '5c6415032bff251e109178db',
          username: 'Han_Solo'
        },
        structure: mockStructure,
        isPublic: false
      }}
      match={{ params: { id: '5c6415032bff251e109178e3' } }}
      signInState={{ signedIn: true }}
      uiHandlers={{
        saveSongRequest: jest.fn(),
        resetSongSaved: jest.fn(),
        switchMode: jest.fn(),
        updateChordToPaint: jest.fn(),
        updatePainSpecificity: jest.fn()
      }}
      chord={{update: jest.fn()}}
      sectionHandlers={{
        deleteSection: jest.fn(),
        duplicateSection: jest.fn(),
        moveSection: jest.fn(),
        newSection: jest.fn()
      }}
      rename={jest.fn()}
      switchPrivacyRequest={jest.fn()}
    />
  );

  it('only renders the new section button when the song is editable', () => {
    expect(wrapper.find('NewSectionButton').length).toBe(0);
    wrapper.setProps({ uiState: { ...initialState.uiState, editable: true } });
    expect(wrapper.find('NewSectionButton').length).toBe(1);
  });
});
