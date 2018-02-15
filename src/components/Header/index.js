import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
  render() {
    const { authentication: { user }} = this.props;

    return (
      <header className="global-header">
        <h1>My Coin Store</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/collection">Collection</Link></li>
          </ul>
        </nav>
        { user &&
        <span className="email">
          <span className="user-name">{ user.username}</span>
          { ' - ' + user.email }
          </span>
        }
      </header>
    );
  }
}

Header.propTypes = {};

const mapStateToProps = state => {
  return {
    authentication: state.reducers.authentication,
  };
};

export default connect(mapStateToProps)(Header);