import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from '../Spinner';
import './style.scss';

const CoinCollectionQuery = gql`
  query ( $issueId: ID ) {
    collection ( issueId: $issueId )
    {
      id,
      quality,
      issueId,
      coin {
        id
        mintage,
        year,
        issue {
          id
          variety
          composition
          mass
          diameter
          startYear
          endYear
          denomination {
            id
            val
            kind
          }
        }
        mint,
        description
      }
    }
  }
`;


class CoinList extends React.Component {
  render() {
    const { data: { loading, collection } } = this.props;

    if (loading) return (<Spinner />);

    return (
      <ul className="coin-list-container">
        {
          collection && collection.map(({ coin: { year, issue, mint }, id, quality }) => {
            return (
              <li key={id}>
                {
                  `${year} ${mint} - ${issue.denomination.kind}
                   ${issue.variety} - ${quality}`
                }
              </li>
            );
          })
        }
      </ul>
    );
  }
}

CoinList.propTypes = {
  data: PropTypes.shape({
    collection: PropTypes.array,
  }),
};

CoinList.defaultProps = {
  data: {},
};

export default compose(graphql(CoinCollectionQuery, {
  options: {
    variables: {
      issueId: undefined,
    },
  },
}))(CoinList);
