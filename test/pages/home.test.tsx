import React from 'react';
import { render } from '@testing-library/react';
import Index from '../../src/pages';
import { HomepageData } from '../../src/types';
import '../__mocks__/intersectionObserverMock';

const homePageData: HomepageData = {
  page: {
    id: 'id-mock',
    html: 'html-mock',
    frontmatter: {
      title: 'title-mock',
      displayTitle: 'displayTitle-mock',
      subTitle: 'subTitle-mock',
      description: 'description-mock',
      learnLinkText: 'learnLinkText-mock',
      beginnerGuideHeaderText: 'beginnerGuideHeaderText-mock',
      beginnerGuideBodyText: 'beginnerGuideBodyText-mock',
      doMoreWithNodeHeaderText: 'doMoreWithNodeHeaderText-mock',
      doMoreWithNodeBodyText: 'doMoreWithNodeBodyText-mock',
      nodeFeatureHeader1: 'nodeFeatureHeader1-mock',
      nodeFeatureHeader2: 'nodeFeatureHeader2-mock',
      nodeFeatureHeader3: 'nodeFeatureHeader3-mock',
      nodeFeature1: 'nodeFeature1-mock',
      nodeFeature2: 'nodeFeature2-mock',
      nodeFeature3: 'nodeFeature3-mock',
      nodeFeatureAltText: 'nodeFeatureAltText-mock',
    },
  },
};

describe('Home page', () => {
  it('renders correctly', () => {
    const { container } = render(<Index data={homePageData} />);
    expect(container).toMatchSnapshot();
  });
});
