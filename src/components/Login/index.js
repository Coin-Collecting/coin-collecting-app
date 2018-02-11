import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: 'password',
    };
  }

  render() {
    const { onSubmit } = this.props;
    const { username, password } = this.state;

    return (
      <aside className="login-container">
        <h2>Login!</h2>
        <input
          type="text"
          value={username}
          onChange={({ target: { value } }) => {
            this.setState({ username: value });
          }}
        />
        <input
          type="password"
          value={password}
          onChange={({ target: { value } }) => {
            this.setState({ password: value });
          }}
        />
        <button
          onClick={() => onSubmit({ username, password })}
        >
          Login Here
        </button>
      </aside>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
