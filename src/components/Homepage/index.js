import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Homepage extends React.Component {
  render() {
    let { user } = this.props;
    console.log({user});

    return (
      <article className="homepage-article">
        Homepage!
      </article>
    );
  }
}

Homepage.propTypes = {
  user: PropTypes.object,
};

const mapDispatchToProps = (state) => {
  return {
    user: state.reducers.authentication.user,
  }
}
export default connect(mapDispatchToProps)(Homepage);
