import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Layout from '../components/Layout';
import { Metadata, Components } from '../components/ApiComponents';
import DataTag from '../components/DataTag';
import Navigation from '../containers/Navigation';
import { ApiPageData, ApiPageContext } from '../types';
import SectionTitle from '../components/SectionTitle';
import styles from './api.module.scss';

interface Props {
  data: ApiPageData;
  pageContext: ApiPageContext;
}

const components = {
  Metadata,
  DataTag,
  a: Components.ApiLink,
  h3: Components.H3,
  h4: Components.H4,
  h5: Components.H5,
};

const Api = ({
  data: {
    api: {
      frontmatter: { title, displayTitle, editPage, version },
      body,
      tableOfContents,
    },
  },
  pageContext: { slug, next, previous, navigationData },
}: Props): JSX.Element => (
  <Layout title={`${displayTitle} | Node.js ${version} API`}>
    <main className={styles.apiContainer}>
      <Navigation
        currentSlug={slug}
        label="Secondary"
        sections={navigationData}
        category="api"
        isApiDocs
      />
      <Article
        title={displayTitle}
        tableOfContents={tableOfContents}
        body={body}
        next={next}
        previous={previous}
        absolutePath={editPage}
        authors={[]}
        extraComponents={components}
      >
        <SectionTitle pathTree={['home', 'documentation', title]} />
      </Article>
    </main>
  </Layout>
);

export default Api;

export const query = graphql`
  query ($slug: String!) {
    api: mdx(fields: { slug: { eq: $slug }, categoryName: { eq: "api" } }) {
      body
      tableOfContents
      frontmatter {
        title
        displayTitle
        editPage
        version
      }
      fields {
        slug
      }
    }
    nodeReleases {
      nodeReleasesVersion: nodeReleasesDataDetail {
        version
      }
    }
  }
`;
