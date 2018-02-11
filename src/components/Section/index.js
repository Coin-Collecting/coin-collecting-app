import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Section extends React.Component {
  render() {
    return (
      <main className="section-container">
        { this.props.children }
      </main>
    );
  }
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Section.defaultProps = {
  children: [],
};

export default Section;
