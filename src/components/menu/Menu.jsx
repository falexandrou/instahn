import React from 'react';
import PropTypes from 'prop-types';

import {
  STORIES_TOP,
  STORIES_SHOW,
  STORIES_BEST,
  STORIES_NEW,
  STORIES_ASK,
  ALL_TYPES,
} from 'app-constants';

import Connection from 'components/connection/Connection';

import './Menu.scss';

/**
 * Displays a menu that lists all the available HackerNews story types
 */
class Menu extends React.Component {
  static propTypes = {
    activeType: PropTypes.oneOf(ALL_TYPES).isRequired,
    onSelectType: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isOpen: false,
  };

  /**
   * @var {Object} the labels to apply to the menu
   */
  labels = {
    [STORIES_TOP]: `Top Stories`,
    [STORIES_NEW]: `New on HackerNews`,
    [STORIES_BEST]: `Best Of`,
    [STORIES_SHOW]: `Show HackerNews`,
    [STORIES_ASK]: `Ask HackerNews`,
  };

  render () {
    const { activeType, onSelectType, isOpen } = this.props;

    let $menuItems = Object.keys(this.labels).map( key => {
      return <li key={`item-${key}`}>
        <a className={ activeType == key ? 'is-active' : '' } onClick={ () => onSelectType(key) }>
          { this.labels[key] }
        </a>
      </li>;
    });

    return <nav className={`navigation-menu ${isOpen ? 'is-open' : ''}`} aria-label="secondary navigation">
      <div className="navbar is-primary">
        <div className="navbar-brand">
          <a className="navbar-item hackernews-logo" href="/">
            <img src="/assets/hackernews.svg" alt="Hackernews" />
          </a>
        </div>
      </div>
      <div className="menu">
        <p className="menu-label">More HackerNews Stories</p>
        <ul className="menu-list">{$menuItems}</ul>
      </div>
      <footer>
        <Connection />
      </footer>
    </nav>;
  }
}

export default Menu;