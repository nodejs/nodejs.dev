/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import ShellBox from '../index';

describe('ShellBox component', () => {
  it('renders correctly', () => {
    const textToCopy = 'text to be copy';
    const tree = renderer.create(<ShellBox textToCopy={textToCopy} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
