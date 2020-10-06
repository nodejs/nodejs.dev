/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import MacOSPanel from '../MacOSPanel';

describe('Tests for MacOSPanel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MacOSPanel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
