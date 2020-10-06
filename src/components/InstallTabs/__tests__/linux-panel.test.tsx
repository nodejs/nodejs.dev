/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import LinuxPanel from '../LinuxPanel';

describe('Tests for LinuxPanel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LinuxPanel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
