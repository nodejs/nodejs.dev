import React from 'react';
import Hero from '../components/hero';
import Layout from '../components/layout';

import './konami.js';

let discoMode: NodeJS.Timeout | null = null;
document.addEventListener('konamiCode', () => {
  if (discoMode) {
    return clearInterval(discoMode);
  }
  discoMode = setInterval(
    () => document.body.classList.toggle('dark-mode'),
    300
  );
});

export default () => {
  const title = 'Home Page';
  const description = 'Welcome to Node.js!';

  return (
    <Layout title={title} description={description}>
      <Hero title={title} />
      <article style={{ width: '100%' }} className="article-reader">
        <p>Welcome to the Home Page!</p>
      </article>
    </Layout>
  );
};
