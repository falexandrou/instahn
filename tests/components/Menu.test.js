import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Menu from 'components/menu/Menu';

describe('Menu Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Menu />, div);
  });

  it('should match snapshot', () => {
    const output = renderer.create(<Menu />).toJSON();
    expect(output).toMatchSnapshot();
  });
});