import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import DefaultLayout from '../../layouts/default';
import { DownloadComponents } from '../../components';
import { detectOS } from '../../util/detectOS';
import { getUpcomingReleases } from '../../util/getUpcomingReleases';
import { NodeReleaseData } from '../../types';
import styles from './index.module.scss';

export interface DownloadNodeReleases {
  nodeReleases: {
    nodeReleasesData: NodeReleaseData[];
  };
}

interface Props {
  location: Location;
  data: DownloadNodeReleases;
}

const DownloadPage = ({ data: { nodeReleases } }: Props): JSX.Element => {
  const { nodeReleasesData } = nodeReleases;
  const [typeRelease, setTypeRelease] = useState('LTS');

  const userOS = detectOS();

  const filteredReleases = nodeReleasesData.filter(
    release => release.status !== 'End-of-life'
  );

  const lts = filteredReleases.find(release => release.isLts);
  const current = filteredReleases.find(
    release => release.status === 'Current'
  );

  const selectedType = typeRelease === 'LTS' ? lts : current;

  const handleTypeReleaseToggle = (
    selected: React.SetStateAction<string>
  ): void => setTypeRelease(selected);

  const upcomingReleases = getUpcomingReleases(filteredReleases);

  return (
    <DefaultLayout title="Download Node.js" description="Come get me!">
      <main className={`home-container ${styles.downloadPageContainer}`}>
        <DownloadComponents.DownloadHeader release={selectedType} />
        <p className={styles.releaseDescription}>
          <FormattedMessage id="pages.download.description" />{' '}
          <Link to="/download/package-manager">
            <FormattedMessage id="pages.download.packageManager" />
          </Link>
          .
        </p>
        <DownloadComponents.DownloadToggle
          selected={typeRelease}
          handleClick={handleTypeReleaseToggle}
        />
        <DownloadComponents.DownloadCards line={selectedType} userOS={userOS} />
        <DownloadComponents.DownloadReleases
          nodeReleasesData={filteredReleases}
          upcomingReleases={upcomingReleases}
        />
        <DownloadComponents.DownloadAdditional
          line={selectedType}
          selectedTypeRelease={typeRelease}
          handleTypeReleaseToggle={handleTypeReleaseToggle}
        />
      </main>
    </DefaultLayout>
  );
};

export default DownloadPage;

export const query = graphql`
  query {
    nodeReleases {
      nodeReleasesData {
        fullVersion
        version
        codename
        isLts
        status
        initialRelease
        ltsStart
        maintenanceStart
        endOfLife
      }
    }
  }
`;
