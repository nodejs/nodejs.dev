import React from 'react';
import { Link } from 'gatsby';
import Hero from '../components/hero';
import Layout from '../components/layout';
import '../util/konami';

import '../styles/index.scss';

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
import leafsIllustrationFront from '../images/illustrations/leafs-front.svg';
import leafsIllustrationMiddle from '../images/illustrations/leafs-middle.svg';
import leafsIllustrationBack from '../images/illustrations/leafs-back.svg';
import dotsIllustration from '../images/illustrations/dots.svg';
import Banner from '../components/banner';

const nodeFeature1 =
  'Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh. ';
const nodeFeature2 =
  'Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh. ';
const nodeFeature3 =
  'Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos meh. ';

const NodeFeature = ({ img, featureText }: Props): JSX.Element => {
  return (
    <div className="node-features__feature">
      <img src={img} alt="node feature" />
      <p className="t-caption">{featureText}</p>
    </div>
  );
};

export default function Index(): JSX.Element {
  const title = 'Run JavaScript Everywhere.';
  const subTitle =
    'Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.';
  const description = 'Welcome to Node.js!';

  return (
    <Layout title={title} description={description}>
      <Banner />
      <div className="home-page">
        <Hero title={title} subTitle={subTitle} />

        <section className="node-demo-container">
          <div className="node-demo"></div>
          <img className="leafs-front" src={leafsIllustrationFront} alt="" />
          <img className="leafs-middle" src={leafsIllustrationMiddle} alt="" />
          <img className="leafs-back" src={leafsIllustrationBack} alt="" />
          <img className="dots" src={dotsIllustration} alt="" />
        </section>

        <section className="node-features">
          <NodeFeature img={featureImg} featureText={nodeFeature1} />
          <NodeFeature img={featureImg} featureText={nodeFeature2} />
          <NodeFeature img={featureImg} featureText={nodeFeature3} />
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

        <section className="get-started-callouts">
          <Link to="/learn" className="get-started-callout">
            <img src={GetStartedIllustration1} alt="" />
            <h5 className="t-headline">A beginner’s guide</h5>
            <p>
              Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos
              meh.
            </p>
          </Link>

          <Link to="/docs" className="get-started-callout">
            <img src={GetStartedIllustration2} alt="" />
            <h5 className="t-headline">Do even more with Node</h5>
            <p>
              Lorem ipsum dolor amet pug vape +1 poke pour-over kitsch tacos
              meh.
            </p>
          </Link>
        </section>

        <Link to="/learn" className="btn-primary">
          Get Started
        </Link>
      </div>
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
      <div className="double-background"></div>
    </Layout>
  );
}

interface Props {
  img: string;
  featureText: string;
}
