import React, { ReactElement } from 'react';
import { graphql } from 'gatsby';
import { IoLogoNodejs, IoMdGitPullRequest, IoMdRocket } from 'react-icons/io';

import Hero from '../components/Hero';
import Layout from '../components/Layout';

import '../util/konami';

import '../styles/index.scss';

import { HomepageData, NodeReleaseLTSVersion, BannersIndex } from '../types';

import { ReactComponent as LeafsIllustrationFront } from '../images/illustrations/leafs-front.svg';
import { ReactComponent as LeafsIllustrationMiddle } from '../images/illustrations/leafs-middle.svg';
import { ReactComponent as LeafsIllustrationBack } from '../images/illustrations/leafs-back.svg';
import { ReactComponent as DotsIllustration } from '../images/illustrations/dots.svg';
import InstallTabs from '../components/InstallTabs';
import Banner from '../components/Banner';

interface NodeFeatureProps {
  icon?: ReactElement;
  heading: string;
  description: string;
}

const styled = (icon: ReactElement): ReactElement =>
  React.cloneElement(icon, { alt: 'Node Feature', className: 'feature-icon' });

const features = [
  {
    icon: styled(<IoLogoNodejs />),
    heading: 'JavaScript',
    description:
      'Node.js provides support for the JavaScript programming language',
  },
  {
    icon: styled(<IoMdGitPullRequest />),
    heading: 'Open Source',
    description:
      'Node.js is open source and actively maintained by contributors all over the world',
  },
  {
    icon: styled(<IoMdRocket />),
    heading: 'Everywhere',
    description: 'Node.js has been adapted to work in a wide variety of places',
  },
];

const NodeFeature = ({
  icon,
  heading,
  description,
}: NodeFeatureProps): JSX.Element => {
  return (
    <div className="node-features__feature">
      {icon}
      <h4>{heading}</h4>
      <p>{description}</p>
    </div>
  );
};

const Index = ({
  data: {
    page: {
      frontmatter: { displayTitle, subTitle, description },
    },
    nodeReleases: { nodeReleasesLTSVersion },
    banners: { bannersIndex },
  },
}: HomepageProps): JSX.Element => {
  return (
    <Layout title={displayTitle} description={description}>
      <main className="home-page">
        <Banner bannersIndex={bannersIndex} />
        <Hero
          title={displayTitle}
          subTitle={subTitle}
          nodeReleasesLTSVersion={nodeReleasesLTSVersion}
        />

        <section className="node-demo-container">
          <div className="node-demo">
            <InstallTabs />
          </div>
          <LeafsIllustrationFront className="leafs-front animations" />
          <LeafsIllustrationMiddle className="leafs-middle animations" />
          <LeafsIllustrationBack className="leafs-back animations" />
          <DotsIllustration className="dots" />
        </section>

        <section className="node-features">
          {features.map(feature => (
            <NodeFeature
              key={feature.heading}
              icon={feature.icon}
              heading={feature.heading}
              description={feature.description}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default Index;

export interface HomeNodeReleases {
  nodeReleases: {
    nodeReleasesLTSVersion: NodeReleaseLTSVersion[];
  };
}

export interface HomeBannersIndex {
  banners: {
    bannersIndex: BannersIndex;
  };
}

interface HomepageProps {
  data: HomepageData & HomeNodeReleases & HomeBannersIndex;
}

export const query = graphql`
  query pageQuery {
    page: mdx(fields: { slug: { eq: "homepage" } }) {
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
      }
    }
    nodeReleases {
      nodeReleasesLTSVersion: nodeReleasesDataDetail {
        lts
        version
      }
    }
    banners {
      bannersIndex: index {
        endDate
        link
        text
        html
        startDate
      }
    }
  }
`;
