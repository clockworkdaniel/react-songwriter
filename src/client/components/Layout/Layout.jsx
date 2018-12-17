import React from 'react';

import {
  BrowserRouter,
  Route,
  NavLink,
  Link
} from 'react-router-dom';

import SongbookContainer from '../Songbook/SongbookContainer';
import SongsheetContainer from '../Songsheet/SongsheetContainer';
import EditModalContainer from '../EditModal/EditModalContainer';
import Help from '../Help';
import Settings from '../Settings';

export default function Layout() {

  return (

    <BrowserRouter>
      <div className="layout">

        <EditModalContainer />
        <header className="layout__header" >
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
          <Route path="/author/:id" component={SongbookContainer} />
          <Route path="/song/:id" component={SongsheetContainer} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/settings" component={Settings} />
        </section>

      </div>
    </BrowserRouter>

  );

}
