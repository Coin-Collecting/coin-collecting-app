import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

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
      <aside
        className="login-container"
        style={{
          backgroundImage: `url(${'http://s3.mycoin.store/img/coin-background-large.jpg'})`
        }}
      >
        <div className="container">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={({ target: { value } }) => {
              this.setState({ username: value });
            }}
          />
          <input
            type="password"
            placeholder="password"
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
        </div>
      </aside>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
