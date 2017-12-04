import React from 'react';
import { connect } from 'react-redux';
import { newSection } from '../actions/section-actions.js';

let NewSectionButton = ({dispatch}) => {

	return (
		<button className="new-section-button" 
			onClick={e => {
				dispatch(newSection());
			}
		}>
			New Section
		</button>
	);
};

NewSectionButton = connect()(NewSectionButton);

export default NewSectionButton;
