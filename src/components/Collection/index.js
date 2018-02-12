import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import './style.scss';

import { coinQualities } from '../../constants';

const DEFAULT_COUNT = 20;

const CoinsQuery = gql`
    query (
    $count: Int,
    $cursor: String,
    $offset: Int,
    $order: String,
    $issueId: ID,
    ) {
        coins (
            count: $count,
            cursor: $cursor,
            offset: $offset,
            order: $order,
            issueId: $issueId,
        ){
            totalCount
            pageInfo {
                startCursor
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                    year
                    owned {
                      id
                      quality
                    }
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
                    mint
                    mintage
                    description
                }
            }
        }
    }
`;

const AddCoinMutation = gql`
    mutation (
    $coinId: String!,
    $quality: String!,
    ) {
        addUserCoin (
            coinId: $coinId,
            quality: $quality,
        )
    }
`;

const RemoveCoinMutation = gql`
    mutation (
    $id: String!,
    ) {
        removeUserCoin (
            id: $id,
        )
    }
`;

class Collection extends React.Component {
  render() {
    const {
      coinsData: { loading, coins },
      issueId,
      page,
      addCoin,
      removeCoin,
    } = this.props;
    if (loading) return (<Spinner />);

    console.log(coins);

    return (
      <div className="collection-container">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Mint</th>
            <th>Variety</th>
            <th>Mintage</th>
            <th>Owned</th>
            <th>Actions</th>
            <th>Ebay</th>
          </tr>
        </thead>
        <tbody>
        {
          coins && coins.edges && coins.edges.map(coin => {
            const { id, year, mint, owned, issue, mintage } = coin.node;
            return (
              <tr key={id}>
                <td>{ year }</td>
                <td>{ mint }</td>
                <td>{ issue.variety }</td>
                <td>{ mintage }</td>
                <td>
                  {
                    owned.length > 0 && owned.map(coin => {
                      return (
                        <span
                          key={coin.id}
                          onClick={() => {
                            removeCoin({id: coin.id})
                              .then(() => {
                                this.props.coinsData.refetch();
                              })
                          }}
                          className={[
                            "owned",
                            coin.quality.replace(/ /g, '-')
                          ].join(' ')}
                        >
                          {coin.quality}
                        </span>
                      )
                    })
                  }
                </td>
                <td>
                  <div className="add-buttons">
                    { coinQualities.map((quality, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            addCoin({coinId: id, quality: quality})
                              .then(() => {
                                this.props.coinsData.refetch();
                              })
                          }}
                        >
                          { quality }
                        </button>
                      )
                    })}
                  </div>
                </td>
                <td>
                  <a
                    className="ebay"
                    target="_blank"
                    href={`https://www.ebay.com/sch/i.html?_nkw=${year}+${mint}+${issue.variety.replace(/ /g, '+')}&LH_BIN=1&_sop=15`}
                  >
                    <i className="fa fa-gavel"/>
                  </a>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      <div className="pagination">
        { coins && parseInt(page) - 1 > 0 &&
          <Link to={`/collection/${issueId}/${parseInt(page) - 1}`} >
            <i className="fa fa-caret-left"/> Prev Page
          </Link>
        }
        { coins && coins.pageInfo.hasNextPage &&
          <Link to={`/collection/${issueId}/${parseInt(page) + 1}`} >
            Next Page <i className="fa fa-caret-right"/>
          </Link>
        }
      </div>
      </div>
    );
  }
}

Collection.propTypes = {
  coinsData: PropTypes.shape({
    collection: PropTypes.array,
  }),
  addCoin: PropTypes.func.isRequired,
  removeCoin: PropTypes.func.isRequired,
};

Collection.defaultProps = {
  coinsData: {},
  addCoin: () => false,
  removeCoin: () => false,
};

const coinsQuery = graphql(CoinsQuery, {
  name: 'coinsData',
  options: ({ issueId, page }) => {
    return {
      variables: {
        count: DEFAULT_COUNT,
        issueId: issueId,
        offset: page * DEFAULT_COUNT - DEFAULT_COUNT,
      },
    }
  },
});

const addCoinMutation = graphql(AddCoinMutation, {
  props: ({ mutate }) => ({
    addCoin: ({coinId, quality}) => {
      return mutate({
        variables: {coinId, quality},
      });
    },
  }),
});

const removeCoinMutation = graphql(RemoveCoinMutation, {
  props: ({ mutate }) => ({
    removeCoin: ({id}) => {
      return mutate({
        variables: {id},
      });
    },
  }),
});

export default compose(
  coinsQuery,
  addCoinMutation,
  removeCoinMutation,
)(Collection);
