import React from 'react';
import { render } from '@testing-library/react';
import RecentPosts from '..';
import { createBlogPageData } from '../../../__fixtures__/page';

describe('RecentPosts component', (): void => {
  it('should render correctly', (): void => {
    const {
      recent: { edges: recentPosts },
    } = createBlogPageData();

    const { container } = render(<RecentPosts posts={recentPosts} />);

    expect(container).toMatchSnapshot();
  });
});
