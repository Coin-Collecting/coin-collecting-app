import React from 'react';
import './style.scss';

class SidebarLayout extends React.Component {
  render() {
    if (React.Children.count(this.props.children) === 1) {
      return this.props.children;
    }
    if (React.Children.count(this.props.children) > 1) {
      return (
        <div className="sidebar-layout-component">
          { React.Children.map(this.props.children, (child, index) => {
            if (index > 0) return;
            return (
              <aside>{child}</aside>
            );
          })}
          <div className="content">
          { React.Children.map(this.props.children, (child, index) => {
            if (index === 0) return;
            return child;
          })}
          </div>
        </div>
      );
    }

  }
}

SidebarLayout.propTypes = {};

export default SidebarLayout;
