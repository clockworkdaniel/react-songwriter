import { connect } from 'react-redux';

import {
  updateTextToEdit,
  commitTextChange
} from '../actions/rename-actions';

import EditModal from '../components/EditModal';

const mapStateToProps = state => {
  return {
    editModalState: state.editModalState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTextToEdit: (updatedText) => {
      dispatch(updateTextToEdit(updatedText));
    },
    commitTextChange: (commitedText) => {
      dispatch(commitTextChange(commitedText));
    },
  };
};

const EditModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModal);

export default EditModalContainer;
