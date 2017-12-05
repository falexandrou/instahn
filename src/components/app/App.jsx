import React from 'react';

import Header from 'components/header/Header';
import StoryList from 'components/story-list/StoryList';
import Menu from 'components/menu/Menu';
import { fetchStories } from 'actions/stories';
import { STORIES_TOP } from 'app-constants';

import './App.scss';

/**
 * The main app container
 */
class App extends React.Component {
  /**
   * @var {Object} the component's state
   */
  state = {
    activeType: STORIES_TOP,
    isMenuOpen: false,
  };

  /**
   * Changes the type of stories we're viewing
   *
   * @param {String} the type we're switching to
   */
  handleTypeChanged(type) {
    this.setState({
      activeType: type,
      isMenuOpen: false,
    });
  }

  /**
   * Toggles the off canvas menu
   */
  handleMenuToggled() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    const { activeType, isMenuOpen } = this.state;

    return <div className="app-container">
      <Menu isOpen={isMenuOpen} onSelectType={ this.handleTypeChanged.bind(this) } activeType={ activeType } />
      <div className="main-wrapper">
        <Header isMenuOpen={ isMenuOpen } onMenuToggled={ this.handleMenuToggled.bind(this) } />
        <div className="content container">
          <StoryList key={`story-list-${activeType}`} type={activeType} />
        </div>
      </div>
    </div>;
  }
}

export default App;