import {
  STORIES_FETCHING,
  STORIES_FETCHED,
  STORIES_FETCH_FAILED,
  STORY_FETCHING,
  STORY_FETCHED,
  STORY_FETCH_FAILED,
} from 'actions/stories';


import storiesReducer from 'reducers/stories';

describe('stories reducer', () => {

  it('should return the initial state', () => {
    expect(storiesReducer(undefined, {})).toEqual({});
  });

  it('should describe the STORIES_FETCHING state', () => {
    expect(storiesReducer({}, { type: STORIES_FETCHING })).toEqual({
      isLoading: true,
      error: false,
      list: [],
      details: {},
    });
  });

  it('should mark the STORIES_FETCHED state', () => {
    let stories = [ 1,2,3,4 ];

    expect(storiesReducer({}, { type: STORIES_FETCHED, stories: stories })).toEqual({
      isLoading: false,
      error: false,
      list: stories,
    });
  });

  it('should mark the STORIES_FETCH_FAILED state', () => {
    expect(storiesReducer({}, { type: STORIES_FETCH_FAILED })).toEqual({
      isLoading: false,
      error: true,
    });
  });

  it('should mark the STORY_FETCH_FAILED state', () => {
    let details = { title: 'Hello World' },
        storyId = 15;

    expect(storiesReducer({}, { type: STORY_FETCHED, storyId: storyId, story: details })).toEqual({
      details: {
        [storyId]: details,
      }
    });
  });
});
