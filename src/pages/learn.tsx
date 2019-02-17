import React from 'react';
import { graphql } from 'gatsby';

import { LearnPageData } from '../types';
import Layout from '../components/layout';
import Hero from '../components/hero';
import Article from '../components/article';
import Navigation from '../components/navigation';
import { findActive } from '../util/findActive';
import Page404 from './404'

type Props = {
  data: LearnPageData;
  location: Location;
}

export default class LearnPage extends React.Component<Props> {
  prevOffset: number = -1;
  
  componentDidMount() {
    this.magicHeroNumber();
  }

  /**
   * When on the "Learn" page, we need to update the background gradient
   * that runs the side menu's title color change from white to black
   * as it becomes sticky and overlays the hero banner.
   */
  magicHeroNumber = () => {
    if (typeof window === 'undefined') { return; } // Guard for SSR.
    const doc = window.document;
    const offset = Math.min(doc.scrollingElement!.scrollTop - 62, 210);
    if (Math.abs(this.prevOffset - offset) > 5) {
      this.prevOffset = offset;
      doc.body.setAttribute('style', `--magic-hero-number: ${356 - offset}px`);
    }
    window.requestAnimationFrame(this.magicHeroNumber);
  }

  render() {
    const { data } = this.props;
    const currentPage = location.pathname.split('/').pop();
    const { activePage, previousPage, nextPage, navigationSections } = findActive(data.sections.group, currentPage);
    if (!activePage) {
      // Rendering 404 page as a component here
      // The reason is to show the 404 component but maintaining the url (instead of redirecting to 404)
      return <Page404 />
    }
    return (
      <Layout
        title={`${activePage.frontmatter.title} by ${activePage.frontmatter.author}`}
        description={activePage.frontmatter.description}
      >
        <Hero title={activePage.frontmatter.title} />
        <Navigation activePage={activePage} sections={navigationSections} />
        <Article page={activePage} previous={previousPage} next={nextPage} />
      </Layout>
    );
  }
}

export const query = graphql`{
  sections: allMarkdownRemark(
    sort: {
      fields: [fileAbsolutePath]
      order: ASC
    }
  ) {
    group(field: frontmatter___section) {
      fieldValue
      edges {
        node {
          id
          fileAbsolutePath
          html,
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
}`;
