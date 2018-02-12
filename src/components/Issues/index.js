import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

class Issues extends React.Component {
  render() {
    return (
      <div className="issues-container">
        <nav>
          <ul>
            <li><NavLink to="/collection/71">Mercury Dimes</NavLink></li>
            <li><NavLink to="/collection/6+7+8+9+10+11+12">Large Cent</NavLink></li>
          </ul>
        </nav>
      </div>
    );
  }
}

Issues.propTypes = {};

Issues.defaultProps = {};

export default Issues;
