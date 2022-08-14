import React from 'react';
import { render } from '../../../../test-utils.js';
import { BlogMetaData } from '../../../types';
import BlogCard from '..';

describe('Blog Card component', () => {
  it('renders correctly', () => {
    const metaData: BlogMetaData = {
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
          category: { name: 'category-mock', slug: 'category-mock-slug' },
          title: 'Sample Test Blog',
        },
      },
    };
    const { container } = render(<BlogCard data={metaData} />);
    expect(container).toMatchSnapshot();
  });
});
