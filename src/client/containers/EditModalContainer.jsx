import { connect } from 'react-redux';

import {
  updateTextToEdit,
  commitTextChange
} from '../actions/rename-actions';

import EditModal from '../components/EditModal';

const mapStateToProps = state => ({
  editModalState: state.editModalState
});

// const mapDispatchToProps = dispatch => ({
//   updateTextToEdit: (updatedText) => {
//     dispatch(updateTextToEdit(updatedText));
//   },
//   commitTextChange: (commitedText) => {
//     dispatch(commitTextChange(commitedText));
//   },
// });

const EditModalContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(EditModal);

export default EditModalContainer;
