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
import CoinList from './components/CoinCollection';
import Library from './components/Library';
import Authenticate from './components/Authenticate';
import Issues from './components/Issues';

export const routes = (
	<Router>
		<Route render={props => {
			return (
				<div>
					<Header {...props}/>
					<Main {...props}>
						<Authenticate {...props}>
							<Section {...props}>
								<Switch>
									<Route exact path="/" component={Homepage} />
									<Route path="/collection" component={CoinList} />
									<Route path="/library" >
										<div>
											<Issues />
											<Route path="/library/:issueId/:page?" render={props => {
												return (
													<Library
														{...props}
														issueId={props.match.params.issueId}
														page={props.match.params.page}
													/>
												)
											}} />
										</div>
									</Route>
								</Switch>
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
