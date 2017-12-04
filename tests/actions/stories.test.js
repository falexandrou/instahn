import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { storyListMock, storyMock } from '../mocks/fixtures';

import {
  STORIES_FETCHING,
  STORIES_FETCHED,
  STORIES_FETCH_FAILED,
  STORY_FETCHING,
  STORY_FETCHED,
  STORY_FETCH_FAILED,

  fetchStories,
  fetchStory,
} from 'actions/stories';

import api from '../mocks/api';

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares);

describe('stories action creators', () => {
  beforeEach(() => fetchMock.restore());

  // Test whether we fetch the stories correctly
  it('dispatches the appropriate actions when the stories are fetched', () => {
    let storiesUrl = api.getUrl('/topstories');
    fetchMock.getOnce(storiesUrl, storyListMock);

    let expectedActions = [
      { type: STORIES_FETCHING },
      { type: STORIES_FETCHED, stories: storyListMock.sort().reverse() },
    ];

    let store = mockStore({ list: [] });

    return store.dispatch(fetchStories()).then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it ('dispatches error actions when the stories fail to be fetched', () => {
    let storiesUrl = api.getUrl('/topstories');
    fetchMock.getOnce(storiesUrl, JSON.stringify(null));

    let expectedActions = [
      { type: STORIES_FETCHING },
      { type: STORIES_FETCH_FAILED },
    ];

    let store = mockStore({ list: [] });

    return store.dispatch(fetchStories()).then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it ('dispatches the appropriate actions when a story is fetched', () => {
    let storyId     = 8863,
        storyUrl    = api.getUrl(`/item/${storyId}`);

    fetchMock.getOnce(storyUrl, storyMock);

    let expectedActions = [
      { type: STORY_FETCHING },
      { type: STORY_FETCHED, story: storyMock, storyId },
    ];

    let store = mockStore({ details: [] });

    return store.dispatch(fetchStory(storyId)).then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it ('dispatches error actions when a story fails to be fetched', () => {
    let storyId     = 8863,
        storyUrl    = api.getUrl(`/item/${storyId}`);

    fetchMock.getOnce(storyUrl, JSON.stringify(null));

    let expectedActions = [
      { type: STORY_FETCHING },
      { type: STORY_FETCH_FAILED },
    ];

    let store = mockStore({ details: [] });

    return store.dispatch(fetchStory(storyId)).then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});