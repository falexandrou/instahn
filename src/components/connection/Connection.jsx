import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { networkOnline, networkOffline } from 'actions/connection';

@connect( state => ({
  isOnline: state.connection.isOnline || false,
}))
class Connection extends React.Component {

  static propTypes = {
    isOnline: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    this.setOnlineStatus();

    window.addEventListener('online', this.setOnline.bind(this));
    window.addEventListener('offline', this.setOffline.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.setOnline.bind(this));
    window.removeEventListener('offline', this.setOffline.bind(this));
  }

  setOnlineStatus() {
    const isOnline = navigator.onLine;

    if (isOnline)
      return this.setOnline();

    return this.setOffline();
  }

  setOnline() {
    const { dispatch } = this.props;
    dispatch(networkOnline());
  }

  setOffline() {
    const { dispatch } = this.props;
    dispatch(networkOffline());
  }

  renderIndication() {
    const { isOnline } = this.props;

    if ( ! isOnline )
      return <span className="tag is-warning">Offline :(</span>;

    return <span className="tag is-primary">Online!</span>;
  }

  render() {
    return <div className="tags has-addons">
      <span className="tag">Connectivity</span>
      { this.renderIndication() }
    </div>;
  }
}

export default Connection;