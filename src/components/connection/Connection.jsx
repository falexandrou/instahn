import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { networkOnline, networkOffline } from 'actions/connection';

/**
 * Handles connectivity events (ie. when the browser switches to being offline)
 * and displays the corresponding indication
 */
@connect( state => ({
  isOnline: state.connection.isOnline || false,
}))
class Connection extends React.Component {
  static propTypes = {
    isOnline: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  /**
   * Sets the online status & registers window events when the component mounts
   */
  componentDidMount() {
    this.setOnlineStatus();

    window.addEventListener('online', this.setOnline.bind(this));
    window.addEventListener('offline', this.setOffline.bind(this));
  }

  /**
   * Unregisters the window events regarding online / offline presence
   */
  componentWillUnmount() {
    window.removeEventListener('online', this.setOnline.bind(this));
    window.removeEventListener('offline', this.setOffline.bind(this));
  }

  /**
   * Determines and sets the online / offline status of the browser
   */
  setOnlineStatus() {
    const isOnline = navigator.onLine;

    if (isOnline)
      return this.setOnline();

    return this.setOffline();
  }

  /**
   * Sets the browser as online
   */
  setOnline() {
    const { dispatch } = this.props;
    dispatch(networkOnline());
  }

  /**
   * Sets the browser as offline
   */
  setOffline() {
    const { dispatch } = this.props;
    dispatch(networkOffline());
  }

  /**
   * Renders the indication on whether we're online or offline
   */
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