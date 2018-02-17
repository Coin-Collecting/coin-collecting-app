import React from 'react';
import Paper from 'material-ui/Paper';
import './style.scss';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { graphql, compose } from 'react-apollo';
import { MeQuery } from '../../queries-mutations';
import Toggle from 'material-ui/Toggle';
import Badge from 'material-ui/Badge';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

const appBarStyle = {
  backgroundColor: '#b5b5b5',
};

const paperStyle = {
  width: 700,
  margin: '20px auto',
  display: 'block',
};

const inputStyle = {
  display: 'block',
  margin: 20,
  boxSizing: 'border-box',
};

class Settings extends React.Component {
  render() {
    const { user } = this.props;
    if (user.loading) return null;

    return (
      <section className="settings-section">
        <Paper style={paperStyle} zDepth={1}>
          <AppBar
            title="User Settings (Under construction)"
            iconClassNameLeft="fa fa-cogs"
            style={appBarStyle}
          />
          <div style={{
            width: 250,
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 25,
          }}>
            <Badge
              badgeContent={user.me.wishes.length}
              primary={true}
            >
              <Avatar
                size={200}
                style={{margin: 5}}
              >
                {user.me.username.charAt(0).toUpperCase()}
              </Avatar>
            </Badge>
          </div>
          <div style={{
            width: 250, display: 'inline-block', verticalAlign: 'top',
          }}>
            <TextField
              style={inputStyle}
              defaultValue={user.me.username}
              floatingLabelText="Username"
              disabled={true}
            />
            <TextField
              style={inputStyle}
              defaultValue={user.me.email}
              floatingLabelText="Email Address"
              disabled={true}
            />
            <Toggle
              style={inputStyle}
              label="Admin"
              defaultToggled={user.me.admin}
              disabled={true}
            />
            <RaisedButton
              label="reset password"
              secondary={true}
              style={{margin: '30px 0'}}
            />

          </div>
        </Paper>
      </section>
    );
  }
}

Settings.propTypes = {};

export default compose(
  graphql(MeQuery, {name: 'user'}),
)(Settings);