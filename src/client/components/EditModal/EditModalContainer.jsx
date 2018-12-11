import { connect } from 'react-redux';

import {
  updateEditableText,
  commitTextChange
} from '../../actions/EditModal/edit-modal-actions';

import EditModal from './EditModal';

const mapStateToProps = state => ({
  editModalState: state.editModalState
});

const mapDispatchToProps = dispatch => ({
  updateEditableText: (updatedText) => {
    dispatch(updateEditableText(updatedText));
  },
  commitTextChange: ({ commitedText, actionToTriggerOnCommit, shouldCloseModal }) => {
    dispatch(commitTextChange({
      commitedText,
      actionToTriggerOnCommit,
      shouldCloseModal
    }));
  }
});

const EditModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModal);

export default EditModalContainer;
