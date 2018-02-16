import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const { onSubmit } = this.props;
    const { username, password } = this.state;

    return (
      <Paper
        className="login-container"
        style={{
          backgroundImage: `url(${'http://s3.mycoin.store/img/coin-background-large.jpg'})`
        }}
      >
        <Paper zDepth={3} className="container">
          <h1>My Coin Store</h1>
          <TextField
            hintText="Case sensitive"
            floatingLabelText="Enter your username"
            onChange={({ target: { value } }) => {
              this.setState({ username: value });
            }}
          />
          <TextField
            type="password"
            hintText="Case sensitive"
            floatingLabelText="Enter your password"
            onChange={({ target: { value } }) => {
              this.setState({ password: value });
            }}
          />
          <div className="btn-wrapper">
            <RaisedButton
              onClick={() => onSubmit({ username, password })}
            >
              Login
            </RaisedButton>
          </div>
        </Paper>
      </Paper>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
