import React from 'react';

import {
  MainSection,
  SandboxSection,
  FeaturesSection,
  CommunitySection,
  PartnerSection,
  GetStartedSection,
} from '../components';
import Layout from '../templates/Layout/layout';

import featureImg from '../images/placeholder-img.png';

import logoImg1 from '../images/logos/ibm-logo.svg';
import logoImg2 from '../images/logos/linkedin-logo.svg';
import logoImg3 from '../images/logos/microsoft-logo.svg';
import logoImg4 from '../images/logos/netflix-logo.svg';
import logoImg5 from '../images/logos/paypal-logo.svg';

import getStartedIllustration1 from '../images/illustrations/beginners-guide-illustration.svg';
import getStartedIllustration2 from '../images/illustrations/do-more-illustration.svg';

// should be reaplaced with GraphQL data
const title = 'Node.js Official website';
const content = {
  section1_1: 'The power of JavaScript minus the browser',
  section1_2: `Tacos raw denim palo santo, squid 90's occupy sustainable leggings locavore before they sold out chambray gastropub synth. Cornhole lomo dreamcatcher celiac enamel pin, yr lyft master cleanse meggings.`,
  section3: {
    features: [
      {
        text:
          'Feat #1 Cornhole lomo dreamcatcher celiac enamel pin, yr lyft master cleanse meggings.',
        image: featureImg,
      },
      {
        text:
          'Feat #2 Tacos raw denim palo santo, squid 90 occupy sustainable leggings locavore before they sold out chambray gastropub synth.',
        image: featureImg,
      },
      {
        text:
          'Feat #3 Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh. ',
        image: featureImg,
      },
    ],
  },
  section5_1: 'Trusted by development teams around the world',
  section5_2: 'Including IBM, LinkedIn, Microsoft, Netflix, and PayPal.',
  section5_3: {
    images: [logoImg1, logoImg2, logoImg3, logoImg4, logoImg5],
  },
  section6_1_image: getStartedIllustration1,
  section6_1: 'A beginner’s guide',
  section6_2:
    'Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh.',
  section6_3_image: getStartedIllustration2,
  section6_3: 'Do even more with Node',
  section6_4:
    'Tacos raw denim palo santo, squid 90 occupy sustainable leggings locavore before they sold out chambray gastropub synth.',
};

export default function Index(): JSX.Element {
  const description = 'Welcome to Node.js!';

  return (
    <Layout title={title} description={description} withBg>
      <MainSection content={content} />
      <SandboxSection />
      <FeaturesSection content={content} />
      <CommunitySection content={content} />
      <PartnerSection content={content} />
      <GetStartedSection content={content} />
    </Layout>
  );
}
