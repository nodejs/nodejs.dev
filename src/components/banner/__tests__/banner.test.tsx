/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import Banner from '..';

describe('Tests for Header component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Banner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
