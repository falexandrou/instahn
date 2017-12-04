import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Header from 'components/header/Header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
  });

  it('should match snapshot', () => {
    const output = renderer.create(<Header />).toJSON();
    expect(output).toMatchSnapshot();
  });
});