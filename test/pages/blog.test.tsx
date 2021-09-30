import React from 'react';
import { render } from '@testing-library/react';
import AllBlogPosts from '../../src/pages/blog';
import { createBlogData } from '../__fixtures__/page';
import '../__mocks__/intersectionObserverMock';

const mockData = createBlogData();

describe('Blog page', () => {
  it('renders correctly', () => {
    const { container } = render(<AllBlogPosts data={mockData} />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for empty blogs list', () => {
    const { container } = render(
      <AllBlogPosts
        data={{
          blogs: {
            edges: [],
          },
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
