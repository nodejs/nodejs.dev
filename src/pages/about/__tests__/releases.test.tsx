import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import {
  createGeneralPageData,
  createNodeReleasesData,
} from '../../../__fixtures__/page';
import ReleasesPage, { ReleasesNodeReleases } from '../releases';

const mockNodeReleasesData = createNodeReleasesData();
const mockReleasesNodeReleases: ReleasesNodeReleases = {
  nodeReleases: {
    nodeReleasesData: mockNodeReleasesData,
  },
};

const mockPageData = createGeneralPageData();
const mockData = {
  data: {
    ...mockPageData.data,
    ...mockReleasesNodeReleases,
  },
};
expect.extend(toHaveNoViolations);

describe('Releases page', () => {
  it('renders correctly', () => {
    const { container } = render(<ReleasesPage data={mockData.data} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });
  it('should have no a11y violations', async () => {
    const { container } = render(<ReleasesPage data={mockData.data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
