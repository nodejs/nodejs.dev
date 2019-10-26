import React, { useState } from 'react';
import { useReleaseHistory } from '../hooks';
import Layout from '../components/layout';
import ReleaseTable from '../components/release-table';
import ReleaseToggle from '../components/release-toggle';
import ReleaseCards from '../components/release-cards';

import { detectOS } from '../util/detectOS';

import '../styles/download.css';

export default function DownloadPage(): JSX.Element {
  const releaseHistory = useReleaseHistory().slice(0, 50);
  const [ltsSelected, setLtsSelected] = useState(true);

  const userOS = detectOS();
  const title = 'Download Node.js';
  const description = 'Come get me!';

  const lts = releaseHistory.find((release): boolean => release && release.lts);
  const current = releaseHistory.find(
    (release): boolean => release && !release.lts
  );

  const selectedLine = ltsSelected ? lts : current;

  return (
    <Layout title={title} description={description}>
      <div className="download-page">
        <div className="download-page-content">
          <h1>Downloads</h1>
          <p>
            Download the Node.js source code, a pre-built installer for your
            platform, or install via package manager.
          </p>
          <ReleaseToggle selected={ltsSelected} onToggle={setLtsSelected} />
          <ReleaseCards line={selectedLine} />
          <ReleaseTable releases={releaseHistory} />
        </div>
      </div>
    </Layout>
  );
}
