import { connect } from 'react-redux';

import {
  updateEditableText,
  commitTextChange
} from '../../actions/Layout/edit-modal-actions';

import {
  showSignIn,
  showSignUp,
  hideSignInSignUp,
  updateSignInInputValue,
  attemptSignIn,
  updateSignUpInputValue,
  createUser,
  signOut,
  setSignedInState
} from '../../actions/Layout/sign-in-actions';

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
  updateSignInInputValue: (name, value) => {
    dispatch(updateSignInInputValue(name, value));
  },
  setSignedInState: (signedIn) => {
    dispatch(setSignedInState(signedIn));
  },
  attemptSignIn: (usernameOrEmail, password) => {
    dispatch(attemptSignIn(usernameOrEmail, password));
  },
  updateSignUpInputValue: (name, value) => {
    dispatch(updateSignUpInputValue(name, value));
  },
  createUser: (username, email, password) => {
    dispatch(createUser(username, email, password));
  },
  signOut: () => {
    dispatch(signOut());
  }
});

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;
