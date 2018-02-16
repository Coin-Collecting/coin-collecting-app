import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom'

import '../base/style.scss';

import { CollectionNamedIssueRoutes } from './collectionNamedIssueRoutes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header';
import Section from '../components/Section';

import Homepage from '../components/Homepage';
import Collection from '../components/Collection';
import Authenticate from '../components/Authenticate';

import Logout from '../components/Logout';

export const routes = (
  <MuiThemeProvider>
    <Router>
      <Route render={props => {
        return (
          <div>
            <Authenticate {...props}>
              <div>
                <Header {...props}/>
                <Section {...props}>
                  <Switch>
                    <Route exact path="/" component={Homepage} />
                    {/* /collection/half-cent/:page? */}
                    <CollectionNamedIssueRoutes {...props}/>
                    {/* /collection/1+2+3+4/:page? */}
                    <Route path="/collection/:issueId/:page?" render={props => (
                      <Collection
                        {...props}
                        issueId={props.match.params.issueId}
                        page={props.match.params.page || 1}
                      />
                    )} />
                  </Switch>
                </Section>
              </div>
            </Authenticate>
            <Route exact path="/logout" component={Logout} />
          </div>
        )
      }}>
      </Route>
    </Router>
  </MuiThemeProvider>
);
