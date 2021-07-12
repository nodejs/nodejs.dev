import React from 'react';
import { render } from '@testing-library/react';
import Index, { HomeNodeReleases } from '../../src/pages';
import { HomepageData, BannersIndex } from '../../src/types';
import { createNodeReleasesDataDetail } from '../__fixtures__/page';
import '../__mocks__/intersectionObserverMock';

const mockNodeReleasesDataDetail = createNodeReleasesDataDetail();
const mockNodeReleasesLTSVersion = mockNodeReleasesDataDetail.map(
  ({ lts, version }) => ({
    lts,
    version,
  })
);

const mockHomeNodeReleases: HomeNodeReleases = {
  nodeReleases: {
    nodeReleasesLTSVersion: mockNodeReleasesLTSVersion,
  },
};

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

const bannersIndex: BannersIndex = {
  endDate: new Date().toISOString(),
  link: 'test/banner/link',
  text: 'Test banner text',
  startDate: new Date().toISOString(),
};

const mockData = {
  ...mockHomeNodeReleases,
  ...homePageData,
  banners: {
    bannersIndex,
  },
};

describe('Home page', () => {
  it('renders correctly', () => {
    const { container } = render(<Index data={mockData} />);
    expect(container).toMatchSnapshot();
  });
  describe('Banner', () => {
    it.todo('renders Banner when today between startDate and endDate');
    it.todo('does not render Banner when today before startDate');
    it.todo('does not render Banner when today after endDate');
  });
});
