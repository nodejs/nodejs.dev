import React from 'react';
import { graphql } from 'gatsby';
import { LearnPageData, LearnPageContext } from '../types';
import Layout from '../components/layout';
import Hero from '../components/hero';
import Article from '../components/article';
import Navigation from '../components/navigation';

type Props = {
  data: LearnPageData;
  pageContext: LearnPageContext;
};

export default ({
  data: {
    doc: {
      frontmatter: { title, description },
      html,
      fields: { authors },
    },
  },
  pageContext: { slug, next, previous, relativePath, navigationData },
}: Props) => {
  return (
    <Layout title={title} description={description}>
      <Hero title={title} />
      <Navigation currentSlug={slug} sections={navigationData} />
      <Article
        title={title}
        html={html}
        next={next}
        authors={authors}
        previous={previous}
        relativePath={relativePath}
      />
    </Layout>
  );
};

export const query = graphql`
  query DocBySlug($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        description
      }
      fields {
        slug
        authors
      }
    }
  }
`;
