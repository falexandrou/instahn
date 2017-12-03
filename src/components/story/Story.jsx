import React from 'react';
import { connect } from 'react-redux';

import { fetchStory } from 'actions/stories';

import './Story.scss';

@connect( (state, ownProps) => ({
  story: (state.stories.details[ownProps.storyId] || null)
}))
class Story extends React.Component {
  componentDidMount() {
    const { dispatch, storyId } = this.props;
    dispatch( fetchStory(storyId) );
  }

  getStoryDateTime() {
    const { story: { time } } = this.props;

    if (! this.dateTime )
      this.dateTime = new Date( parseInt(time * 1000) );

    return `${this.dateTime.toLocaleDateString()} at ${this.dateTime.toLocaleTimeString()}`;
  }

  render() {
    const { story, storyId } = this.props;

    if (!story)
      return <div></div>;

    let storyDateTime = this.getStoryDateTime();

    return <article className="content story-item">
      <h2 className="title is-4">
        <a href={story.url} title={ story.title } target="_blank">
          { story.title }
        </a>
      </h2>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag">By</span>
            <span className="tag is-info">{story.by}</span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag">at</span>
            <span className="tag is-light">
              <time dateTime={ storyDateTime }>{ storyDateTime }</time>
            </span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag">Score</span>
            <span className="tag is-primary">{ story.score }</span>
          </div>
        </div>
      </div>
    </article>;
  }
}

export default Story;