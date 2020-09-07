import React, { useState } from 'react';
import { useReleaseHistory } from '../hooks';
import { detectOS } from '../util/detectOS';
import Layout from '../components/Layout';
import DownloadHeader from '../components/DownloadHeader';
import DownloadToggle from '../components/DownloadToggle';
import DownloadCards from '../components/DownloadCards';
import DownloadReleases from '../components/DownloadReleases';
import '../styles/download.scss';

export default function DownloadPage(): JSX.Element {
  const releaseHistory = useReleaseHistory().slice(0, 50);
  const [typeRelease, setTypeRelease] = useState('LTS');

  const userOS = detectOS();
  const lts = releaseHistory.find((release): boolean => release && release.lts);
  const current = releaseHistory.find(
    (release): boolean => release && !release.lts
  );

  const selectedType = typeRelease === 'LTS' ? lts : current;

  return (
    <Layout title="Download Node.js" description="Come get me!">
      <span className="home-page -download">
        <DownloadHeader release={selectedType} />
        <p className="release-description">
          Download the Node.js source code, a pre-built installer for your
          platform, or install via package manager.
        </p>
        <DownloadToggle
          selected={typeRelease}
          handleClick={(selected: React.SetStateAction<string>): void =>
            setTypeRelease(selected)
          }
        />
        <DownloadCards line={selectedType} userOS={userOS} />
        <DownloadReleases releases={releaseHistory} />
      </span>
    </Layout>
  );
}
