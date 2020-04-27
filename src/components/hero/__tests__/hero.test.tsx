/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import Hero from '..';

describe('Hero component', () => {
  it('renders correctly', () => {
    const title = 'Introduction to Node.js';
    const tree = renderer.create(<Hero title={title} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
