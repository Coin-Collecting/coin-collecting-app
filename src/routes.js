import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'

import './base/style.scss';

import BaseLayout from './components/BaseLayout';
import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section';
import Main from './components/Main';
import SidebarLayout from './components/SidebarLayout';

import Homepage from './components/Homepage';
import Collection from './components/Collection';
import Authenticate from './components/Authenticate';
import Issues from './components/Issues';
import IssueImage from './components/IssueImage';

export const routes = (
	<Router>
		<Route render={props => {
			return (
				<BaseLayout {...props}>
					<Header {...props}/>
					<Main {...props}>
						<Authenticate {...props}>
							<Section {...props}>
								<Switch>
									<Route exact path="/" component={Homepage} />
									<Route path="/collection/:issueId/:page?" render={props => {
										return (
											<SidebarLayout>
												<Issues {...props}/>
												<Collection
													{...props}
													issueId={props.match.params.issueId}
													page={props.match.params.page || 1}
												/>
                      </SidebarLayout>
										)
									}} />
									<Redirect from="/collection" to="/collection/1+2+3+4+5" />
								</Switch>
							</Section>
						</Authenticate>
					</Main>
					<Footer {...props}/>
				</BaseLayout>
			)
		}}>
		</Route>
	</Router>
);
