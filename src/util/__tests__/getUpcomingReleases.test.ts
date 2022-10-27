import { getUpcomingReleases } from '../getUpcomingReleases';

describe('getUpcomingReleases', () => {
  it('should be defined', () => {
    expect(getUpcomingReleases).toBeDefined();
  });

  it('should compute upcoming releases correctly', () => {
    expect(
      getUpcomingReleases([
        {
          endOfLife: '2022-04-30',
          ltsStart: '2019-10-21',
          maintenanceStart: '2020-11-30',
          initialRelease: '2019-04-23',
          codename: 'erbium',
          version: 'v12',
          fullVersion: 'v12.0.0',
          status: 'Maintenance LTS',
          isLts: false,
        },
        {
          endOfLife: '2023-04-30',
          ltsStart: '2020-10-17',
          maintenanceStart: '2021-10-19',
          initialRelease: '2020-04-21',
          codename: 'fermium',
          version: 'v14',
          fullVersion: 'v14.0.0',
          status: 'Active LTS',
          isLts: true,
        },
        {
          endOfLife: '2025-04-30',
          ltsStart: '2022-10-25',
          maintenanceStart: '2023-10-18',
          initialRelease: '2022-04-19',
          codename: 'v18',
          version: 'v18',
          fullVersion: 'v18.0.0',
          status: 'Current',
          isLts: false,
        },
      ])
    ).toMatchSnapshot();
  });
});
