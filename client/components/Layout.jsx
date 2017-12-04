import React from 'react';

import {
	BrowserRouter,
	Route,
	Link
} from 'react-router-dom';

import SongbookContainer from '../containers/SongbookContainer.jsx';
import SongsheetContainer from '../containers/SongsheetContainer.jsx';
import Help from '../components/Help.jsx';
import Settings from '../components/Settings.jsx';

export default function Layout(){

	return (

		<BrowserRouter>
			<div>

				<nav>
					<ul>
						<li><Link to="/">Songbook</Link></li>
						<li><Link to="/song">Songsheet</Link></li>
						<li><Link to="/help">help</Link></li>
						<li><Link to="/settings">Settings</Link></li>
					</ul>
				</nav>
				
				<Route exact path="/" component={SongbookContainer}/>
				<Route path="/song" component={SongsheetContainer} />
				<Route exact path="/help" component={Help}/>
				<Route exact path="/settings" component={Settings}/>

			</div>
		</BrowserRouter>

	);

}

