import React from 'react';
import './style.scss';

class BaseLayout extends React.Component {
  render() {
    if (React.Children.count(this.props.children) !== 3) {
      console.error('BaseLayout requires exactly three children');
    }
    if (React.Children.count(this.props.children) > 1) {
      return (
        <div className="base-layout-component">
          { React.Children.map(
            this.props.children, (child, index) => <div>{child}</div>
          )}
        </div>
      );
    }

  }
}

BaseLayout.propTypes = {};

export default BaseLayout;
