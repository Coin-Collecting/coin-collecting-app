import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
  render() {
    return (
      <header className="global-header">
        <h1>My Coin Store</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/collection">Collection</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {};

export default Header;
