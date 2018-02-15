import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { abbreviateMint, denominationName } from '../../util';
import { graphql, compose } from 'react-apollo';
import { RemoveFromWishListMutation, MeQuery } from '../../queries-mutations';

// eslint-disable-next-line react/prefer-stateless-function
class Homepage extends React.Component {
  render() {
    let { removeFromWishList, user } = this.props;

    if (user.loading) return null;

    const percentComplete =
      parseFloat((user.me.totalUniqueOwned / (user.me.totalMissing + user.me.totalUniqueOwned)) * 100).toFixed(1);

    return (
      <article className="homepage-article">
        <h1>My Personal Dashboard</h1>
        <hr/>
        <h2><i className="fa fa-pie-chart"/> Stats</h2>
        <ul className="stats">
          <li>
            <span>Total Owned</span>
            <i>{ user.me.totalOwned }</i>
            <div>Whole inventory (doubles)</div>
          </li>
          <li>
            <span>Unique Owned</span>
            <i>{ user.me.totalUniqueOwned }</i>
            <div>Out of {user.me.totalMissing + user.me.totalUniqueOwned}</div>
          </li>
          <li>
            <span>Left to Get!</span>
            <i>{ user.me.totalMissing }</i>
            <div>Not possible...</div>
          </li>
          <li>
            <span>Percent Complete!</span>
            <i>{ percentComplete + '%' }</i>
            <div>Not to shabby!</div>
          </li>
        </ul>
        <span>TODO: Put a timeline chart here based on timestamps</span>
        <hr/>
        <h2><i className="fa fa-heart"/> Wishlist</h2>
        { user.me.wishes && user.me.wishes.length > 0 &&
          <form className="wishlist-form">
            <span>Quick Find</span>
            <select>
              <option>Denomination (not yet implemented)</option>
              <option value="0.005">Half Cent</option>
              <option value="0.01">1 Cent</option>
              <option value="0.02">2 Cent</option>
              <option value="0.03">3 Cent</option>
              <option value="0.05">Nickel</option>
              <option value="0.10">Dime</option>
              <option value="0.20">20 Cent</option>
              <option value="0.25">Quarter</option>
              <option value="0.50">Half Dollar</option>
              <option value="1.00">Dollar</option>
            </select>
          </form>
        }
        { !user.me.wishes &&
          <p className="no-results">:( You cant think of anything you wish for?</p>
        }
        { user.me.wishes && user.me.wishes.length > 0 &&
          <table className="wish-list branded-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Denomination</th>
                <th>Variety</th>
                <th>Ebay</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
            { user.me.wishes.map((wish, index) => {
              return (
                <tr key={wish.id}>
                  <td className="year">{wish.year}{abbreviateMint(wish.mint)}</td>
                  <td className="denomination">{denominationName(wish.issue.denomination.val)}</td>
                  <td className="variety">{wish.issue.variety}</td>
                  <td>
                    <a
                      className="ebay"
                      target="_blank"
                      href={`https://www.ebay.com/sch/i.html?_nkw=${wish.year}+${abbreviateMint(wish.mint)}+${wish.issue.variety.replace(/ /g, '+')}&LH_BIN=1&_sop=15`}
                    >
                      <i className="fa fa-gavel"/>
                    </a>
                  </td>
                  <td>
                    <i
                      className="fa fa-times"
                      onClick={() => {
                        removeFromWishList(wish.id);
                        user.refetch();
                      }}
                    />
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        }
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
