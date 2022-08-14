import React from 'react';
import { render } from '../../../../test-utils.js';
import BlogAuthor from '..';
import { BlogPostAuthor } from '../../../types';

describe('Blog Author component', () => {
  it('renders correctly', () => {
    const authors: BlogPostAuthor[] = [
      { name: 'Bruce Wayne', website: 'https://bat.man', id: 'batman' },
    ];
    const { container } = render(<BlogAuthor authors={authors} />);
    expect(container).toMatchSnapshot();
  });

  it('does not render without authors', () => {
    const { container } = render(<BlogAuthor authors={[]} />);
    expect(container).toMatchSnapshot();
  });
});
