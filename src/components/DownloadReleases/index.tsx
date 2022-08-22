import React from 'react';
import { FormattedMessage } from 'react-intl';
import DownloadTable from './DownloadTable';
import UpcomingReleases from '../UpcomingReleases';
import { NodeReleaseData, UpcomingRelease } from '../../types';
import './DownloadReleases.scss';

interface Props {
  nodeReleasesData: NodeReleaseData[];
  upcomingReleases: UpcomingRelease[];
}

const DownloadReleases = ({
  nodeReleasesData,
  upcomingReleases,
}: Props): JSX.Element => {
  return (
    <div className="download-releases">
      <h2 className="download-releases__title">
        <FormattedMessage id="components.downloadReleases.upcomingReleases.title" />
      </h2>
      <UpcomingReleases upcomingReleases={upcomingReleases} />
      <p className="lts__text">
        <FormattedMessage id="components.downloadReleases.upcomingReleases.content" />
      </p>
      <DownloadTable nodeReleasesData={nodeReleasesData} />
    </div>
  );
};

export default DownloadReleases;
