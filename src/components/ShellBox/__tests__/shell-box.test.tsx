import React from 'react';
import renderer from 'react-test-renderer';
import ShellBox from '../index';

describe('ShellBox component', (): void => {
  it('renders correctly', (): void => {
    const textToCopy = 'text to be copy';
    const tree = renderer.create(<ShellBox textToCopy={textToCopy} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
