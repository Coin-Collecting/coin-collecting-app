import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import log from '../../middleware/logging';

import Login from '../Login';

import { updateToken, updateUser } from '../../actions/authentication';

const loginMutation = gql`
    mutation (
    $username: String!,
    $password: String!,
    ) {
        loginUser (
            username: $username,
            password: $password,
        )
    }
`;

const MeQuery = gql`
    query {
        me {
            username
            email
            admin
            totalOwned
            totalUniqueOwned
        }
    }
`;

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = ({ username, password }) => {
      this.props.loginUser({ username, password })
        .then(({ data: { loginUser } }) => {
          this.props.updateToken({ token: loginUser });
        })
        .catch(err => {
          // TODO: Add visual error handling
          log.error({ err });
        });
    };
  }

  componentWillReceiveProps(nextProps) {
    // LOL - no comment and too lazy
    if (nextProps.user.me && nextProps.user.me.username && nextProps.authentication && nextProps.authentication.user && nextProps.authentication.user.username !== nextProps.user.me.username) {
      this.props.updateUser(nextProps.user.me);
    }
  }

  render() {
    const { authentication } = this.props;

    const isAuthenticated = ({ token }) => {
      return token;
    };

    if (isAuthenticated(authentication)) {
      return this.props.children;
    }

    return (
      <Login
        onSubmit={this.handleLoginSubmit}
      />
    );
  }
}

Authenticate.propTypes = {
  updateToken: PropTypes.func,
  updateUser: PropTypes.func,
  loginUser: PropTypes.func,
  authentication: PropTypes.shape({
    token: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Authenticate.defaultProps = {
  authentication: {
    token: undefined,
  },
  updateToken: () => false,
  updateUser: () => false,
  loginUser: () => false,
  children: [],
};

const mapStateToProps = state => {
  log.info({ REDUX_STATE: state });
  return {
    authentication: state.reducers.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateToken: ({ token }) => {
      dispatch(updateToken({ token }));
    },
    updateUser: user => {
      dispatch(updateUser(user));
    }
  };
};

const loginMutationQuery = graphql(loginMutation, {
  props: ({ mutate }) => ({
    loginUser: ({ username, password }) => {
      return mutate({
        variables: { username, password },
      });
    },
  }),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  loginMutationQuery,
  graphql(MeQuery, {name: 'user'}),
)(Authenticate);
