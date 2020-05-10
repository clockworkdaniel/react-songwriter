import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
  isSignedIn: boolean;
  showSignIn(): void;
  signOutRequest(): void;
  handleNewSongModal(): void;
};

export default function Header({
  handleNewSongModal,
  isSignedIn,
  showSignIn,
  signOutRequest
}: Props) {
  return (
    <header className="layout__header">
      <nav className="header">
        <ul className="header__nav-list">
          <li className="header__li--title">
            <Link to="/">
              <h1 className="header__title">Songbird</h1>
            </Link>
          </li>
          {isSignedIn && (
            <li className="header__li">
              <button
                className="songbook__new-song"
                type="button"
                onClick={handleNewSongModal}
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
          {isSignedIn && (
            <li className="header__li">
              <button className="header__link" type="button">
                Settings
              </button>
            </li>
          )}
          {isSignedIn && (
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
          {!isSignedIn && (
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
  );
}
