import React, { ReactElement } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { graphql } from 'gatsby';
import { IoLogoNodejs, IoMdGitPullRequest, IoMdRocket } from 'react-icons/io';

import Layout from '../components/Layout';
import Hero from '../components/Hero';

import '../styles/index.scss';

import { connectGraphQlCustom } from '../components/connectGraphQlArticle';
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
    heading: 'pages.index.features.javascript.title',
    description: 'pages.index.features.javascript.description',
  },
  {
    icon: styled(<IoMdGitPullRequest />),
    heading: 'pages.index.features.openSource.title',
    description: 'pages.index.features.openSource.description',
  },
  {
    icon: styled(<IoMdRocket />),
    heading: 'pages.index.features.everywhere.title',
    description: 'pages.index.features.everywhere.description',
  },
];

const NodeFeature = ({
  icon,
  heading,
  description,
}: NodeFeatureProps): JSX.Element => (
  <div className="node-features__feature">
    {icon}
    <h4>{heading}</h4>
    <p>{description}</p>
  </div>
);

const Index = ({
  data: {
    article: {
      frontmatter: { displayTitle, subTitle, description },
    },
    nodeReleases: { nodeReleasesLTSVersion },
    banners: { bannersIndex },
  },
  intl,
}: HomepageProps & WrappedComponentProps): JSX.Element => (
  <Layout title={displayTitle} description={description} showRandomContributor>
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
            heading={intl.formatMessage({ id: feature.heading })}
            description={intl.formatMessage({ id: feature.description })}
          />
        ))}
      </section>
    </main>
  </Layout>
);

export default connectGraphQlCustom(injectIntl(Index));

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
  query ($locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: { slug: { eq: "homepage" }, locale: { eq: $locale } }
    ) {
      frontmatter {
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
    articleDefaultLanguage: mdx(
      fields: { slug: { eq: "homepage" }, locale: { eq: $defaultLocale } }
    ) {
      frontmatter {
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
