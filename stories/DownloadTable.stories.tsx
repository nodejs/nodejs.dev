import React from 'react';
import { useReleaseData } from '../src/hooks/useReleaseHistory';

import DownloadTable from '../src/components/DownloadReleases/DownloadTable';

import '../src/components/DownloadReleases/DownloadTable.scss';

export default {
  title: 'DownloadTable',
  component: DownloadTable,
};

const DownloadTableExample = (): JSX.Element => {
  const releaseHistory = useReleaseData().releaseData.slice(0, 10);

  return <DownloadTable releases={releaseHistory} />;
};

export const root = (): JSX.Element => <DownloadTableExample />;
