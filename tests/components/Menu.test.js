import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Menu from 'components/menu/Menu';
import { STORIES_TOP } from 'app-constants';

describe('Menu Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Menu activeType={STORIES_TOP} onSelectType={ () => {} } />, div);
  });

  it('should match snapshot', () => {
    const output = renderer.create(<Menu activeType={STORIES_TOP} onSelectType={ () => {} } />).toJSON();
    expect(output).toMatchSnapshot();
  });
});