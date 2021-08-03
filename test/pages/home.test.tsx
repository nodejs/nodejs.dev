import React from 'react';
import { render, screen } from '@testing-library/react';
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
    body: 'body-mock',
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
    it('renders Banner when today between startDate and endDate', () => {
      const beforeToday = new Date();
      beforeToday.setDate(beforeToday.getDate() - 1);
      const afterToday = new Date();
      afterToday.setDate(afterToday.getDate() + 1);

      bannersIndex.startDate = beforeToday.toISOString();
      bannersIndex.endDate = afterToday.toISOString();

      render(<Index data={mockData} />);

      const bannerText = screen.getByText(bannersIndex.text);
      expect(bannerText).toBeInTheDocument();
    });
    it('does not render Banner when today before startDate', () => {
      const beforeToday = new Date();
      beforeToday.setDate(beforeToday.getDate() + 1);
      const afterToday = new Date();
      afterToday.setDate(afterToday.getDate() + 2);

      bannersIndex.startDate = beforeToday.toISOString();
      bannersIndex.endDate = afterToday.toISOString();

      render(<Index data={mockData} />);

      const bannerText = screen.queryByText(bannersIndex.text);
      expect(bannerText).not.toBeInTheDocument();
    });
    it('does not render Banner when today after endDate', () => {
      const beforeToday = new Date();
      beforeToday.setDate(beforeToday.getDate() - 2);
      const afterToday = new Date();
      afterToday.setDate(afterToday.getDate() - 1);

      bannersIndex.startDate = beforeToday.toISOString();
      bannersIndex.endDate = afterToday.toISOString();

      render(<Index data={mockData} />);

      const bannerText = screen.queryByText(bannersIndex.text);
      expect(bannerText).not.toBeInTheDocument();
    });
  });
});
