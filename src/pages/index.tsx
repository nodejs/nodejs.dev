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
import InstallTabs from '../components/InstallTabs';

import featureImg1 from '../images/feature-img-1.png';
import featureImg2 from '../images/feature-img-2.png';
import featureImg3 from '../images/feature-img-3.png';

const nodeFeatureHeader1 = 'JavaScript';
const nodeFeatureHeader2 = 'Open Source';
const nodeFeatureHeader3 = 'Everywhere';

const nodeFeature1 =
  'Node.js provides support for the JavaScript programming language ';
const nodeFeature2 =
  'Node.js is open source and actively maintained by contributors all over the world ';
const nodeFeature3 =
  'Node.js has been adapted to work in a wide variety of places ';

const NodeFeature = ({
  img,
  featureText,
  featureHeader,
}: Props): JSX.Element => {
  return (
    <div className="node-features__feature">
      <img src={img} alt="node feature" />
      <h4>{featureHeader}</h4>
      <p>{featureText}</p>
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
      <main className="home-page">
        <Hero title={title} subTitle={subTitle} />

        <section className="node-demo-container">
          <div className="node-demo">
            <InstallTabs />
          </div>
          <img className="leafs-front" src={leafsIllustrationFront} alt="" />
          <img className="leafs-middle" src={leafsIllustrationMiddle} alt="" />
          <img className="leafs-back" src={leafsIllustrationBack} alt="" />
          <img className="dots" src={dotsIllustration} alt="" />
        </section>

        <section className="node-features">
          <NodeFeature
            img={featureImg1}
            featureText={nodeFeature1}
            featureHeader={nodeFeatureHeader1}
          />
          <NodeFeature
            img={featureImg2}
            featureText={nodeFeature2}
            featureHeader={nodeFeatureHeader2}
          />
          <NodeFeature
            img={featureImg3}
            featureText={nodeFeature3}
            featureHeader={nodeFeatureHeader3}
          />
        </section>

        <div className="download-lts-container">
          <Link to="/learn" className="circular-container">
            Get Started
          </Link>
        </div>
      </main>
    </Layout>
  );
}

interface Props {
  img: string;
  featureText: string;
  featureHeader: string;
}
