import { graphql } from 'gatsby';
import React, { useEffect, useRef } from 'react';
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
  const prevOffset = useRef(-1);

  const magicHeroNumber = () => {
    if (typeof window === 'undefined') {
      return;
    } // Guard for SSR.
    const doc = window.document;
    const offset = Math.min(doc.scrollingElement!.scrollTop - 62, 210);
    if (Math.abs(prevOffset.current - offset) > 5) {
      prevOffset.current = offset;
      doc.body.setAttribute('style', `--magic-hero-number: ${356 - offset}px`);
    }
    window.requestAnimationFrame(magicHeroNumber);
  };

  useEffect(magicHeroNumber);

  const currentPage = location.pathname.split('/').pop();
  const { activePage, previousPage, nextPage, navigationSections } = findActive(
    data.sections.group,
    currentPage
  );

  if (!activePage) {
    // Rendering 404 page as a component here
    // The reason is to show the 404 component but maintaining the url (instead of redirecting to 404)
    return <Page404 />;
  }

  // Set the title and desceription for pages only.
  // Leave the home page with default by providing empty values.
  let title = '';
  let description = '';

  // The currentPage has empty string value since its pathname only has '/' and nothing after that.
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
