import React from 'react';
import LearnTemplate from '../../src/templates/learn';
import {
  createLearnPageData,
  createLearnPageContext,
} from '../__fixtures__/page';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('Learn Template', () => {
  it('renders correctly', () => {
    const renderer = ShallowRenderer.createRenderer();
    const learnPageData = createLearnPageData();
    const learnPageContext = createLearnPageContext();

    renderer.render(
      <LearnTemplate data={learnPageData} pageContext={learnPageContext} />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
