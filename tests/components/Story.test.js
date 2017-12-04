import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Story from 'components/story/Story';
import { Provider } from 'react-redux';

import { createStore } from '../mocks/store';
import { storyMock } from '../mocks/fixtures';

const fakeStore = createStore({
  stories: {
    details: {
      [storyMock.id]: storyMock,
    },
  }
});

describe('Story Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={fakeStore}><Story storyId={storyMock.id} /></Provider>, div);
  });

  it('should match snapshot', () => {
    const output = renderer.create(<Provider store={fakeStore}><Story storyId={storyMock.id} /></Provider>).toJSON();
    expect(output).toMatchSnapshot();
  });
});