import React from 'react';
import { render } from '@testing-library/react';
import { BlogMetaData } from '../../../types';
import BlogCard from '..';

describe('Blog Card component', () => {
  it('renders correctly', () => {
    const metaData: BlogMetaData = {
      node: {
        fields: {
          date: '2019-07-11 23:40:56.77',
          slug: '/blog/2019/07/11/sample-blog',
        },
        frontmatter: {
          author: [{ name: 'Batman', url: 'https://bat.man', id: 'batman' }],
          title: 'Sample Test Blog',
        },
      },
    };
    const { container } = render(<BlogCard data={metaData} />);
    expect(container).toMatchSnapshot();
  });
});
