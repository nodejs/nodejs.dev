import React from 'react';
import { render } from '@testing-library/react';
import DownloadReleases from '..';
import { getUpcomingReleases } from '../../../util/getUpcomingReleases';
import { createNodeReleasesData } from '../../../../test/__fixtures__/page';

const mockNodeReleasesData = createNodeReleasesData();
const mockUpcomingReleases = getUpcomingReleases(mockNodeReleasesData);

describe('DownloadReleases component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <DownloadReleases
        // nodeReleasesData={[
        //   {
        //     release: 'v15',
        //     status: 'Pending',
        //     codename: '',
        //     initialRelease: '2020-10-20',
        //     activeLTSStart: '',
        //     maintenanceLTSStart: '2021-04-01',
        //     endOfLife: '2021-06-01',
        //   },
        // ]}
        nodeReleasesData={mockNodeReleasesData}
        upcomingReleases={mockUpcomingReleases}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
