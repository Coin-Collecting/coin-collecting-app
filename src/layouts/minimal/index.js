import React, { PropTypes } from "react";

import './style.scss';

class MinimalLayout extends React.Component {
  render() {
    const { children } = this.props;

    let classes = ["minimal-layout"];

    return (
      <section className={classes.join(' ')}>
        <div className="minimal-section">
          { children }
        </div>
      </section>
    );
  }
}

MinimalLayout.propTypes = {
  location: PropTypes.object,
};

export default MinimalLayout;
