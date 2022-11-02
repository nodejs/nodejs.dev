import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import DownloadPage, { DownloadNodeReleases } from '..';
import { createNodeReleasesData } from '../../../__fixtures__/page';

const mockNodeReleasesData = createNodeReleasesData();
const nodeReleaseData: DownloadNodeReleases = {
  nodeReleases: {
    nodeReleasesData: mockNodeReleasesData,
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

  it('should render the correct LTS version', () => {
    render(<DownloadPage location={window.location} data={nodeReleaseData} />);
    expect(screen.getAllByTestId('lts')[0]).toHaveTextContent(
      'node-v16.18.0-x86.msi'
    );
  });
});
