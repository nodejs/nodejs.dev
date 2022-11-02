import React, { ReactElement } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { graphql } from 'gatsby';
import { IoLogoNodejs, IoMdGitPullRequest, IoMdRocket } from 'react-icons/io';

import DefaultLayout from '../layouts/default';
import { CommonComponents, DownloadComponents } from '../components';

import { connectGraphQlCustom } from '../connectGraphQlArticle';
import { HomepageData, BannersIndex, NodeReleaseData } from '../types';

import { ReactComponent as LeafsIllustrationFront } from '../images/illustrations/leafs-front.svg';
import { ReactComponent as LeafsIllustrationMiddle } from '../images/illustrations/leafs-middle.svg';
import { ReactComponent as LeafsIllustrationBack } from '../images/illustrations/leafs-back.svg';
import { ReactComponent as DotsIllustration } from '../images/illustrations/dots.svg';
import styles from './index.module.scss';

interface NodeFeatureProps {
  icon?: ReactElement;
  heading: string;
  description: string;
}

const styled = (icon: ReactElement): ReactElement =>
  React.cloneElement(icon, {
    alt: 'Node Feature',
    className: styles.featureIcon,
  });

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
  <div className={styles.nodeFeaturesFeature}>
    {icon}
    <h2 className="t-subheading2">{heading}</h2>
    <p>{description}</p>
  </div>
);

const Index = ({
  data: {
    article: {
      frontmatter: { displayTitle, subTitle, description },
    },
    nodeReleases: { nodeReleasesData },
    banners: { bannersIndex },
  },
  intl,
}: HomepageProps & WrappedComponentProps): JSX.Element => (
  <DefaultLayout
    title={displayTitle}
    description={description}
    showRandomContributor
  >
    <main className="home-container">
      <CommonComponents.Banner bannersIndex={bannersIndex} />
      <CommonComponents.Hero
        title={displayTitle}
        subTitle={subTitle}
        nodeReleaseData={nodeReleasesData}
      />

      <section className={styles.nodeDemoContainer}>
        <div className={styles.nodeDemo}>
          <DownloadComponents.InstallTabs />
        </div>
        <LeafsIllustrationFront className={`${styles.leafsFront} animations`} />
        <LeafsIllustrationMiddle className={`${styles.leafsMid} animations`} />
        <LeafsIllustrationBack className={`${styles.leafsBack} animations`} />
        <DotsIllustration className={styles.dots} />
      </section>

      <section className={styles.nodeFeatures}>
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
  </DefaultLayout>
);

export default connectGraphQlCustom(injectIntl(Index));

export interface HomeNodeReleases {
  nodeReleases: {
    nodeReleasesData: NodeReleaseData[];
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
      nodeReleasesData {
        fullVersion
        version
        codename
        isLts
        status
        initialRelease
        ltsStart
        maintenanceStart
        endOfLife
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
