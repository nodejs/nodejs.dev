import React from 'react';
import renderer from 'react-test-renderer';
import EditLink from '../../src/components/edit-link';

describe('EditLink component', () => {
  it('renders correctly', () => {
    const path = '0002-node-history/index.md';
    const tree = renderer.create(<EditLink relativePath={path} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('does not render without a relative path', () => {
    const tree = renderer.create(<EditLink relativePath={null} />);
    expect(tree.getInstance()).toBeNull();
  });
});
