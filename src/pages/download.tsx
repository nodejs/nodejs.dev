import React, { useState } from 'react';
import { useReleaseHistory } from '../hooks';
import Layout from '../components/layout';
import ReleaseTable from '../components/release-table';
import ReleaseToggle from '../components/release-toggle';
import ReleaseCards from '../components/release-cards';
import ReleaseHeader from '../components/release-header';
import '../styles/download.css';
import '../styles/release-toggle.css';
import { detectOS } from '../util/detectOS';

export default function DownloadPage(): JSX.Element {
  const releaseHistory = useReleaseHistory().slice(0, 50);
  const [typeRelease, setTypeRelease] = useState('LTS');

  const userOS = detectOS();
  const title = 'Download Node.js';
  const description = 'Come get me!';
  const ltsVersion = '12.16.2';
  const npmVersion = '6.14.4';

  const lts = releaseHistory.find((release): boolean => release && release.lts);
  const current = releaseHistory.find(
    (release): boolean => release && !release.lts
  );

  const selectedLine = typeRelease === 'LTS' ? lts : current;

  return (
    <Layout title={title} description={description}>
      <span className="home-page -download">
        <ReleaseHeader ltsVersion={ltsVersion} npmVersion={npmVersion} />
        <p className="download-description">
          Download the Node.js source code, a pre-built installer for your
          platform, or install via package manager.
        </p>
        <ReleaseToggle
          selected={typeRelease}
          handleClick={(selected): void => setTypeRelease(selected)}
        />
        <ReleaseCards line={selectedLine} userOS={userOS} />
        <ReleaseTable releases={releaseHistory} />
      </span>
    </Layout>
  );
}
