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

import featureImg1 from '../images/feature-img-1.svg';
import featureImg2 from '../images/feature-img-2.svg';
import featureImg3 from '../images/feature-img-3.svg';

const features = [
  {
    image: featureImg1,
    heading: 'JavaScript',
    description:
      'Node.js provides support for the JavaScript programming language',
  },
  {
    image: featureImg2,
    heading: 'Open Source',
    description:
      'Node.js is open source and actively maintained by contributors all over the world',
  },
  {
    image: featureImg3,
    heading: 'Everywhere',
    description: 'Node.js has been adapted to work in a wide variety of places',
  },
];

const NodeFeature = ({
  image,
  heading,
  description,
}: NodeFeatureProps): JSX.Element => {
  return (
    <div className="node-features__feature">
      <img src={image} alt="node feature" />
      <h4>{heading}</h4>
      <p>{description}</p>
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
      <div className="home-page">
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
          {features.map(feature => (
            <NodeFeature
              key={feature.heading}
              image={feature.image}
              heading={feature.heading}
              description={feature.description}
            />
          ))}
        </section>

        <div className="download-lts-container">
          <Link to="/learn" className="circular-container">
            Get Started
          </Link>
        </div>
      </div>
    </Layout>
  );
}

interface NodeFeatureProps {
  image: string;
  heading: string;
  description: string;
}
