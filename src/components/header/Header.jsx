import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

/**
 * Our Header Navigational bar
 */
class Header extends React.Component {
  static propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    onMenuToggled: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isMenuOpen: false,
  };

  render() {
    const { isMenuOpen, onMenuToggled } = this.props;

    return <nav className="navbar is-primary is-transparent is-flex" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item hackernews-logo" href="/">
          <img src="/assets/hackernews.svg" alt="Hackernews" />
        </a>
      </div>

      <button onClick={ onMenuToggled } className={`button navbar-burger is-block-desktop is-primary is-inverted is-outlined ${isMenuOpen ? 'is-active' : '' }`}>
        <span />
        <span />
        <span />
      </button>
    </nav>;
  }
}

export default Header;