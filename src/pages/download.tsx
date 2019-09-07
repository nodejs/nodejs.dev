import React from 'react';
import { useReleaseHistory } from '../hooks';
import Hero from '../components/hero';
import Layout from '../components/layout';
import ReleaseTable from '../components/release-table';

export default () => {
  const releaseHistory = useReleaseHistory().slice(0, 24);
  const title = 'Download Node.js';
  const description = 'Come get me!';

  return (
    <Layout title={title} description={description}>
      <Hero title={title} />
      <article style={{ width: '100%' }} className="article-reader">
        <p>Welcome to the Downloads Page!</p>
        <ReleaseTable style={{ width: '100%' }} releases={releaseHistory} />
      </article>
    </Layout>
  );
};
