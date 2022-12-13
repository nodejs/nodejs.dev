import React from 'react';
import { render } from '@testing-library/react';
import Author from '..';

describe('Author component', () => {
  it('renders correctly', () => {
    const username = 'test-author';
    const { container } = render(
      <Author index={1} username={username} githubImgLink="" />
    );
    expect(container).toMatchSnapshot();
  });

  it('does not render without a username', () => {
    const { container } = render(
      <Author index={0} username="" githubImgLink="" />
    );
    expect(container).toMatchSnapshot();
  });
});
