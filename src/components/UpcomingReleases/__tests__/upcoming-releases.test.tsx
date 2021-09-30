import React from 'react';
import { render } from '@testing-library/react';
import UpcomingReleases from '..';
import { getUpcomingReleases } from '../../../util/getUpcomingReleases';
import { createNodeReleasesData } from '../../../../test/__fixtures__/page';

const mockNodeReleasesData = createNodeReleasesData();
const mockUpcomingReleases = getUpcomingReleases(mockNodeReleasesData);

describe('UpcomingReleases component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <UpcomingReleases upcomingReleases={mockUpcomingReleases} />
    );
    expect(container).toMatchSnapshot();
  });
});
