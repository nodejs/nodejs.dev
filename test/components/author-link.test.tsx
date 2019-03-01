import React from 'react';
import renderer from 'react-test-renderer';
import AuthorLink from '../../src/components/author-link';

describe('AuthorLink component', () => {
  it('renders correctly', () => {
    const username = 'test-author';
    const tree = renderer.create(<AuthorLink username={username} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('does not render without a relative path', () => {
    const tree = renderer.create(<AuthorLink username={null} />);
    expect(tree.getInstance()).toBeNull();
  });
});
