import React from 'react';
import { render } from '@testing-library/react';
import DownloadTable from '..';

describe('DownloadTable component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <DownloadTable
        nodeReleasesData={[
          {
            release: 'v15',
            version: '15',
            status: 'Pending',
            codename: '',
            isLts: false,
            initialRelease: '2020-10-20',
            ltsStart: null,
            maintenanceStart: '2021-04-01',
            endOfLife: '2021-06-01',
          },
        ]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
