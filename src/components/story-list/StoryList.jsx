import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ALL_TYPES } from 'app-constants';
import { fetchStories } from 'actions/stories';
import Paginator from 'lib/paginator';
import Story from 'components/story/Story';

@connect( state => ({
  isOnline: state.connection.isOnline,
  stories: state.stories.list,
  isLoading: state.stories.isLoading,
  error: state.stories.error,
}))
class StoryList extends React.Component {
  /**
   * @var {Object} the state of the component
   */
  state = {
    maxVisiblePage: 1,
  };

  static propTypes = {
    stories: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
    type: PropTypes.oneOf(ALL_TYPES).isRequired,
    isOnline: PropTypes.bool,
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
    if (newProps.stories)
      this.paginator.setItems(newProps.stories);
  }

  /**
   * Determines whether we've scrolled to the bottom of the page and takes action if so
   */
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

  /**
   * Iterates through the visible pages
   * (ie. pages that are already loaded)
   *
   * @generator
   */
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
    const { stories, isLoading, error, isOnline } = this.props;

    if ( ! stories || ! stories.length ) {
      if (isLoading)
        return <div className="has-text-centered loading-message">
          <div className="tags has-addons is-large">
            <a className="button tag is-info is-loading is-large">Loading</a>
            <span className="tag is-large">We are loading, this won&quot;t take long, promise</span>
          </div>
        </div>;

      if (error)
        return <div className="has-text-centered loading-message">
          <div className="tags has-addons is-large">
            <a className="button tag is-danger is-delete is-large"></a>
            <span className="tag is-large">An error occurred, please { !isOnline ? `connect to the Internet & refresh` : `refresh` }</span>
          </div>
        </div>;
    }

    return <div key={`story-list-${isLoading}-${error}`}>
      { this.renderStoryPages() }
    </div>;
  }
}

export default StoryList;