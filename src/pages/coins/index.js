import React, { PropTypes } from "react";
import { graphql, gql, compose } from 'react-apollo';
import {connect} from 'react-redux';
import { CreateCoinMutation } from '../../mutations';
import Spinner from '../../components/spinner';
const FontAwesome = require('react-fontawesome');
import DefaultLayout from '../../layouts/default';
import queryString from 'query-string';

import './style.scss';

const DEFAULT_COIN_COUNT = 25;

class Coins extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			coinCount: 5,
		}
	}

	componentWillMount() {
    let { location } = this.props;
    let { count } = queryString.parse(location.search);
    if (!count) this.updateCount();
	}

  updateCount(count) {
    if (!count) count = DEFAULT_COIN_COUNT;
    this.updateUrl({"key": "count", "value": count});
  }

  updateOrder(order) {
    this.updateUrl({"key": "order", "value": order});
  }

  updateUrl({key, value}) {
	  if (!key && !value) return;
    if (!value) value = '';
    let { history } = this.props;
    let query = queryString.parse(location.search);
    query[key] = value;
    let newQuery = queryString.stringify(query);
    history.push({
      search: newQuery,
    });
  }

	loadMore() {
		let { data, location } = this.props;
		let { edges } = data.coins;
    let { count } = queryString.parse(location.search);

		this.setState({isLoading: true});

    data.fetchMore({
      variables: {
        cursor: edges[edges.length - 1].cursor,
        count,
        offset: 0,
      },
      updateQuery(previousResult, {fetchMoreResult}) {
        return {
          coins: {
            edges: [
              ...previousResult.coins.edges,
              ...fetchMoreResult.coins.edges,
            ],
            pageInfo: fetchMoreResult.coins.pageInfo,
            totalCount: fetchMoreResult.coins.totalCount,
          },
        };
      },
    }).then(() => this.setState({isLoading: false}));
	}

	render() {
		const { data, browser, location, me } = this.props;
    let { count, order } = queryString.parse(location.search);
		const { coins } = data;
		let classes = ['coins-page', browser.mediaType];

		return (
			<DefaultLayout location={location}>
				<section className={classes.join(' ')}>
					<article className={me.admin ? "main-article" : "main-article-no-admin"}>
						<h3>Coins</h3>
						<div className="sub-filters">
							<p className="results-header clearfix">
								<span>Results ({coins ? coins.edges.length : 0} of {coins ? coins.totalCount : 0})</span>
							</p>
              <div className="count-select-wrapper">
                <span className="label">Per Page:</span>
                <div className="select-wrapper">
                  <select
                    onChange={e => this.updateCount(e.target.value)}
                    value={count}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="order-select-wrapper">
                <span className="label">Order by:</span>
                <div className="select-wrapper">
                  <select
                    onChange={e => this.updateOrder(e.target.value)}
                    value={order}
                  >
                    <option value="year.ASC">Year (Asc)</option>
                    <option value="year.DESC">Year (Desc)</option>
                  </select>
                </div>
              </div>
						</div>
						<ul className="coins-list">
							{ coins && coins.edges.length && !data.loading > 0 ?
								coins.edges.map(({ node }, index) => {
									return (
										<li key={'coin:' + node.id + index}>
                      <p>{ node.year + '-' + node.mint }</p>
                      <p>{ node.issue.variety }</p>
                      <p>{ node.issue.denomination.kind }</p>
										</li>
									)
								})
								:
								<p className="empty">Make a coin or two, there are none!</p>
							}
						</ul>
            { data.loading || this.state.isLoading ? <Spinner/> : null }
            { coins && !data.loading && coins.pageInfo.hasNextPage ?
							<div className="load-more-container">
								<button onClick={() => this.loadMore()} disabled={this.state.isLoading}>Load More</button>
							</div>
              : null }
					</article>
				</section>
			</DefaultLayout>
		);
	}
}

Coins.propTypes = {
	location: PropTypes.object,
	data: PropTypes.object,
	createCoin: PropTypes.func,
	me: PropTypes.object,
};

function mapStateToProps(state){
	return {
		browser: state.browser,
		me: state.reducers.me,
	}
}

let CoinsQuery = gql`
    query ($count: Int, $cursor: String, $offset: Int, $order: String,)
		{
        coins(count: $count, cursor: $cursor, offset: $offset, order: $order) {
            totalCount
            edges {
                cursor
                node {
                    id
                    year
                    mint
                    mintage
                    description
                    issue {
                        denomination {
                            id
                            kind
                            val
                        }
                        mass
                        variety
                        endYear
                        startYear
                        composition
                        id
                    }
                }
            }
            pageInfo {
                startCursor
                endCursor
                hasNextPage
            }
        }
    }
`;

let coinQueryWithData = graphql(CoinsQuery, {
  options: (props) => {
  	let { count, order } = queryString.parse(props.location.search);
  	return {
			variables: {
        count: parseInt(count),
        order: order ? order : undefined,
			}
  	}
  }
});

export default compose(
	connect(mapStateToProps),
	coinQueryWithData,
)(Coins);
