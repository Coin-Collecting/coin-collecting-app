import React from 'react';
import PropTypes from 'prop-types';
import LargeCentImage from './large-cent.jpg';
import './style.scss';

const images = {
  '6+7+8+9+10+11+12': LargeCentImage,
};

class IssueImage extends React.Component {
  render() {
    const { issueId } = this.props;

    if (!images[issueId]) return null;

    return (
      <div className="issue-image-container">
        <img src={images[issueId]}/>
      </div>
    );
  }
}

IssueImage.propTypes = {
  issueId: PropTypes.string.isRequired,
};

export default IssueImage;
