import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/article';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Navigation from '../components/navigation';
import { LearnPageContext, LearnPageData } from '../types';
import TOCDesktop from '../components/toc-desktop';

type Props = {
  data: LearnPageData;
  pageContext: LearnPageContext;
};

export default ({
  data: {
    doc: {
      frontmatter: { title, description },
      html,
      tableOfContents,
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
        tableOfContents={tableOfContents}
        next={next}
        authors={authors}
        previous={previous}
        relativePath={relativePath}
      />
      {tableOfContents && (
        <TOCDesktop
          heading="TABLE OF CONTENTS"
          tableOfContents={tableOfContents}
        />
      )}
    </Layout>
  );
};

export const query = graphql`
  query DocBySlug($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents
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
