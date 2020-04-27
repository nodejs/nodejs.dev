import React from 'react';
import renderer from 'react-test-renderer';
import AuthorsList from '../authors-list';

describe('AuthorsList component', () => {
  it('renders correctly', () => {
    const authors = ['test-author', 'another-test-author'];
    const tree = renderer.create(<AuthorsList authors={authors} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('does not render without an authors list', () => {
    const tree = renderer.create(<AuthorsList authors={null} />);
    expect(tree.getInstance()).toBeNull();
  });
});
