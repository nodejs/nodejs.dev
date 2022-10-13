import React from 'react';
import { FormattedMessage } from 'react-intl';
import DownloadTable from './DownloadTable';
import UpcomingReleases from '../UpcomingReleases';
import { NodeReleaseData, UpcomingRelease } from '../../../types';
import styles from './index.module.scss';

interface Props {
  nodeReleasesData: NodeReleaseData[];
  upcomingReleases: UpcomingRelease[];
}

const DownloadReleases = ({
  nodeReleasesData,
  upcomingReleases,
}: Props): JSX.Element => (
  <div className={styles.downloadReleases}>
    <h2 className={styles.title}>
      <FormattedMessage id="components.downloadReleases.upcomingReleases.title" />
    </h2>
    <UpcomingReleases upcomingReleases={upcomingReleases} />
    <p>
      <FormattedMessage id="components.downloadReleases.upcomingReleases.content" />
    </p>
    <DownloadTable nodeReleasesData={nodeReleasesData} />
  </div>
);

export default DownloadReleases;
