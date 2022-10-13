import React from 'react';
import { render } from '@testing-library/react';
import { BlogPost } from '../../../../types';
import BlogCard from '..';

describe('Blog Card component', () => {
  it('renders correctly', () => {
    const metaData: BlogPost = {
      node: {
        fields: {
          date: '2019-07-11 23:40:56.77',
          slug: '/blog/2019/07/11/sample-blog',
          readingTime: { text: '1 min read' },
        },
        frontmatter: {
          blogAuthors: [
            { name: 'Batman', website: 'https://bat.man', id: 'batman' },
          ],
          category: { name: 'category-mock', slug: 'blog.title' },
          title: 'Sample Test Blog',
        },
      },
    };
    const { container } = render(<BlogCard data={metaData} />);
    expect(container).toMatchSnapshot();
  });
});
