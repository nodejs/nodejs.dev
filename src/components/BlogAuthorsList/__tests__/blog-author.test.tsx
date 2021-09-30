import React from 'react';
import { render } from '@testing-library/react';
import BlogAuthor from '..';
import { BlogPostAuthor } from '../../../types';

describe('Blog Author component', () => {
  it('renders correctly', () => {
    const authors: BlogPostAuthor[] = [
      { name: 'Bruce Wayne', url: 'https://bat.man', id: 'batman' },
    ];
    const { container } = render(<BlogAuthor authors={authors} />);
    expect(container).toMatchSnapshot();
  });

  it('does not render without authors', () => {
    const { container } = render(<BlogAuthor authors={[]} />);
    expect(container).toMatchSnapshot();
  });
});
