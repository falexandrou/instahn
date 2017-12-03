import React from 'react';

import Header from 'components/header/Header';
import StoryList from 'components/story-list/StoryList';
import Connection from 'components/connection/Connection';
import Menu from 'components/menu/Menu';

import { STORIES_TOP } from 'app-constants';

import './App.scss';

class App extends React.Component {
  state = {
    activeType: STORIES_TOP,
  };

  setType(type) {
    return this.setState({ activeType: type });
  }

  render() {
    const { activeType } = this.state;

    return <div className="app-container">
      <Header />
      <div className="container">
        <div className="columns">
          <div className="column is-three-quarters">
            <StoryList key={`story-list-${activeType}`} type={activeType} />
          </div>
          <div className="column is-one-quarter">
            <Menu onSelectType={ this.setType.bind(this) } activeType={ activeType } />
            <Connection />
          </div>
        </div>
      </div>
    </div>;
  }
}

export default App;