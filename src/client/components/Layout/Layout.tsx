import * as React from "react";

import { Router, Route, Link } from "react-router-dom";

import { getCookie } from "../../functions/cookie";

import history from "../../history";
import EditModal, { EditModalUiState } from "../EditModal/EditModal";
import SongbookContainer from "../Songbook/SongbookContainer";
import SongsheetContainer from "../Songsheet/SongsheetContainer";
import SignIn from "../SignIn/SignIn";
import SignInState from "../../types/signInState";
import { ActionCreator } from "redux";

// refactor
interface StateProps {
  editModalState: EditModalUiState;
  signInState: SignInState;
}

interface DispatchProps {
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
}

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
      editModalState,
      updateEditableText,
      commitTextChange,
      signInState,
      showSignIn,
      showSignUp,
      hideSignInSignUp,
      signInRequest,
      updateInputValue,
      createUser,
      signOutRequest,
      setError,
      setSignUpStage,
      checkForUserDuplication
    } = this.props;

    return (
      <Router history={history}>
        <div className="layout">
          <EditModal
            editModalState={editModalState}
            updateEditableText={updateEditableText}
            commitTextChange={commitTextChange}
          />

          <SignIn
            signInShown={signInState.signInShown}
            signUpShown={signInState.signUpShown}
            signInFormValues={signInState.signInFormValues}
            signUpFormValues={signInState.signUpFormValues}
            showSignIn={showSignIn}
            showSignUp={showSignUp}
            hideSignInSignUp={hideSignInSignUp}
            updateInputValue={updateInputValue}
            signInRequest={signInRequest}
            createUser={createUser}
            setError={setError}
            setSignUpStage={setSignUpStage}
            checkForUserDuplication={checkForUserDuplication}
          />

          <header className="layout__header">
            <nav className="header">
              <ul className="header__nav-list">
                <li className="header__li--title">
                  <Link to="/">
                    <h1 className="header__title">Songbird</h1>
                  </Link>
                </li>
                {signInState.isSignedIn && (
                  <li className="header__li">
                    <button
                      className="songbook__new-song"
                      type="button"
                      onClick={this.handleNewSongModal}
                    >
                      New Song
                    </button>
                  </li>
                )}
                <li className="header__li">
                  <button className="header__link" type="button">
                    Search
                  </button>
                </li>
                {signInState.isSignedIn && (
                  <li className="header__li">
                    <button className="header__link" type="button">
                      Settings
                    </button>
                  </li>
                )}
                {signInState.isSignedIn && (
                  <li className="header__li">
                    <button
                      className="header__link"
                      type="button"
                      onClick={signOutRequest}
                    >
                      Sign out
                    </button>
                  </li>
                )}
                {!signInState.isSignedIn && (
                  <li className="header__li">
                    <button
                      className="header__link"
                      type="button"
                      onClick={showSignIn}
                    >
                      Sign in
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </header>

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