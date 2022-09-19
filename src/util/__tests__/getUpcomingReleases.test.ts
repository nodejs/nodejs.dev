import { NodeReleaseData } from '../../types';
import { getUpcomingReleases } from '../getUpcomingReleases';

describe('getUpcomingReleases', () => {
  it('should return an array of upcoming releases', () => {
    const releaseData: NodeReleaseData[] = [
      {
        version: 'v14.0.0',
        fullVersion: 'v14.0.0',
        codename: 'Fermium',
        isLts: false,
        status: 'Current',
        initialRelease: '2020-08-21',
        ltsStart: '2020-10-27',
        maintenanceStart: null,
        endOfLife: '2021-09-30',
      },
    ];

    expect(getUpcomingReleases(releaseData)).toEqual([
      {
        title: 'v1.0.0',
        releases: [
          {
            alreadyReleased: true,
            releaseDate: '2020-08-21',
            releaseType: 'Current',
          },
          {
            alreadyReleased: true,
            releaseDate: '2020-09-19',
            releaseType: 'LTS',
          },
          {
            alreadyReleased: true,
            releaseDate: '2020-09-19',
            releaseType: 'Maintenance',
          },
          {
            alreadyReleased: true,
            releaseDate: '2020-09-19',
            releaseType: 'End-of-life',
          },
        ],
      },
    ]);
  });
});
