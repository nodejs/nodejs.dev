import React from 'react';

import {
  MainSection,
  SandboxSection,
  FeaturesSection,
  CommunitySection,
  PartnerSection,
  GetStartedSection,
} from '../components';
import Layout from '../templates/Layout';

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
const description = 'Welcome to Node.js!';
const content = {
  sectionMain: {
    title: 'The power of JavaScript minus the browser',
    desc:
      'Tacos raw denim palo santo, squid 90s occupy sustainable leggings locavore before they sold out chambray gastropub synth. Cornhole lomo dreamcatcher celiac enamel pin, yr lyft master cleanse meggings.',
    downloadButton: 'Download Node.js (LTS)',
    subDownloadMessage: 'What’s new',
    downloadCurrent: 'Get Current',
    learnNode: 'Learn Node.js',
  },
  sectionFeatures: {
    featureList: [
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
  sectionCommunity: {
    title1: 'Join',
    title2: 'the community',
    desc:
      'We’ll never share your information and always respect your inbox - quality content only, we promise.',
    subscribe: 'Subscribe',
    eventsLink: 'See events near you',
  },
  sectionPartner: {
    title: 'Trusted by development teams around the world',
    desc: 'Including IBM, LinkedIn, Microsoft, Netflix, and PayPal.',
    partnersLogoList: [logoImg1, logoImg2, logoImg3, logoImg4, logoImg5],
  },
  sectionGetStarted: {
    blocks: [
      {
        title: 'A beginner’s guide',
        desc:
          'Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh.',
        image: getStartedIllustration1,
        link: '/learn',
      },
      {
        title: 'Do even more with Node.js',
        desc:
          'Tacos raw denim palo santo, squid 90 occupy sustainable leggings locavore before they sold out chambray gastropub synth.',
        image: getStartedIllustration2,
        link: '/docs',
      },
    ],
    actionButton: 'Get Started',
  },
};

export default function Index(): JSX.Element {
  return (
    <Layout title={title} description={description} withBg>
      <MainSection content={content.sectionMain} />
      <SandboxSection />
      <FeaturesSection content={content.sectionFeatures} />
      <CommunitySection content={content.sectionCommunity} />
      <PartnerSection content={content.sectionPartner} />
      <GetStartedSection content={content.sectionGetStarted} />
    </Layout>
  );
}
