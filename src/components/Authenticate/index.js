import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import log from '../../middleware/logging';

import Login from '../Login';
import { loginMutation, MeQuery } from '../../queries-mutations';

import { updateToken, updateUser } from '../../actions/authentication';

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = ({ username, password }) => {
      this.props.loginUser({ username, password })
        .then(({ data: { loginUser } }) => {
          this.props.updateToken({ token: loginUser });
          this.props.user.refetch();
        })
        .catch(err => {
          // TODO: Add visual error handling
          log.error({ err });
        });
    };
  }

  componentWillReceiveProps({ user }) {
    if (this.props.user.loading && !user.loading) {
      this.props.updateUser(user.me);
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
