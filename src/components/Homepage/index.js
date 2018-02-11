import React from 'react';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Homepage extends React.Component {
  render() {
    return (
      <article className="homepage-article">
        Homepage!
      </article>
    );
  }
}

Homepage.propTypes = {};

export default Homepage;
