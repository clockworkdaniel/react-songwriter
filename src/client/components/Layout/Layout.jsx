import React from 'react';

import {
  Router,
  Route,
  Link
} from 'react-router-dom';

import { getCookie } from '../../functions/cookie';

import history from '../../history';
import EditModal from '../EditModal/EditModal';
import SongbookContainer from '../Songbook/SongbookContainer';
import SongsheetContainer from '../Songsheet/SongsheetContainer';
import SignIn from '../SignIn/SignIn';

export default class Layout extends React.Component {

  componentDidMount() {
    const { setSignedInState } = this.props;
    const sessionCookie = getCookie('connect.sid');
    setSignedInState(!!sessionCookie);
  }

  render() {
    const {
      editModalState,
      updateEditableText,
      commitTextChange,
      signInState,
      showSignIn,
      showSignUp,
      hideSignInSignUp,
      updateSignInInputValue,
      attemptSignIn,
      updateSignUpInputValue,
      createUser,
      signOut
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
            signInState={signInState}
            showSignIn={showSignIn}
            showSignUp={showSignUp}
            hideSignInSignUp={hideSignInSignUp}
            updateSignInInputValue={updateSignInInputValue}
            attemptSignIn={attemptSignIn}
            updateSignUpInputValue={updateSignUpInputValue}
            createUser={createUser}
          />

          <header className="layout__header">
            <nav className="header">
              <ul className="header__nav-list">
                <li className="header__li--title">
                  <Link to="/">
                    <h1 className="header__title-container">
                      <span className="header__title">React</span>
                      <span className="header__sub-title">Songwriter</span>
                    </h1>
                  </Link>
                </li>
                <li className="header__li">
                  {signInState.signedIn ? (
                    <button
                      className="header__link"
                      type="button"
                      onClick={signOut}
                    >
                        Sign out
                    </button>
                  ) : (
                    <button
                      className="header__link"
                      type="button"
                      onClick={showSignIn}
                    >
                        Sign in
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </header>

          <section className="layout__content">
            <Route exact path="/" component={SongbookContainer} />
            <Route path="/artist/:id" component={SongbookContainer} />
            <Route path="/song/:id" component={SongsheetContainer} />
            {/* <Route exact path="/help" component={Help} />
            <Route exact path="/settings" component={Settings} /> */}
          </section>

        </div>
      </Router>

    );
  }
}
