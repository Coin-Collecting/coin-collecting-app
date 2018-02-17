import React from 'react';
import { issueData } from '../../content/issue-data';
import { getNameByIssueIds } from '../../constants';
import './style.scss';

class IssueInfo extends React.Component {
  render() {
    const issue = getNameByIssueIds(this.props.issueId);

    let issueInfo = issueData[issue.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];

    if (!issueInfo) return null;

    return (
      <div className="issue-info-container">
        <img src={issueInfo.imageUrl} />
        <div className="content">
          <h1>{issueInfo.title} <span>{issueInfo.startDate} - {issueInfo.endDate}</span></h1>
          <span dangerouslySetInnerHTML={{__html: issueInfo.body}}/>
          <a href={issueInfo.wiki} target="_blank">wiki</a>
        </div>
      </div>
    );
  }
}

IssueInfo.propTypes = {};

export default IssueInfo;
