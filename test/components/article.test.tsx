import React from 'react';
import Article from '../../src/components/article';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import {
  createLearnPageData,
  createLearnPageContext,
  createLearnPageTocData,
} from '../__fixtures__/page';

describe('Article component', () => {
  it('renders correctly', () => {
    const renderer = ShallowRenderer.createRenderer();
    const learnPageData = createLearnPageData();
    const learnPageContext = createLearnPageContext();
    const learnPageTocData = createLearnPageTocData();

    const {
      doc: {
        frontmatter: { title, description },
        html,
        fields: { authors },
      },
    } = learnPageData;

    const { relativePath, next, previous } = learnPageContext;

    const { learnPageToc } = learnPageTocData;

    renderer.render(
      <Article
        title={title}
        html={html}
        next={next}
        previous={previous}
        authors={authors}
        relativePath={relativePath}
        tableOfContents={learnPageToc}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
