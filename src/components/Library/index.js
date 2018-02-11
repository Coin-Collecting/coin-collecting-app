import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import './style.scss';

const DEFAULT_COUNT = 30;

const LibraryQuery = gql`
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


class Library extends React.Component {
  render() {
    const { data: { loading, coins }, issueId, page} = this.props;

    if (loading) return (<Spinner />);

    return (
      <div>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Mint</th>
          </tr>
        </thead>
        <tbody>
        {
          coins && coins.edges && coins.edges.map(coin => {
            const { id, year, mint } = coin.node;
            return (
              <tr key={id}>
                <td>{ year }</td>
                <td>{ mint }</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      { coins && parseInt(page) - 1 > 0 &&
        <Link to={`/library/${issueId}/${parseInt(page) - 1}`} >
          Prev Page
        </Link>
      }
      { coins && coins.pageInfo.hasNextPage &&
        <Link to={`/library/${issueId}/${parseInt(page) + 1}`} >
          Next Page
        </Link>
      }
      </div>
    );
  }
}

Library.propTypes = {
  data: PropTypes.shape({
    collection: PropTypes.array,
  }),
};

Library.defaultProps = {
  data: {},
};

export default compose(graphql(LibraryQuery, {
  options: ({ issueId, page }) => {
    return {
      variables: {
        count: DEFAULT_COUNT,
        issueId: issueId,
        offset: page * DEFAULT_COUNT - DEFAULT_COUNT,
      },
    }
  },
}))(Library);
