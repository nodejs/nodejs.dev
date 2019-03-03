import React from 'react';
import Article from '../../src/components/article';
import { createRemarkPage, createPageInfo } from '../__fixtures__/page';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('Article component', () => {
  it('renders correctly', () => {
    const renderer = ShallowRenderer.createRenderer();
    const pageMock = createRemarkPage('mock-page');
    const prevMock = createPageInfo('mock-prev');
    const nextMock = createPageInfo('mock-next');
    renderer.render(
      <Article page={pageMock} previous={prevMock} next={nextMock} />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
