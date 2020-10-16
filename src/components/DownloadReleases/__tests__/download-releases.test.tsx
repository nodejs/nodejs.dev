import React from 'react';
import renderer from 'react-test-renderer';
import DownloadReleases from '..';

describe('DownloadReleases component', (): void => {
  it('renders correctly', (): void => {
    const tree = renderer
      .create(
        <DownloadReleases
          releases={[
            {
              release: 'v15',
              status: 'Pending',
              codename: '',
              initialRelease: '2020-10-20',
              activeLTSStart: '',
              maintenanceLTSStart: '2021-04-01',
              endOfLife: '2021-06-01',
            },
          ]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
