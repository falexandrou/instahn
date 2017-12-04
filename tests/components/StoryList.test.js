import 'raf/polyfill';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import StoryList from 'components/story-list/StoryList';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';

import api from '../mocks/api';
import { createStore } from '../mocks/store';
import { storyMock } from '../mocks/fixtures';

const fakeStore = createStore({});

describe('StoryList Component', () => {
  beforeEach(() => {
    let storiesUrl  = api.getUrl('/topstories'),
        itemUrl     = api.getUrl(`/item/${storyMock.id}`);

    fetchMock.getOnce(storiesUrl, [storyMock.id]);
    fetchMock.getOnce(itemUrl, storyMock);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={fakeStore}><StoryList /></Provider>, div);
  });

  it('should match snapshot', () => {
    const output = renderer.create(<Provider store={fakeStore}><StoryList /></Provider>).toJSON();
    expect(output).toMatchSnapshot();
  });
});