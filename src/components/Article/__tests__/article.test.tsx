import React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import Article from '..';
import {
  createLearnPageData,
  createLearnPageContext,
} from '../../../../test/__fixtures__/page';

describe('Article component', () => {
  it('renders correctly', () => {
    const renderer = ShallowRenderer.createRenderer();
    const learnPageData = createLearnPageData();
    const learnPageContext = createLearnPageContext();

    const {
      doc: {
        frontmatter: { title, description },
        html,
        fields: { authors },
      },
    } = learnPageData;

    const { relativePath, next, previous } = learnPageContext;

    renderer.render(
      <Article
        title={title}
        html={html}
        next={next}
        previous={previous}
        authors={authors}
        relativePath={relativePath}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
