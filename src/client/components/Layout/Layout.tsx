import * as React from "react";

import { Router, Route } from "react-router-dom";

import { getCookie } from "../../util/cookie";

import history from "../../history";
import EditModal, { EditModalUiState } from "../EditModal/EditModal";
import Header from "./Header";
import SongbookContainer from "../Songbook/SongbookContainer";
import SongsheetContainer from "../Songsheet/SongsheetContainer";
import SignIn from "../SignIn/SignIn";
import SignInState from "../../types/signInState";
import { ActionCreator } from "redux";

// refactor
type StateProps = {
  editModalState: EditModalUiState;
  signInState: SignInState;
};

type DispatchProps = {
  updateEditableText(udatedText: string): void;
  commitTextChange(object: {
    committedText: string;
    actionToTriggerOnCommit?: ActionCreator<any>;
    shouldCloseModal?: boolean;
  });
  showSignIn(): void;
  showSignUp(): void;
  hideSignInSignUp(): void;
  updateInputValue(form: string, name: string, value: string): void;
  // is signed in?
  initSignedInState(isSignedIn: any): void;
  signInRequest(usernameOrEmail: string, password: string): void;
  createUser(username: string, email: string, password: string): void;
  signOutRequest(): void;
  newSongModal(): void;
  // need info
  setError(errorObj: any): void;
  // guess
  setSignUpStage(stage: number): void;
  // this should probably be happening serverside?!
  checkForUserDuplication(username: string, email: string): void;
};

export default class Layout extends React.Component<
  StateProps & DispatchProps,
  {}
> {
  componentDidMount() {
    const { initSignedInState } = this.props;
    const sessionCookie = getCookie("connect.sid");
    initSignedInState(!!sessionCookie);
  }

  handleNewSongModal = () => {
    const { newSongModal } = this.props;
    newSongModal();
  };

  render() {
    const {
      checkForUserDuplication,
      commitTextChange,
      createUser,
      editModalState,
      hideSignInSignUp,
      setError,
      setSignUpStage,
      showSignIn,
      showSignUp,
      signInRequest,
      signInState: {
        isSignedIn,
        signInForm,
        signInShown,
        signUpFormValues,
        signUpShown
      },
      signOutRequest,
      updateEditableText,
      updateInputValue
    } = this.props;

    return (
      <Router history={history}>
        <div className="layout">
          <EditModal
            commitTextChange={commitTextChange}
            editModalState={editModalState}
            updateEditableText={updateEditableText}
          />
          <SignIn
            checkForUserDuplication={checkForUserDuplication}
            createUser={createUser}
            hideSignInSignUp={hideSignInSignUp}
            setError={setError}
            setSignUpStage={setSignUpStage}
            showSignIn={showSignIn}
            showSignUp={showSignUp}
            signInForm={signInForm}
            signInRequest={signInRequest}
            signInShown={signInShown}
            signUpFormValues={signUpFormValues}
            signUpShown={signUpShown}
            updateInputValue={updateInputValue}
          />
          <Header
            handleNewSongModal={this.handleNewSongModal}
            isSignedIn={isSignedIn}
            showSignIn={showSignIn}
            signOutRequest={signOutRequest}
          />
          <section className="layout__content">
            <Route exact path="/" component={SongbookContainer} />
            <Route path="/artist/:id" component={SongbookContainer} />
            <Route path="/song/:id" component={SongsheetContainer} />
            {/* <Route exact path="/settings" component={Settings} /> */}
          </section>
        </div>
      </Router>
    );
  }
}
