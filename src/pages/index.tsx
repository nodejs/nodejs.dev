import React from 'react';

import MainSection from '../components/LandingPage/Sections/MainSection/main-section';
import Layout from '../templates/Layout/layout';

// should be reaplaced with GraphQL data
const title = 'Node.js Official website';
const description = 'You have hit a route that does not exist.';
const content = {
  section1_1: 'The power of JavaScript minus the browser',
  section1_2: `Tacos raw denim palo santo, squid 90's occupy sustainable leggings locavore before they sold out chambray gastropub synth. Cornhole lomo dreamcatcher celiac enamel pin, yr lyft master cleanse meggings.`,
};

export default () => {
  return (
    <Layout title={title} description={description}>
      <MainSection content={content} />
      <MainSection content={content} />
      <MainSection content={content} />
    </Layout>
  );
};
