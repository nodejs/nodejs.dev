import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/article';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Navigation from '../components/navigation';
import { LearnPageData } from '../types';
import { findActive } from '../util/findActive';
import Page404 from './404';

type Props = {
  data: LearnPageData;
  location: Location;
};

export default ({ data, location }: Props) => {
  // Get current page related data.
  const currentPage = location.pathname.split('/').pop();
  const { activePage, previousPage, nextPage, navigationSections } = findActive(
    data.sections.group,
    currentPage
  );

  // Rendering 404 page as a component here but maintain the url
  if (!activePage) {
    return <Page404 />;
  }

  // Set the title and desceription for pages only.
  // Leave the home page with default by providing empty values.
  let title = '';
  let description = '';

  // The currentPage has empty string value
  // Since its pathname only has '/' and nothing after that.
  if (currentPage) {
    title = `${activePage.frontmatter.title} by ${
      activePage.frontmatter.author
    }`;
    description = activePage.frontmatter.description;
  }

  return (
    <Layout title={title} description={description}>
      <Hero title={activePage.frontmatter.title} />
      <Navigation sections={navigationSections} />
      <Article page={activePage} previous={previousPage} next={nextPage} />
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
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
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
