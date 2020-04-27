import React from 'react';
import Layout from '../components/layout';

export default function DownloadPage(): JSX.Element {
  const title = 'Download Node.js';
  const description = 'Come get me!';

  return (
    <Layout title={title} description={description}>
      <main>
        <article style={{ width: '100%' }} className="article-reader">
          <h1>Welcome to the Community Page!</h1>
        </article>
      </main>
    </Layout>
  );
}
