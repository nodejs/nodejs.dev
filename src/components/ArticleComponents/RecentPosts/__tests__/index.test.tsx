import React from 'react';
import { render } from '@testing-library/react';
import RecentPosts from '..';
import { createBlogPageContext } from '../../../../__fixtures__/page';

describe('RecentPosts component', (): void => {
  it('should render correctly', (): void => {
    const { recent } = createBlogPageContext();

    const { container } = render(<RecentPosts posts={recent} />);

    expect(container).toMatchSnapshot();
  });
});
