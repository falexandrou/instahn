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

import './Menu.scss';

class Menu extends React.Component {
  static propTypes = {
    activeType: PropTypes.oneOf(ALL_TYPES).isRequired,
    onSelectType: PropTypes.func.isRequired,
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
    const { activeType, onSelectType } = this.props;

    let $menuItems = Object.keys(this.labels).map( key => {
      return <li key={`item-${key}`}>
        <a className={ activeType == key ? 'is-active' : '' } onClick={ () => onSelectType(key) }>
          { this.labels[key] }
        </a>
      </li>;
    });

    return <aside className="menu type-selection">
      <ul className="menu-list">{$menuItems}</ul>
    </aside>;
  }
}

export default Menu;