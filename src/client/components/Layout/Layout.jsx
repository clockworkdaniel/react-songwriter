import React from 'react';

import {
  Router,
  Route,
  NavLink,
  Link
} from 'react-router-dom';

import history from '../../history';
import EditModal from '../EditModal/EditModal';
import SongbookContainer from '../Songbook/SongbookContainer';
import SongsheetContainer from '../Songsheet/SongsheetContainer';
import SignIn from '../SignIn/SignIn';
import Help from '../Help';
import Settings from '../Settings';

export default function Layout({ editModalState, updateEditableText, commitTextChange }) {

  return (
    <Router history={history}>
      <div className="layout">

        <EditModal
          editModalState={editModalState}
          updateEditableText={updateEditableText}
          commitTextChange={commitTextChange}
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
              {/* <li className="header__li">
                <NavLink
                  className="header__link"
                  to="/help"
                >
                  help
                </NavLink>
              </li>
              <li className="header__li">
                <NavLink
                  className="header__link"
                  to="/settings"
                >
                  settings
                </NavLink>
              </li> */}
            </ul>
          </nav>
        </header>

        <section className="layout__content">
          <Route exact path="/" component={SongbookContainer} />
          <Route path="/artist/:id" component={SongbookContainer} />
          <Route path="/song/:id" component={SongsheetContainer} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/settings" component={Settings} />
        </section>

      </div>
    </Router>

  );

}
