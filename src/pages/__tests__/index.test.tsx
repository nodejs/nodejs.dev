import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Index, { HomeNodeReleases } from '..';
import { BannersIndex } from '../../types';
import { createNodeReleasesData } from '../../__fixtures__/page';

const mockNodeReleasesData = createNodeReleasesData();

const mockHomeNodeReleases: HomeNodeReleases = {
  nodeReleases: {
    nodeReleasesData: mockNodeReleasesData,
  },
};

const homePageData = {
  articleCurrentLanguage: {
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
expect.extend(toHaveNoViolations);

describe('Home page', () => {
  it('renders correctly', () => {
    const { container } = render(<Index data={mockData} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('renders i18n when feature toggle is present', () => {
    const localStorageGetSpy = jest
      .fn()
      .mockImplementation(() => '["i18n-language-selector"]');

    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: localStorageGetSpy,
      },
    });

    const { container } = render(<Index data={mockData} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
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

      const bannerText = screen.getByText(bannersIndex.text || '');
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

      const bannerText = screen.queryByText(bannersIndex.text || '');
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

      const bannerText = screen.queryByText(bannersIndex.text || '');
      expect(bannerText).not.toBeInTheDocument();
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Index data={mockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
