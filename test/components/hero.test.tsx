import React from 'react';
import renderer from 'react-test-renderer';
import Hero from '../../src/components/hero';

describe('Hero component', () => {
  it('renders correctly', () => {
    const title = 'Introduction to Node.js';
    const tree = renderer.create(<Hero title={title} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
