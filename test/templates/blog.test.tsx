import React from 'react';
import { render } from '@testing-library/react';
import '../__mocks__/intersectionObserverMock';

import LearnLayout from '../../src/templates/blog';
import {
  createBlogPageContext,
  createBlogPageData,
} from '../__fixtures__/page';

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
