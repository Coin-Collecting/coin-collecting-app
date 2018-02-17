import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import './style.scss';
import { abbreviateMint, denominationName } from '../../util';
import _Find from 'lodash/find';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import IssueInfo from '../IssueInfo';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import {
  AddCoinMutation,
  RemoveCoinMutation,
  AddToWishListMutation,
  RemoveFromWishListMutation,
  MeQuery,
} from '../../queries-mutations';
import { coinQualities, getNameByIssueIds } from '../../constants';

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
                        denomination {
                            val
                        }
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
      open: false,
    }
  }

  toggleRow(id, rowIndex) {
    let newId = null;
    if (!this.isSelected(id)) newId = id;
    this.setState({
      selectedIds: [newId],
      rowIndex,
    });
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
      browser,
    } = this.props;

    const isWished = coinId => {
      if (user.loading || !user.me) return false;
      return _Find(user.me.wishes, {id: coinId}) !== undefined;
    }

    const AddButtons = ({ coinId }) => (
      <SelectField
        floatingLabelText="Add to Collection"
        value={this.state.value}
        onChange={(e,i,value) => {
          addCoin({
            coinId,
            quality: value,
          }).then(() => {
            this.props.coinsData.refetch();
            this.setState({open: true});
          });
        }}
      >
        { coinQualities.map((quality, index) => (
          <MenuItem
            key={index}
            value={quality}
            primaryText={quality}
          />
        ))}
      </SelectField>
    );

    const Paginate = () => {
      if (coins && parseInt(page) - 1 > 0 ||
        coins && coins.pageInfo.hasNextPage) {
        return (
          <div className="pagination">
            { coins && parseInt(page) - 1 > 0 &&
            <Link to={`/collection/${getNameByIssueIds(issueId)}/${parseInt(page) - 1}`}>
              <i className="fa fa-caret-left"/> Prev Page
            </Link>
            }
            { coins && coins.pageInfo.hasNextPage &&
            <Link to={`/collection/${getNameByIssueIds(issueId)}/${parseInt(page) + 1}`}>
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

    const tableHeader = (
      <TableRow selectable={false}>
        <TableHeaderColumn className="xsmall-center">Wish</TableHeaderColumn>
        <TableHeaderColumn className="small-center">Year</TableHeaderColumn>
        <TableHeaderColumn>Owned</TableHeaderColumn>
        { !browser.lessThan.medium && <TableHeaderColumn>Variety</TableHeaderColumn> }
        { !browser.lessThan.infinity && <TableHeaderColumn>Mintage</TableHeaderColumn> }
        { !browser.lessThan.large && <TableHeaderColumn>Composition</TableHeaderColumn> }
        { !browser.lessThan.medium && <TableHeaderColumn className="small-center">Auction</TableHeaderColumn> }
        { !browser.lessThan.medium && <TableHeaderColumn className="small-center">Image</TableHeaderColumn> }
        { !browser.lessThan.medium && <TableHeaderColumn>Add</TableHeaderColumn> }
      </TableRow>
    );

    let issueName = this.props.match.url
      .replace(/\//g, '')
      .replace(/collection/g, '')
      .replace(/-/g, ' ');

    if (loading) return (
      <div className="collection-container">
        <IssueInfo {...this.props}/>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            {tableHeader}
          </TableHeader>
          <Divider/>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            selectable={false}
          >
          { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(i => (
            <TableRow key={i}>
              <TableRowColumn><span className="skeleton-text"/></TableRowColumn>
              <TableRowColumn><span className="skeleton-text"/></TableRowColumn>
              <TableRowColumn><span className="skeleton-text"/></TableRowColumn>
              <TableRowColumn><span className="skeleton-text"/></TableRowColumn>
              <TableRowColumn><span className="skeleton-text"/></TableRowColumn>
              <TableRowColumn><span className="skeleton-text"/></TableRowColumn>
              <TableRowColumn><span className="skeleton-text"/></TableRowColumn>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    );

    return (
      <div className="collection-container">
        <IssueInfo {...this.props}/>
        <Divider/>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            {tableHeader}
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            selectable={false}
          >
          {
            coins && coins.edges && coins.edges.map((coin, index) => {
              const { id, year, mint, owned, issue, mintage } = coin.node;
              return (
                <TableRow
                  key={id}
                  selected={this.state.rowIndex === index}
                >
                  <TableRowColumn className="xsmall-center">
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
                  </TableRowColumn>
                  <TableRowColumn className="small-center">{ year } { abbreviateMint(mint) }</TableRowColumn>
                  <TableRowColumn><Owned owned={owned} /></TableRowColumn>
                  { !browser.lessThan.medium && <TableRowColumn>{ issue.variety }</TableRowColumn> }
                  { !browser.lessThan.large && <TableRowColumn>{ mintage }</TableRowColumn> }
                  { !browser.lessThan.infinity && <TableRowColumn>{ issue.composition }</TableRowColumn>}
                  { !browser.lessThan.medium && <TableRowColumn className="small-center">
                    <a
                      className="ebay"
                      target="_blank"
                      href={`https://www.ebay.com/sch/i.html?_nkw=${year}+${abbreviateMint(mint)}+${issue.variety.replace(/ /g, '+')}+${denominationName(issue.denomination.val)}&LH_BIN=1&_sop=15`}
                    >
                      <i className="fa fa-gavel"/>
                    </a>
                  </TableRowColumn> }
                  { !browser.lessThan.medium && <TableRowColumn className="small-center">
                    <i className="fa fa-camera"/>
                  </TableRowColumn> }
                  { !browser.lessThan.medium && <TableRowColumn>
                    <AddButtons coinId={id}/>
                  </TableRowColumn> }
                </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
        <Paginate/>
        <Snackbar
          open={this.state.open}
          message="Coin added to your collection"
          autoHideDuration={4000}
          onRequestClose={() => {
            this.setState({
              open: false,
            });
          }}
        />
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

const mapStateToProps = state => {
  return {
    browser: state.browser,
  };
};

export default compose(
  connect(mapStateToProps),
  coinsQuery,
  addCoinMutation,
  removeCoinMutation,
  addToWishListMutation,
  removeFromWishListMutation,
  graphql(MeQuery, {name: 'user'}),
)(Collection);
