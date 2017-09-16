import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom'

import Base from './base';
import Coins from './pages/coins';

import Login from './pages/login';
import Logout from './pages/logout';

export const routes = (
	<Router>
		<Route>
			<Switch>
				<Base>
					<Route exact path="/" component={Coins}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/logout" component={Logout}/>
				</Base>
			</Switch>
		</Route>
	</Router>
);
