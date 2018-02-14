import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import './style.scss';
import { abbreviateMint } from '../../util';

import { coinQualities } from '../../constants';

import IssueImage from '../IssueImage';

const DEFAULT_COUNT = 50;

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
                        composition
                        variety
                    }
                    mint
                    mintage
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
  constructor(props) {
    super(props);
    this.state = {
      count: DEFAULT_COUNT,
      selectedIds: [],
    }
  }

  toggleRow(id) {
    let newIds = this.state.selectedIds;
    let newId = null;

    if (!this.isSelected(id)) {
      newId = id;
    }

    this.setState({
      selectedIds: [newId],
    })
  }

  isSelected(id) {
    return this.state.selectedIds.indexOf(id) !== -1;
  }

  render() {
    const {
      coinsData: { loading, coins },
      issueId,
      page,
      addCoin,
      removeCoin,
      match: { params },
    } = this.props;

    const AddButtons = () => (
      <div className="add-buttons">
        { coinQualities.map((quality, index) => {
          return (
            <button
              key={index}
              disabled={!this.state.selectedIds[0]}
              className={quality}
              onClick={() => {
                if (this.state.selectedIds[0] != '') {
                  addCoin({
                    coinId: this.state.selectedIds[0],
                    quality: quality,
                  })
                    .then(() => {
                      this.props.coinsData.refetch();
                      this.setState({
                        selectedIds: [],
                      })
                    })
                }
              }}
            >
              { quality }
            </button>
          )
        })}
      </div>
    );

    const Paginate = () => {
      if (coins && parseInt(page) - 1 > 0 ||
        coins && coins.pageInfo.hasNextPage) {
        return (
          <div className="pagination">
            { coins && parseInt(page) - 1 > 0 &&
            <Link to={`/collection/${issueId}/${parseInt(page) - 1}`}>
              <i className="fa fa-caret-left"/> Prev Page
            </Link>
            }
            { coins && coins.pageInfo.hasNextPage &&
            <Link to={`/collection/${issueId}/${parseInt(page) + 1}`}>
              Next Page <i className="fa fa-caret-right"/>
            </Link>
            }
          </div>
        );
      }
      return null;
    };

    const Owned = ({owned}) => {
      return (
        <div>
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
        </div>
      );
    }

    if (loading) return (
      <div className="collection-container">
        <IssueImage issueId={params.issueId} />
        <AddButtons />
        <Spinner />
      </div>
    );

    return (
      <div className="collection-container">
        <IssueImage issueId={params.issueId} />
        <AddButtons />
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Owned</th>
              <th>Variety</th>
              <th>Mintage</th>
              <th>Composition</th>
              <th>Ebay</th>
            </tr>
          </thead>
          <tbody>
          {
            coins && coins.edges && coins.edges.map(coin => {
              const { id, year, mint, owned, issue, mintage } = coin.node;
              return (
                <tr
                  key={id}
                  onClick={() => this.toggleRow(id)}
                  className={this.isSelected(id) ? 'active' : null}
                >
                  <td>{ year } { abbreviateMint(mint) }</td>
                  <td><Owned owned={owned} /></td>
                  <td>{ issue.variety }</td>
                  <td>{ mintage }</td>
                  <td>{ issue.composition }</td>
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
        <Paginate/>
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
