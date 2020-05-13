import * as React from "react";
import { Link } from "react-router-dom";
import HeaderLink from "./HeaderLink";

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
            <HeaderLink label={"New Song"} onClick={handleNewSongModal} />
          )}
          <HeaderLink label={"Search"} />
          {isSignedIn ? (
            <>
              <HeaderLink label={"Settings"} />
              <HeaderLink label={"Sign out"} onClick={signOutRequest} />
            </>
          ) : (
            <HeaderLink label={"Sign in"} onClick={showSignIn} />
          )}
        </ul>
      </nav>
    </header>
  );
}
