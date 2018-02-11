import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component {
  render() {
    return (
      <main className="main-container">
        { this.props.children }
      </main>
    );
  }
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Main.defaultProps = {
  children: [],
};

export default Main;
