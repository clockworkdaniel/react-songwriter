import { connect } from 'react-redux';

import {
  updateEditableText,
  commitTextChange
} from '../../actions/EditModal/edit-modal-actions';

import Layout from './Layout';

const mapStateToProps = state => ({
  editModalState: state.layoutState.editModal
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

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;
