/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import InstallTabs from '../index';

describe('Tests for InstallTabs component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<InstallTabs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
