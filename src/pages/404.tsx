import { graphql } from 'gatsby';
import React from 'react';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Navigation from '../components/navigation';
import { LearnPageData } from '../types';
import { findActive } from '../util/findActive';

type Props = {
  data: LearnPageData;
};

export default ({ data }: Props) => {
  // Get current page related data.
  const { navigationSections } = findActive(data.sections.group);

  const title = `PAGE NOT FOUND`;
  const description = `You've hit a route that does not exist.`;

  return (
    <Layout title={title} description={description}>
      <Hero title={title} />
      <Navigation sections={navigationSections} />
      <article className="article-reader">
        <h1 className="article-reader__headline">{title}</h1>
        <div>
          <p>
            The page you're trying to access does not exist. Go back to the
            Homepage or find what you're looking for in the menu.
          </p>
          <p>
            Take me back to the <a href="/">Homepage</a> →
          </p>
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  {
    sections: allMarkdownRemark(
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      group(field: frontmatter___section) {
        fieldValue
        edges {
          node {
            id
            fileAbsolutePath
            html
            parent {
              ... on File {
                relativePath
              }
            }
            frontmatter {
              title
              description
              author
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;
