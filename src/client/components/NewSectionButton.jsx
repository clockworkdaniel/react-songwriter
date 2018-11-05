import React from 'react';
import { connect } from 'react-redux';
import { newSection } from '../actions/section-actions';

let NewSectionButton = ({ dispatch }) => {

  return (
    <button
      className="new-section-button"
      type="button"
      onClick={() => { dispatch(newSection()); }}
    >
      New Section
    </button>
  );
};

NewSectionButton = connect()(NewSectionButton);

export default NewSectionButton;
