import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from '../../src/components';

describe('Tests for Link component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Link>Custom</Link>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
