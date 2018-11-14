import { connect } from 'react-redux';

import {
  updateEditableText,
  commitTextChange
} from '../actions/EditModal/edit-modal-actions';

import EditModal from '../components/EditModal';

const mapStateToProps = state => ({
  editModalState: state.editModalState
});

const mapDispatchToProps = dispatch => ({
  updateEditableText: (updatedText) => {
    dispatch(updateEditableText(updatedText));
  },
  commitTextChange: (commitedText) => {
    dispatch(commitTextChange(commitedText));
  },
});

const EditModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModal);

export default EditModalContainer;
