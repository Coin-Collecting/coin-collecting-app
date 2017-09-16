import React, { PropTypes } from "react";
import {connect} from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { store } from '../../app';
import { updateMe } from '../../actions/me';
import { withRouter } from 'react-router-dom'

import './style.scss';

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotMe: false,
    }
  }

	componentWillReceiveProps(nextProps) {
		let { data, history, me } = nextProps;
    // New Data from GraphQL Came Back
		if (!data.loading && !me.loggedIn) {
			if (data.me !== null) {
        store.dispatch(updateMe(data.me));
      } else {
        history.push('/login');
      }
		}
	}

	render() {
		const { children, data} = this.props;

		let classes = ["default-layout"];

		if (data.loading) return null;

		return (
			<div className={classes.join(' ')}>
				<div className="default-section">
					{ children }
				</div>
			</div>
		);
	}
}

DefaultLayout.propTypes = {
	location: PropTypes.object,
	data: PropTypes.object,
  me: PropTypes.object,
};

function mapStateToProps(state){
  console.log(state.reducers);
	return {
    me: state.reducers.me,
	}
}

export default compose(
  withRouter,
	connect(mapStateToProps),
  graphql(gql`
		query {
			me {
				username
				email
				admin
				}
		}
	`, {
    options: {
      fetchPolicy: 'network-only',
    }
  }),
)(DefaultLayout);
