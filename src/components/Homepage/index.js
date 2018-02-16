import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { abbreviateMint, denominationName } from '../../util';
import { graphql, compose } from 'react-apollo';
import { RemoveFromWishListMutation, MeQuery } from '../../queries-mutations';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const paperWishListStyle = {
  margin: 20,
  width: 740,
  maxWidth: '100%',
  display: 'inline-block',
}

const paperStyle = {
  width: 350,
  margin: 20,
  maxWidth: '100%',
  textAlign: 'center',
  display: 'inline-block',
};

const appBarStyle = {
  backgroundColor: '#b5b5b5',
};

const appBarWishListStyle = {
  backgroundColor: '#fe491a',
};

// eslint-disable-next-line react/prefer-stateless-function
class Homepage extends React.Component {
  render() {
    let { removeFromWishList, user } = this.props;

    if (user.loading || !user.me) return null;

    const percentComplete =
      parseFloat((user.me.totalUniqueOwned / (user.me.totalMissing + user.me.totalUniqueOwned)) * 100).toFixed(1);

    return (
      <article className="homepage-article">
        <div className="card-content">
          <Paper style={paperStyle} zDepth={1} >
            <AppBar
              title="Unique Owned"
              iconClassNameLeft="fa fa-trophy"
              style={appBarStyle}
            />
            <div className="paper-content">
              <i>{ user.me.totalUniqueOwned }</i>
              <div>Out of {user.me.totalMissing + user.me.totalUniqueOwned}</div>
            </div>
          </Paper>

          <Paper style={paperStyle} zDepth={1} >
            <AppBar
              title="Total Owned"
              iconClassNameLeft="fa fa-thumbs-up"
              style={appBarStyle}
            />
            <div className="paper-content">
              <i>{ user.me.totalOwned }</i>
              <div>Whole inventory (doubles)</div>
            </div>
          </Paper>

          <Paper style={paperStyle} zDepth={1} >
            <AppBar
              title="Left to Get"
              iconClassNameLeft="fa fa-flag-checkered"
              style={appBarStyle}
            />
            <div className="paper-content">
              <i>{ user.me.totalMissing }</i>
              <div>Not possible...</div>
            </div>
          </Paper>

          <Paper style={paperStyle} zDepth={1} >
            <AppBar
              title="Percent Complete"
              iconClassNameLeft="fa fa-battery-half"
              style={appBarStyle}
            />
            <div className="paper-content">
              <i>{ percentComplete + '%' }</i>
              <div>Not to shabby!</div>
            </div>
          </Paper>

          {/*<Paper style={paperStyle} zDepth={1} >*/}
            {/*<AppBar*/}
              {/*title="Coin Quality"*/}
              {/*iconClassNameLeft="fa fa-pie-chart"*/}
              {/*style={appBarStyle}*/}
            {/*/>*/}
            {/*<div className="paper-content">*/}
              {/*Coming soon*/}
            {/*</div>*/}
          {/*</Paper>*/}

          <Divider/>

          <Paper style={paperWishListStyle} zDepth={1} >
            <AppBar
              title="Wishlist"
              iconClassNameLeft="fa fa-heart"
              style={appBarWishListStyle}
            />
            { !user.me.wishes &&
            <p className="no-results">:( You cant think of anything you wish for?</p>
            }

            { user.me.wishes && user.me.wishes.length > 0 &&
            <Table className="wishlist-table">
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>Year</TableHeaderColumn>
                  <TableHeaderColumn>Variety</TableHeaderColumn>
                  <TableHeaderColumn>Denomination</TableHeaderColumn>
                  <TableHeaderColumn>Minted</TableHeaderColumn>
                  <TableHeaderColumn>Ebay</TableHeaderColumn>
                  <TableHeaderColumn>Remove</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover={true}
                selectable={false}
              >
                { user.me.wishes.map((wish, index) => {
                  return (
                    <TableRow key={wish.id}>
                      <TableRowColumn className="year">{wish.year}{abbreviateMint(wish.mint)}</TableRowColumn>
                      <TableRowColumn className="variety">{wish.issue.variety}</TableRowColumn>
                      <TableRowColumn className="denomination">{denominationName(wish.issue.denomination.val)}</TableRowColumn>
                      <TableRowColumn className="variety">{wish.mintage}</TableRowColumn>
                      <TableRowColumn>
                        <a
                          className="ebay"
                          target="_blank"
                          href={`https://www.ebay.com/sch/i.html?_nkw=${wish.year}+${abbreviateMint(wish.mint)}+${wish.issue.variety.replace(/ /g, '+')}+${denominationName(wish.issue.denomination.val)}&LH_BIN=1&_sop=15`}
                        >
                          <i className="fa fa-gavel"/>
                        </a>
                      </TableRowColumn>
                      <TableRowColumn>
                        <i
                          className="fa fa-times"
                          onClick={() => {
                            removeFromWishList(wish.id);
                            user.refetch();
                          }}
                        />
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            }
          </Paper>
        </div>
      </article>
    );
  }
}

Homepage.propTypes = {
  user: PropTypes.object,
  removeFromWishList: PropTypes.func,
};

Homepage.defaultProps = {
  removeFromWishList: () => false,
};

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
  removeFromWishListMutation,
  graphql(MeQuery, {name: 'user'}),
)(Homepage);
