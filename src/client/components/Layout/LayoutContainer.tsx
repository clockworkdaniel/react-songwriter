import { connect } from "react-redux";

import {
  updateEditableText,
  commitTextChange
} from "../../actions/Layout/edit-modal-actions";

import {
  showSignIn,
  showSignUp,
  hideSignInSignUp,
  updateInputValue,
  signInRequest,
  createUser,
  signOutRequest,
  initSignedInState,
  setError,
  setSignUpStage,
  checkForUserDuplication
} from "../../actions/Layout/sign-in-actions";

import { newSongModal } from "../../actions/Songbook/songbook-actions";

import Layout from "./Layout";

const mapStateToProps = state => ({
  editModalState: state.layoutState.editModal,
  signInState: state.layoutState.signIn
});

const mapDispatchToProps = dispatch => ({
  updateEditableText: updatedText => {
    dispatch(updateEditableText(updatedText));
  },
  commitTextChange: ({
    committedText,
    actionToTriggerOnCommit,
    shouldCloseModal
  }) => {
    dispatch(
      commitTextChange({
        committedText,
        actionToTriggerOnCommit,
        shouldCloseModal
      })
    );
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
  initSignedInState: isSignedIn => {
    dispatch(initSignedInState(isSignedIn));
  },
  signInRequest: (usernameOrEmail, password) => {
    dispatch(signInRequest(usernameOrEmail, password));
  },
  createUser: (username, email, password) => {
    dispatch(createUser(username, email, password));
  },
  signOutRequest: () => {
    dispatch(signOutRequest());
  },
  newSongModal: () => {
    dispatch(newSongModal());
  },
  setError: errorObj => {
    dispatch(setError(errorObj));
  },
  setSignUpStage: stage => {
    dispatch(setSignUpStage(stage));
  },
  checkForUserDuplication: (username, email) => {
    dispatch(checkForUserDuplication(username, email));
  }
});

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default LayoutContainer;
