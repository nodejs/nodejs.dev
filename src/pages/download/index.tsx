import React, { useEffect, useState } from 'react';
import { detectOS } from '../../util/detectOS';
import { getUpcomingReleases } from '../../util/getUpcomingReleases';
import getNodeReleasesData from '../../../util-node/getNodeReleasesData';
import Layout from '../../components/Layout';
import DownloadHeader from '../../components/DownloadHeader';
import DownloadToggle from '../../components/DownloadToggle';
import DownloadCards from '../../components/DownloadCards';
import DownloadReleases from '../../components/DownloadReleases';
import DownloadAdditional from '../../components/DownloadAdditional';
import { NodeReleaseData, NodeReleaseLTSNPMVersion } from '../../types';
import '../../styles/download.scss';

export interface DownloadNodeReleases {
  nodeReleasesData: NodeReleaseData[];
  nodeReleasesLTSNPMVersion: NodeReleaseLTSNPMVersion[];
}

interface Props {
  location: Location;
}

export default function DownloadPage({ location }: Props): JSX.Element {
  const [releaseData, setReleaseData] = useState<DownloadNodeReleases>();
  const [typeRelease, setTypeRelease] = useState('LTS');

  useEffect((): void => {
    async function fetchData() {
      const {
        nodeReleasesDataDetail: nodeReleasesLTSNPMVersion,
        nodeReleasesData,
      } = await getNodeReleasesData();

      setReleaseData({ nodeReleasesLTSNPMVersion, nodeReleasesData });
    }
    fetchData();
  }, []);

  const userOS = detectOS();
  const lts = releaseData?.nodeReleasesLTSNPMVersion.find(
    (release: NodeReleaseLTSNPMVersion): boolean => !!release.lts
  );
  const current = releaseData?.nodeReleasesLTSNPMVersion.find(
    (release: NodeReleaseLTSNPMVersion): boolean => release && !release.lts
  );

  const selectedType = typeRelease === 'LTS' ? lts : current;
  const handleTypeReleaseToggle = (
    selected: React.SetStateAction<string>
  ): void => setTypeRelease(selected);

  const upcomingReleases = getUpcomingReleases(
    releaseData?.nodeReleasesData || []
  );

  return (
    <Layout
      title="Download Node.js"
      description="Come get me!"
      location={location}
    >
      <span className="home-page -download">
        <DownloadHeader release={selectedType} />
        <p className="release-description">
          Download the Node.js source code, a pre-built installer for your
          platform, or install via package manager.
        </p>
        <DownloadToggle
          selected={typeRelease}
          handleClick={handleTypeReleaseToggle}
        />
        <DownloadCards line={selectedType} userOS={userOS} />
        <DownloadReleases
          nodeReleasesData={releaseData?.nodeReleasesData || []}
          upcomingReleases={upcomingReleases}
        />
        <DownloadAdditional
          line={selectedType}
          selectedTypeRelease={typeRelease}
          handleTypeReleaseToggle={handleTypeReleaseToggle}
        />
      </span>
    </Layout>
  );
}
