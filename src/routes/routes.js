import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'

import '../base/style.scss';

import { CollectionNamedIssueRoutes } from './collectionNamedIssueRoutes';

import BaseLayout from '../components/BaseLayout';
import Header from '../components/Header';
import Section from '../components/Section';
import Main from '../components/Main';
import SidebarLayout from '../components/SidebarLayout';

import Homepage from '../components/Homepage';
import Collection from '../components/Collection';
import Authenticate from '../components/Authenticate';
import Issues from '../components/Issues';

import Logout from '../components/Logout';

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
                  {/* /collection/half-cent/:page? */}
                  <CollectionNamedIssueRoutes {...props}/>
                  {/* /collection/1+2+3+4/:page? */}
									<Route path="/collection/:issueId/:page?" render={props => {
										return (
											<SidebarLayout>
												<Issues issueId={props.match.params.issueId} />
												<Collection
													{...props}
													issueId={props.match.params.issueId}
													page={props.match.params.page || 1}
												/>
                      </SidebarLayout>
										)
									}} />
                </Switch>
							</Section>
						</Authenticate>
						<Route exact path="/logout" component={Logout} />
					</Main>
				</BaseLayout>
			)
		}}>
		</Route>
	</Router>
);
