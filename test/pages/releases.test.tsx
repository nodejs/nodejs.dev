import React from 'react';
import { render } from '@testing-library/react';
import '../__mocks__/intersectionObserverMock';
import {
  createGeneralPageData,
  createNodeReleasesData,
} from '../__fixtures__/page';
import ReleasesPage, { ReleasesNodeReleases } from '../../src/pages/releases';

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

describe('Releases page', () => {
  it('renders correctly', () => {
    const { container } = render(<ReleasesPage data={mockData.data} />);
    expect(container).toMatchSnapshot();
  });
});
