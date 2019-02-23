import React from 'react';
import Article from '../../src/components/article';
import { createRemarkPage, createPageInfo } from '../__fixtures__/page';

const ShallowRenderer = require('react-test-renderer/shallow');

describe('Article component', () => {
  it('renders correctly', () => {
    const renderer = new ShallowRenderer();
    const pageMock = createRemarkPage('mock-page');
    const prevMock = createPageInfo('mock-prev');
    const nextMock = createPageInfo('mock-next');
    renderer.render(
      <Article
        page={pageMock}
        previous={prevMock}
        next={nextMock}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
