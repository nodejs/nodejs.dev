import React from 'react';
import { Link, graphql } from 'gatsby';

import Hero from '../components/Hero';
import Layout from '../components/Layout';

import '../util/konami';

import '../styles/index.scss';

import { HomepageData } from '../types';

import leafsIllustrationFront from '../images/illustrations/leafs-front.svg';
import leafsIllustrationMiddle from '../images/illustrations/leafs-middle.svg';
import leafsIllustrationBack from '../images/illustrations/leafs-back.svg';
import dotsIllustration from '../images/illustrations/dots.svg';
import InstallTabs from '../components/InstallTabs';

import featureImg1 from '../images/feature-img-1.png';
import featureImg2 from '../images/feature-img-2.png';
import featureImg3 from '../images/feature-img-3.png';

import expressLogo from '../images/logos/express-logo.png';
import electronLogo from '../images/logos/electron-logo.svg';
import eslintLogo from '../images/logos/eslint-logo.svg';
import webTorrentLogo from '../images/logos/web-torrent-logo.png';
import standardjsLogo from '../images/logos/standard-logo.svg';

import placeholder from '../images/placeholder-img.png';

const NodeFeature = ({
  img,
  featureText,
  featureHeader,
  featureAltText,
}: Props): JSX.Element => {
  return (
    <div className="node-features__feature">
      <img src={img} alt={featureAltText} />
      <h4>{featureHeader}</h4>
      <p>{featureText}</p>
    </div>
  );
};

export default function Index({
  data: {
    page: {
      frontmatter: {
        displayTitle,
        subTitle,
        description,
        learnLinkText,
        nodeFeatureHeader1,
        nodeFeatureHeader2,
        nodeFeatureHeader3,
        nodeFeature1,
        nodeFeature2,
        nodeFeature3,
        nodeFeatureAltText,
        logoSectionText,
      },
    },
  },
}: HomepageProps): JSX.Element {
  return (
    <Layout title={displayTitle} description={description}>
      <main className="home-page">
        <Hero title={displayTitle} subTitle={subTitle} />

        <section className="node-demo-container">
          <div className="node-demo">
            <InstallTabs />
          </div>
          <img
            className="leafs-front animations"
            src={leafsIllustrationFront}
            alt=""
          />
          <img
            className="leafs-middle animations"
            src={leafsIllustrationMiddle}
            alt=""
          />
          <img
            className="leafs-back animations"
            src={leafsIllustrationBack}
            alt=""
          />
          <img className="dots" src={dotsIllustration} alt="" />
        </section>

        <section className="node-features">
          <NodeFeature
            img={featureImg1}
            featureText={nodeFeature1}
            featureHeader={nodeFeatureHeader1}
            featureAltText={nodeFeatureAltText}
          />
          <NodeFeature
            img={featureImg2}
            featureText={nodeFeature2}
            featureHeader={nodeFeatureHeader2}
            featureAltText={nodeFeatureAltText}
          />
          <NodeFeature
            img={featureImg3}
            featureText={nodeFeature3}
            featureHeader={nodeFeatureHeader3}
            featureAltText={nodeFeatureAltText}
          />
        </section>

        <section className="trusted-by">
          <h4 className="t-headline">
            {/* Trusted by development teams around the world */}
            {logoSectionText}
          </h4>
          <div className="logos-container">
            <img src={expressLogo} alt="Express logo" width="20%" />
            <img src={electronLogo} alt="Electron logo" width="20%" />
            <img src={eslintLogo} alt="esLint Logo" />
            <img src={webTorrentLogo} alt="WebTorrent Logo" width="20%" />
            <img
              src={standardjsLogo}
              alt="Standard - JavaScript Style Guide"
              width="20%"
            />
          </div>
        </section>

        <div className="download-lts-container">
          <Link to="/learn" className="circular-container">
            {learnLinkText}
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
  featureAltText: string;
}

interface HomepageProps {
  data: HomepageData;
}

export const query = graphql`
  query pageQuery {
    page: markdownRemark(fields: { slug: { eq: "homepage" } }) {
      frontmatter {
        title
        displayTitle
        subTitle
        description
        learnLinkText
        nodeFeatureHeader1
        nodeFeatureHeader2
        nodeFeatureHeader3
        nodeFeature1
        nodeFeature2
        nodeFeature3
        nodeFeatureAltText
        logoSectionText
      }
    }
  }
`;
