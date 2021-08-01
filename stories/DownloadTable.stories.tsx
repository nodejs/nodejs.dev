import React from 'react';
import { NodeReleaseData } from '../src/types';
import DownloadTable from '../src/components/DownloadReleases/DownloadTable';

import '../src/components/DownloadReleases/DownloadTable.scss';

export default {
  title: 'DownloadTable',
  component: DownloadTable,
};

const nodeReleasesData: NodeReleaseData[] = [
  {
    endOfLife: '2022-04-30',
    maintenanceLTSStart: '2020-11-30',
    activeLTSStart: '2019-10-21',
    codename: 'Erbium',
    initialRelease: '2019-04-23',
    release: 'v12',
    status: 'Maintenance LTS',
  },
  {
    endOfLife: '2023-04-30',
    maintenanceLTSStart: '2021-10-19',
    activeLTSStart: '2020-10-27',
    codename: 'Fermium',
    initialRelease: '2020-04-21',
    release: 'v14',
    status: 'Active LTS',
  },
  {
    endOfLife: '2024-04-30',
    maintenanceLTSStart: '2022-10-18',
    activeLTSStart: '2021-10-26',
    codename: '',
    initialRelease: '2021-04-20',
    release: 'v16',
    status: 'Current',
  },
  {
    endOfLife: '2022-06-01',
    maintenanceLTSStart: '2022-04-01',
    activeLTSStart: '',
    codename: '',
    initialRelease: '2021-10-19',
    release: 'v17',
    status: 'Pending',
  },
  {
    endOfLife: '2025-04-30',
    maintenanceLTSStart: '2023-10-18',
    activeLTSStart: '2022-10-25',
    codename: '',
    initialRelease: '2022-04-19',
    release: 'v18',
    status: 'Pending',
  },
];

const DownloadTableExample = (): JSX.Element => {
  return <DownloadTable nodeReleasesData={nodeReleasesData} />;
};

export const root = (): JSX.Element => <DownloadTableExample />;
