/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import Author from '..';

describe('Author component', () => {
  it('renders correctly', () => {
    const username = 'test-author';
    const tree = renderer
      .create(<Author username={username} size="60" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('does not render without a username', () => {
    const tree = renderer.create(
      <Author key={null} username={null} size={null} />
    );
    expect(tree.getInstance()).toBeNull();
  });
});
