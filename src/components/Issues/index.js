import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import './style.scss';

class Issues extends React.Component {
  render() {
    return (
      <div className="issues-container">
        <Link to="/library/49">Mercury Dimes</Link>
      </div>
    );
  }
}

Issues.propTypes = {};

Issues.defaultProps = {};

export default Issues;
