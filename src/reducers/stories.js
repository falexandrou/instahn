import {
  STORIES_FETCHING,
  STORIES_FETCHED,
  STORIES_FETCH_FAILED,
  STORY_FETCHED,
} from 'actions/stories';

const stories = (state = {}, action) => {
  switch (action.type) {
    case STORIES_FETCHING:
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
        list: [],
        details: {},
      });

    case STORIES_FETCHED:
      return Object.assign({}, state, {
        isLoading: false,
        error: false,
        list: action.stories,
      });

    case STORIES_FETCH_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        error: true,
      });

    case STORY_FETCHED:
      return Object.assign({}, state, {
        details: Object.assign({}, state.details, {
          [action.storyId]: action.story,
        }),
      })
  }
  return state;
};

export default stories;