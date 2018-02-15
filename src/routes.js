import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'

import './base/style.scss';
import { getIssueIdsByName } from './constants';

import BaseLayout from './components/BaseLayout';
import Header from './components/Header';
import Section from './components/Section';
import Main from './components/Main';
import SidebarLayout from './components/SidebarLayout';

import Homepage from './components/Homepage';
import Collection from './components/Collection';
import Authenticate from './components/Authenticate';
import Issues from './components/Issues';

const CollectionAlias = props => (
	<SidebarLayout>
		<Issues issueId={props.issueId}/>
		<Collection
      {...props}
			issueId={props.issueId}
			page={props.match.params.page || 1}
		/>
	</SidebarLayout>
);

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
									<Route path="/collection/half-cent/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('half-cent')} />)
                  }}/>
									<Route path="/collection/large-cent/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('large-cent')}/>)
                  }}/>
									<Route path="/collection/indian-head-cent/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('indian-head-cent')}/>)
                  }}/>
									<Route path="/collection/lincoln-cent/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('lincoln-cent')}/>)
                  }}/>
									<Route path="/collection/two-cent/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('two-cent')}/>)
                  }}/>
									<Route path="/collection/three-cent-silver/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('three-cent-silver')}/>)
                  }}/>
									<Route path="/collection/three-cent-copper/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('three-cent-copper')}/>)
                  }}/>
									<Route path="/collection/older-nickels/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('older-nickels')}/>)
                  }}/>
									<Route path="/collection/seated-liberty-nickels/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('seated-liberty-nickels')}/>)
                  }}/>
									<Route path="/collection/shield-nickels/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('shield-nickels')}/>)
                  }}/>
									<Route path="/collection/liberty-nickels/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('liberty-nickels')}/>)
                  }}/>
									<Route path="/collection/buffalo-nickels/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('buffalo-nickels')}/>)
                  }}/>
									<Route path="/collection/jefferson-nickels/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('jefferson-nickels')}/>)
                  }}/>
									<Route path="/collection/older-dimes/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('older-dimes')}/>)
                  }}/>
									<Route path="/collection/seated-liberty-dimes/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('seated-liberty-dimes')}/>)
                  }}/>
									<Route path="/collection/barber-dimes/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('barber-dimes')}/>)
                  }}/>
									<Route path="/collection/mercury-dimes/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('mercury-dimes')}/>)
                  }}/>
									<Route path="/collection/roosevelt-dimes/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('roosevelt-dimes')}/>)
                  }}/>
									<Route path="/collection/twenty-cent-piece/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('twenty-cent-piece')}/>)
                  }}/>
									<Route path="/collection/older-quarters/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('older-quarters')}/>)
                  }}/>
									<Route path="/collection/seated-liberty-quarters/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('seated-liberty-quarters')}/>)
                  }}/>
									<Route path="/collection/barber-quarters/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('barber-quarters')}/>)
                  }}/>
									<Route path="/collection/standing-liberty-quarters/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('standing-liberty-quarters')}/>)
                  }}/>
									<Route path="/collection/washington-quarters/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('washington-quarters')}/>)
                  }}/>
									<Route path="/collection/statehood-quarters/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('statehood-quarters')}/>)
                  }}/>
									<Route path="/collection/national-park-quarters/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('national-park-quarters')}/>)
                  }}/>
									<Route path="/collection/older-half-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('older-half-dollars')}/>)
                  }}/>
									<Route path="/collection/seated-liberty-half-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('seated-liberty-half-dollars')}/>)
                  }}/>
									<Route path="/collection/barber-half-dollar/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('barber-half-dollar')}/>)
                  }}/>
									<Route path="/collection/walking-liberty-half-dollar/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('walking-liberty-half-dollar')}/>)
                  }}/>
									<Route path="/collection/franklin-half-dollar/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('franklin-half-dollar')}/>)
                  }}/>
									<Route path="/collection/kennedy-half-dollar/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('kennedy-half-dollar')}/>)
                  }}/>
									<Route path="/collection/older-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('older-dollars')}/>)
                  }}/>
									<Route path="/collection/seated-liberty-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('seated-liberty-dollars')}/>)
                  }}/>
									<Route path="/collection/trade-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('trade-dollars')}/>)
                  }}/>
									<Route path="/collection/morgan-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('morgan-dollars')}/>)
                  }}/>
									<Route path="/collection/peace-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('peace-dollars')}/>)
                  }}/>
									<Route path="/collection/eisenhower-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('eisenhower-dollars')}/>)
                  }}/>
									<Route path="/collection/susan-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('susan-dollars')}/>)
                  }}/>
									<Route path="/collection/sacagawea-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('sacagawea-dollars')}/>)
                  }}/>
									<Route path="/collection/presidential-dollars/:page?" component={props => {
                    return (<CollectionAlias {...props} issueId={getIssueIdsByName('presidential-dollars')}/>)
                  }}/>
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
									<Redirect from="/collection" to="/collection/1+2+3+4+5" />
								</Switch>
							</Section>
						</Authenticate>
					</Main>
				</BaseLayout>
			)
		}}>
		</Route>
	</Router>
);
