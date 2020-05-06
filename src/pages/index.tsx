import React from 'react';
import { Link } from 'gatsby';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import '../util/konami';

import '../styles/index.scss';

import leafsIllustrationFront from '../images/illustrations/leafs-front.svg';
import leafsIllustrationMiddle from '../images/illustrations/leafs-middle.svg';
import leafsIllustrationBack from '../images/illustrations/leafs-back.svg';
import dotsIllustration from '../images/illustrations/dots.svg';
import logoImg1 from '../images/logos/ibm-logo.svg';
import logoImg2 from '../images/logos/linkedin-logo.svg';
import logoImg3 from '../images/logos/microsoft-logo.svg';
import logoImg4 from '../images/logos/netflix-logo.svg';
import logoImg5 from '../images/logos/paypal-logo.svg';

export default function Index(): JSX.Element {
  const title = 'Run JavaScript Everywhere.';
  const subTitle =
    'Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.';
  const description = 'Welcome to Node.js!';

  return (
    <Layout title={title} description={description}>
      <div className="home-page">
        <Hero title={title} subTitle={subTitle} />

        <section className="node-demo-container">
          <div className="node-demo" />
          <img className="leafs-front" src={leafsIllustrationFront} alt="" />
          <img className="leafs-middle" src={leafsIllustrationMiddle} alt="" />
          <img className="leafs-back" src={leafsIllustrationBack} alt="" />
          <img className="dots" src={dotsIllustration} alt="" />
        </section>

        <section className="trusted-by">
          <h4 className="t-headline">
            Trusted by development teams around the world
          </h4>
          <p>Including IBM, LinkedIn, Microsoft, Netflix, and PayPal.</p>
          <div className="logos-container">
            <img src={logoImg1} alt="ibm logo" />
            <img src={logoImg2} alt="linkedin logo" />
            <img src={logoImg3} alt="microsoft logo" />
            <img src={logoImg4} alt="netflix logo" />
            <img src={logoImg5} alt="paypal logo" />
          </div>
        </section>

        <Link to="/learn" className="btn-primary">
          Get Started
        </Link>
      </div>
    </Layout>
  );
}
