import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import './style.scss';
import { abbreviateMint } from '../../util';
import _Find from 'lodash/find';

import {
  AddCoinMutation,
  RemoveCoinMutation,
  AddToWishListMutation,
  RemoveFromWishListMutation,
  MeQuery,
} from '../../queries-mutations';
import { coinQualities } from '../../constants';

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
    let {
      coinsData: { loading, coins },
      issueId,
      page,
      addCoin,
      removeCoin,
      match: { params },
      addToWishList,
      removeFromWishList,
      user,
    } = this.props;

    const isWished = coinId => {
      if (user.loading) return false;
      return _Find(user.me.wishes, {id: coinId}) !== undefined;
    }

    const AddButtons = () => (
      <div className="add-buttons">
        <span>Add coin to Collection:</span>
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

    const TableHead = () => (
      <thead>
        <tr>
          <th>Wish</th>
          <th>Year</th>
          <th>Owned</th>
          <th>Variety</th>
          <th>Mintage</th>
          <th>Composition</th>
          <th>Ebay</th>
        </tr>
      </thead>
    );

    if (loading) return (
      <div className="collection-container">
        <AddButtons />
        <table>
          <TableHead/>
          <tbody>
          { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(i => (
            <tr>
              <td><span className="skeleton-text"/></td>
              <td><span className="skeleton-text"/></td>
              <td><span className="skeleton-text"/></td>
              <td><span className="skeleton-text"/></td>
              <td><span className="skeleton-text"/></td>
              <td><span className="skeleton-text"/></td>
              <td><span className="skeleton-text"/></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="collection-container">
        <AddButtons />
        <table>
          <TableHead/>
          <tbody>
          {
            coins && coins.edges && coins.edges.map(coin => {
              const { id, year, mint, owned, issue, mintage } = coin.node;
              return (
                <tr
                  key={id}
                  onClick={({target}) => {
                    if (
                      new RegExp("fa").test(target.className) ||
                      new RegExp("owned").test(target.className)
                    ) return false;
                    this.toggleRow(id);
                  }}
                  className={this.isSelected(id) ? 'active' : null}
                >
                  <td>
                    <i
                      className={[
                        "fa fa-heart",
                        isWished(id) ? 'active' : null,
                      ].join(' ')}
                      onClick={() => {
                        isWished(id)
                          ? removeFromWishList(id).then(() => user.refetch())
                          : addToWishList(id).then(() => user.refetch());
                      }}
                    />
                  </td>
                  <td>{ year } { abbreviateMint(mint) }</td>
                  <td><Owned owned={owned} /></td>
                  <td>{ issue.variety }</td>
                  <td>{ mintage }</td>
                  <td>{ issue.composition }</td>
                  <td>
                    <a
                      className="ebay"
                      target="_blank"
                      href={`https://www.ebay.com/sch/i.html?_nkw=${year}+${abbreviateMint(mint)}+${issue.variety.replace(/ /g, '+')}&LH_BIN=1&_sop=15`}
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
  user: PropTypes.object.isRequired,
  addCoin: PropTypes.func.isRequired,
  removeCoin: PropTypes.func.isRequired,
  addToWishList: PropTypes.func.isRequired,
  removeFromWishList: PropTypes.func.isRequired,
};

Collection.defaultProps = {
  coinsData: {},
  user: {},
  addCoin: () => false,
  removeCoin: () => false,
  addToWishList: () => false,
  removeFromWishList: () => false,
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

const addToWishListMutation = graphql(AddToWishListMutation, {
  props: ({ mutate }) => ({
    addToWishList: id => {
      return mutate({
        variables: {coinId: id},
      });
    },
  }),
});

const removeFromWishListMutation = graphql(RemoveFromWishListMutation, {
  props: ({ mutate }) => ({
    removeFromWishList: id => {
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
  addToWishListMutation,
  removeFromWishListMutation,
  graphql(MeQuery, {name: 'user'}),
)(Collection);
