import React from 'react';
import { connect } from 'react-redux';

import { fetchStories } from 'actions/stories';
import Paginator from 'lib/paginator';
import Story from 'components/story/Story';

@connect( state => ({
  stories: state.stories.list,
  isLoading: state.stories.isLoading,
  error: state.stories.error,
}))
class StoryList extends React.Component {
  state = {
    maxVisiblePage: 1,
  };

  constructor(props) {
    super(props);
    this.paginator = new Paginator();
  }

  componentDidMount() {
    const { dispatch, type } = this.props;

    window.addEventListener('scroll', this.handleScrollEvent.bind(this));

    dispatch(fetchStories(type));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollEvent.bind(this));
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.stories )
      this.paginator.setItems(newProps.stories);
  }

  handleScrollEvent() {
    const scrollTop         = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight      = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight      = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom  = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && this.paginator.hasNextPage()) {
      let visiblePage = this.state.maxVisiblePage + 1;
      this.setState({ maxVisiblePage: visiblePage });
      this.paginator.setCurrentPage(visiblePage);
    }
  }

  *visiblePages() {
    const { maxVisiblePage } = this.state;

    for (let i = 1; i <= maxVisiblePage; i++) {
      yield this.paginator.page(i);
    }
  }

  renderStoryPages() {
    let $storyPages = [];

    for (let page of this.visiblePages()) {
      let $stories = [];

      if (page === null) {
        break;
      }

      for (let storyId of page) {
        $stories.push(<Story key={`story-${storyId}`} storyId={storyId} />);
      }

      $storyPages.push(<div className="stories-page" key={`stories-page-${page.num}`}>{$stories}</div>);
    }

    return $storyPages;
  }

  render() {
    const { stories, isLoading, error } = this.props;

    if ( ! stories ) {

      if (isLoading)
        return <div className="has-text-centered loading-message">
          <div className="tags has-addons is-large">
            <a className="button tag is-info is-loading is-large">Loading</a>
            <span className="tag is-large">We are loading, this won't take long, promise</span>
          </div>
        </div>;

      if (error)
        return <div>Error :(</div>;
    }

    return <div key={`story-list-${isLoading}-${error}`}>
      { this.renderStoryPages() }
    </div>;
  }
}

export default StoryList;