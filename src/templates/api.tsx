import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Layout from '../components/Layout';
import { getApiComponents, Components } from '../components/ApiComponents';
import DataTag from '../components/DataTag';
import Navigation from '../containers/Navigation';
import { ApiTemplateData, ApiTemplateContext } from '../types';
import SectionTitle from '../components/SectionTitle';
import styles from '../styles/templates/api.module.scss';

interface Props {
  data: ApiTemplateData;
  pageContext: ApiTemplateContext;
}

const getEditPath = (name: string, version: string) =>
  `https://github.com/nodejs/node/blob/${version}/doc/api/${name}.md`;

const Api = ({
  data: {
    mdx: {
      frontmatter: { title, displayTitle, version },
      body,
      tableOfContents,
    },
  },
  pageContext: {
    slug,
    next,
    previous,
    navigationData,
    nodeReleases: { nodeReleasesData, apiAvailableVersions },
  },
}: Props): JSX.Element => {
  const currentRelease = nodeReleasesData.find(r => r.version === version);
  const fullVersion = currentRelease ? currentRelease.fullVersion : version;

  const components = {
    Tag: DataTag,
    a: Components.ApiLink,
    h3: Components.H3,
    h4: Components.H4,
    h5: Components.H5,
    MC: getApiComponents({ fullVersion }),
  };

  return (
    <Layout title={`${displayTitle} | Node.js ${version} API`}>
      <main className={styles.apiContainer}>
        <Navigation
          currentSlug={slug}
          label="Secondary"
          sections={navigationData}
          category="api"
          isApiDocs
        >
          <Components.VersionSelector
            releases={nodeReleasesData}
            selectedRelease={version}
            apiAvailableVersions={apiAvailableVersions}
            currentPage={title}
          />
        </Navigation>
        <Article
          title={displayTitle}
          tableOfContents={tableOfContents}
          body={body}
          next={next}
          previous={previous}
          absolutePath={getEditPath(title, fullVersion)}
          authors={[]}
          extraComponents={components}
          childrenPosition="before"
        >
          <SectionTitle path={['home', 'documentation', version, title]} />
        </Article>
      </main>
    </Layout>
  );
};

export default Api;

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug }, categoryName: { eq: "api" } }) {
      body
      tableOfContents
      frontmatter {
        title
        displayTitle
        version
      }
      fields {
        slug
      }
    }
  }
`;
