import React from 'react';
import { useReleaseHistory } from '../hooks';
import Layout from '../components/layout';
import ReleaseTable from '../components/release-table';

export default function DownloadPage(): JSX.Element {
  const releaseHistory = useReleaseHistory().slice(0, 25);
  const title = 'Download Node.js';
  const description = 'Come get me!';

  return (
    <Layout title={title} description={description}>
      <article style={{ width: '100%' }} className="article-reader">
        <p>Welcome to the Downloads Page!</p>
        <ReleaseTable releases={releaseHistory} />
      </article>
    </Layout>
  );
}
