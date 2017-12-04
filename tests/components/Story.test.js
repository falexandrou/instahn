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

// Mock locale specific functions
const toLocaleDateString = Date.prototype.toLocaleDateString;
const toLocaleTimeString = Date.prototype.toLocaleTimeString;

describe('Story Component', () => {
  beforeEach(() => {
    Object.defineProperty(Date.prototype, 'toLocaleDateString', { value: () => '2017-01-09', writable: true });
    Object.defineProperty(Date.prototype, 'toLocaleTimeString', { value: () => '19:00', writable: true });
  });

  afterEach(() => {
    Object.defineProperty(Date.prototype, 'toLocaleDateString', { value: () => toLocaleDateString, writable: true });
    Object.defineProperty(Date.prototype, 'toLocaleTimeString', { value: () => toLocaleTimeString, writable: true });
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={fakeStore}><Story storyId={storyMock.id} /></Provider>, div);
  });

  it('should match snapshot', () => {
    let component = <Provider store={fakeStore}><Story storyId={storyMock.id} /></Provider>;
    const output = renderer.create(component).toJSON();
    expect(output).toMatchSnapshot();
  });
});