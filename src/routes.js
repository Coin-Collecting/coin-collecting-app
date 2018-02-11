import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom'

import './base/style.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section';
import Main from './components/Main';

import Homepage from './components/Homepage';
import CoinList from './components/CoinList';
import Authenticate from './components/Authenticate';

export const routes = (
	<Router>
		<Route render={props => {
			return (
				<div>
					<Header {...props}/>
					<Main {...props}>
						<Authenticate {...props}>
							<Section {...props}>
								<Route exact path="/" component={Homepage} />
								<Route exact path="/collection" component={CoinList} />
							</Section>
						</Authenticate>
					</Main>
					<Footer />
				</div>
			)
		}}>
		</Route>
	</Router>
);
