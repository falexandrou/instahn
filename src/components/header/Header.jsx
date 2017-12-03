import React from 'react';

import './Header.scss';

class Header extends React.Component {
  render() {
    return <nav className="navbar is-primary is-transparent" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item hackernews-logo" href="/">
          <img src="assets/hackernews.svg" alt="Hackernews" />
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <a href="https://github.com/falexandrou/instahn" target="_blank" className="navbar-item">
            <img src="assets/github.svg" alt="GitHub repository" />
          </a>
        </div>
      </div>
    </nav>;
  }
}

export default Header;