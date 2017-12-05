import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Menu from 'components/menu/Menu';
import { STORIES_TOP } from 'app-constants';

import { Provider } from 'react-redux';

import { createStore } from '../mocks/store';

const fakeStore = createStore();

describe('Menu Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={fakeStore}><Menu isOpen={false} activeType={STORIES_TOP} onSelectType={ () => {} } /></Provider>, div);
  });

  it('should match snapshot when the menu is closed', () => {
    const output = renderer.create(<Provider store={fakeStore}><Menu isOpen={false} activeType={STORIES_TOP} onSelectType={ () => {} } /></Provider>).toJSON();
    expect(output).toMatchSnapshot();
  });

  it('should match snapshot when the menu is open', () => {
    const output = renderer.create(<Provider store={fakeStore}><Menu isOpen={true} activeType={STORIES_TOP} onSelectType={ () => {} } /></Provider>).toJSON();
    expect(output).toMatchSnapshot();
  });
});