import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../../src/components';

describe('Tests for Button component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button>Custom</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
