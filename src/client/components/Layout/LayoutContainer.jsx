import { connect } from 'react-redux';

import {
  updateEditableText,
  commitTextChange
} from '../../actions/Layout/edit-modal-actions';

import {
  showSignIn,
  showSignUp,
  hideSignInSignUp,
  updateInputValue,
  attemptSignIn,
  createUser,
  signOut,
  setSignedInState,
  setError,
  setSignUpStage,
  checkForUserDuplication
} from '../../actions/Layout/sign-in-actions';

import { newSongModal } from '../../actions/Songbook/songbook-actions';

import Layout from './Layout';

const mapStateToProps = state => ({
  editModalState: state.layoutState.editModal,
  signInState: state.layoutState.signIn
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
  },
  showSignIn: () => {
    dispatch(showSignIn());
  },
  showSignUp: () => {
    dispatch(showSignUp());
  },
  hideSignInSignUp: () => {
    dispatch(hideSignInSignUp());
  },
  updateInputValue: (form, name, value) => {
    dispatch(updateInputValue(form, name, value));
  },
  setSignedInState: (signedIn) => {
    dispatch(setSignedInState(signedIn));
  },
  attemptSignIn: (usernameOrEmail, password) => {
    dispatch(attemptSignIn(usernameOrEmail, password));
  },
  createUser: (username, email, password) => {
    dispatch(createUser(username, email, password));
  },
  signOut: () => {
    dispatch(signOut());
  },
  newSongModal: () => {
    dispatch(newSongModal());
  },
  setError: (formKey, errorObj) => {
    dispatch(setError(formKey, errorObj));
  },
  setSignUpStage: (stage) => {
    dispatch(setSignUpStage(stage));
  },
  checkForUserDuplication: (username, email) => {
    dispatch(checkForUserDuplication(username, email));
  }
});

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;
