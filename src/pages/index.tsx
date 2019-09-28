import React from 'react';

import MainSection from '../components/LandingPage/Sections/MainSection/main-section';
import SandboxSection from '../components/LandingPage/Sections/SandboxSection/sandbox-section';
import FeaturesSection from '../components/LandingPage/Sections/FeaturesSection/features-section';
import CommunitySection from '../components/LandingPage/Sections/CommunitySection/community-section';
import PartnerSection from '../components/LandingPage/Sections/PartnerSection/partner-section';
import Layout from '../templates/Layout/layout';
import Link from '../components/Link/Link';

import '../styles/index.css';

import featureImg from '../images/placeholder-img.png';

import logoImg1 from '../images/logos/ibm-logo.svg';
import logoImg2 from '../images/logos/linkedin-logo.svg';
import logoImg3 from '../images/logos/microsoft-logo.svg';
import logoImg4 from '../images/logos/netflix-logo.svg';
import logoImg5 from '../images/logos/paypal-logo.svg';

import GetStartedIllustration1 from '../images/illustrations/beginners-guide-illustration.svg';
import GetStartedIllustration2 from '../images/illustrations/do-more-illustration.svg';

import pentagonIllustration1 from '../images/illustrations/pentagon-illustration1.svg';
import pentagonIllustration2 from '../images/illustrations/pentagon-illustration2.svg';

// should be reaplaced with GraphQL data
const title = 'Node.js Official website';
const description = 'You have hit a route that does not exist.';
const content = {
  section1_1: 'The power of JavaScript minus the browser',
  section1_2: `Tacos raw denim palo santo, squid 90's occupy sustainable leggings locavore before they sold out chambray gastropub synth. Cornhole lomo dreamcatcher celiac enamel pin, yr lyft master cleanse meggings.`,
  section3: {
    features: [
      {
        text: 'Feat #1 Cornhole lomo dreamcatcher celiac enamel pin, yr lyft master cleanse meggings.',
        image: featureImg
      },
      {
        text: 'Feat #2 Tacos raw denim palo santo, squid 90 occupy sustainable leggings locavore before they sold out chambray gastropub synth.',
        image: featureImg
      },
      {
        text: 'Feat #3 Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh. ',
        image: featureImg
      },
    ]
  },
  section5_1: 'Trusted by development teams around the world',
  section5_2: 'Including IBM, LinkedIn, Microsoft, Netflix, and PayPal.',
  section5_3: {
    images: [
      logoImg1,
      logoImg2,
      logoImg3,
      logoImg4,
      logoImg5,
    ]
  }
};

export default function Index(): JSX.Element {
  const description = 'Welcome to Node.js!';

  return (
    <Layout title={title} description={description}>
      <MainSection content={content} />
      <SandboxSection />
      <FeaturesSection content={content} />
      <CommunitySection content={content} />
      <PartnerSection content={content} />

      <section className="get-started-callouts">
        <Link to="/learn" className="get-started-callout">
          <img src={GetStartedIllustration1} alt="" />
          <h5 className="t-headline">A beginner’s guide</h5>
          <p>
            Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh.
          </p>
        </Link>

        <Link to="/docs" className="get-started-callout">
          <img src={GetStartedIllustration2} alt="" />
          <h5 className="t-headline">Do even more with Node</h5>
          <p>
            Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh.
          </p>
        </Link>
      </section>

      <Link to="/learn" className="btn-primary">
        Get Started
      </Link>
      <img
        className="pentagon-illustration-big1"
        src={pentagonIllustration1}
        alt=""
      />
      <img
        className="pentagon-illustration-big2"
        src={pentagonIllustration2}
        alt=""
      />
      <div className="double-background" />
    </Layout>
  );
}
