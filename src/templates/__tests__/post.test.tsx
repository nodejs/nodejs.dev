import React from 'react';
import { render } from '@testing-library/react';
import LearnLayout from '../post';
import {
  createBlogPageContext,
  createBlogPageData,
} from '../../__fixtures__/page';

const postPageData = createBlogPageData();
const context = createBlogPageContext();

describe('LearnLayout Template', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LearnLayout data={postPageData} pageContext={context} />
    );
    expect(container).toMatchSnapshot();
  });
});
