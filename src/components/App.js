import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import reducers from '../reducers';

import Header from './Header';
import Footer from './Footer';
import CoinList from './CoinList';
import Authenticate from './Authenticate';
import Main from './Main';
import Section from './Section';

import './normalize.scss';
import './defaults.scss';

const store = createStore(reducers);

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Header />
            <Main>
              <Authenticate>
                <Route path="/">
                  <Section>
                    <Route path="/collection" component={CoinList} />
                  </Section>
                </Route>
              </Authenticate>
            </Main>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
