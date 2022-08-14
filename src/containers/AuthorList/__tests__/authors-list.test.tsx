import React from 'react';
import { render } from '../../../../test-utils.js';
import AuthorsList from '..';

describe('AuthorsList component', () => {
  it('renders correctly', () => {
    const authors = ['test-author', 'another-test-author'];
    const { container } = render(<AuthorsList authors={authors} />);
    expect(container).toMatchSnapshot();
  });
});
