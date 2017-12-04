export const STORIES_FETCHING       = 'STORIES_FETCHING';
export const STORIES_FETCHED        = 'STORIES_FETCHED';
export const STORIES_FETCH_FAILED   = 'STORIES_FETCH_FAILED';

export const STORY_FETCHING         = 'STORY_FETCHING';
export const STORY_FETCHED          = 'STORY_FETCHED';
export const STORY_FETCH_FAILED     = 'STORY_FETCH_FAILED';

export const fetchStories = (type) => {
  return async (dispatch, getState, api) => {   // eslint-disable-line no-unused-vars
    dispatch({ type: STORIES_FETCHING });

    const storyList = await api.fetchStories(type);

    if (storyList === null)
      return dispatch({ type: STORIES_FETCH_FAILED });

    return dispatch({
      type: STORIES_FETCHED,
      stories: storyList,
    });
  };
};

export const fetchStory = (id) => {
  return async (dispatch, getState, api) => {   // eslint-disable-line no-unused-vars
    dispatch({ type: STORY_FETCHING });

    const story = await api.fetchStory(id);

    if (story === null)
      return dispatch({ type: STORY_FETCH_FAILED });

    return dispatch({
      type: STORY_FETCHED,
      story: story,
      storyId: id,
    });
  };
};