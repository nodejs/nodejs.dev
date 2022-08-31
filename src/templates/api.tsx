import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Layout from '../components/Layout';
import { Metadata, Components } from '../components/ApiComponents';
import DataTag from '../components/DataTag';
import Navigation from '../containers/Navigation';
import { ApiPageData, LearnPageContext } from '../types';
import SectionTitle from '../components/SectionTitle';
import styles from './api.module.scss';

interface Props {
  data: ApiPageData;
  pageContext: LearnPageContext;
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
      frontmatter: { title, displayTitle, editPage, name },
      body,
      tableOfContents,
    },
  },
  pageContext: { slug, next, previous, navigationData },
}: Props): JSX.Element => (
  <Layout title={displayTitle}>
    <main className={styles.apiContainer}>
      <Navigation
        currentSlug={slug}
        label="Secondary"
        sections={navigationData}
        category="api"
        isApiDocs
      />
      <Article
        title={title}
        tableOfContents={tableOfContents}
        body={body}
        next={next}
        previous={previous}
        absolutePath={editPage}
        authors={[]}
        extraComponents={components}
      >
        <SectionTitle pathTree={['home', 'documentation', name]} />
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
        name
        title
        displayTitle
        editPage
      }
      fields {
        slug
      }
    }
  }
`;
