import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/Article';
import Layout from '../components/Layout';
import Navigation from '../containers/Navigation';
import { connectGraphQlCustom } from '../components/connectGraphQlArticle';
import { LearnTemplateContext, LearnTemplateData } from '../types';

interface Props {
  data: LearnTemplateData;
  pageContext: LearnTemplateContext;
  location: Location;
}

const LearnLayout = ({
  data: {
    article: {
      frontmatter: { displayTitle, description },
      body,
      tableOfContents,
      fields: { authors },
    },
  },
  pageContext: { slug, next, previous, relativePath, navigationData },
}: Props): JSX.Element => (
  <Layout title={displayTitle} description={description}>
    <main className="grid-container">
      <Navigation
        currentSlug={slug}
        label="Secondary"
        sections={navigationData}
        category="learn"
      />
      <Article
        title={displayTitle}
        body={body}
        tableOfContents={tableOfContents ? tableOfContents.items : []}
        next={next}
        authors={authors}
        previous={previous}
        relativePath={relativePath}
      />
    </main>
  </Layout>
);

export default connectGraphQlCustom(LearnLayout);

export const query = graphql`
  query ($slug: String!, $locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: {
        slug: { eq: $slug }
        categoryName: { eq: "learn" }
        locale: { eq: $locale }
      }
    ) {
      body
      tableOfContents
      frontmatter {
        displayTitle
        description
      }
      fields {
        slug
        authors
      }
    }
    articleDefaultLanguage: mdx(
      fields: {
        slug: { eq: $slug }
        categoryName: { eq: "learn" }
        locale: { eq: $defaultLocale }
      }
    ) {
      body
      tableOfContents
      frontmatter {
        displayTitle
        description
      }
      fields {
        slug
        authors
      }
    }
  }
`;
