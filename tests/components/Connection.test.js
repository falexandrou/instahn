import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Connection from 'components/connection/Connection';
import { Provider } from 'react-redux';

import { createStore } from '../mocks/store';

const fakeStore = createStore();

describe('Connection Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={fakeStore}><Connection /></Provider>, div);
  });

  it('should match snapshot when online', () => {
    const output = renderer.create(<Provider store={fakeStore}><Connection /></Provider>).toJSON();
    expect(output).toMatchSnapshot();
  });

  it('should match snapshot when offline', () => {
    // Mock offline behavior
    Object.defineProperty(global.navigator, 'onLine', { value: false, writable: true });
    const output = renderer.create(<Provider store={fakeStore}><Connection /></Provider>).toJSON();
    expect(output).toMatchSnapshot();
  });

});