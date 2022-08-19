import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import DownloadPage, {
  DownloadNodeReleases,
} from '../../../src/pages/download';
import {
  createNodeReleasesData,
  createNodeReleasesDataDetail,
} from '../../__fixtures__/page';
import '../../__mocks__/intersectionObserverMock';

const mockNodeReleasesData = createNodeReleasesData();
const mockNodeReleasesDataDetail = createNodeReleasesDataDetail();
const mockNodeReleasesLTSNPMVersion = mockNodeReleasesDataDetail.map(
  ({ lts, version, npm }) => ({
    lts,
    version,
    npm,
  })
);

const nodeReleaseData: DownloadNodeReleases = {
  nodeReleases: {
    nodeReleasesData: mockNodeReleasesData,
    nodeReleasesLTSNPMVersion: mockNodeReleasesLTSNPMVersion,
  },
};

expect.extend(toHaveNoViolations);
describe('Download page', () => {
  it('renders correctly', () => {
    const { container } = render(
      <DownloadPage location={window.location} data={nodeReleaseData} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should handle LTS to Current switch', async () => {
    const { container } = render(
      <DownloadPage location={window.location} data={nodeReleaseData} />
    );

    await userEvent.click(screen.getAllByText('Current')[0]);

    expect(container).toMatchSnapshot();
  });

  // TODO: fix this test
  it.skip('shold have no a11y violations', async () => {
    const { container } = render(
      <DownloadPage location={window.location} data={nodeReleaseData} />
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
