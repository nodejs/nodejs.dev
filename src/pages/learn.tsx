import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import { scrollTo } from '../util/scrollTo';

/**
 * When on the "Learn" page, we need to update the background gradient
 * that runs the side menu's title color change from white to black
 * as it becomes sticky and overlays the hero banner.
 * TODO: This should happen in the component, only when rendered.
 */
let prevOffset = -1;
function magicHeroNumber() {
  if (typeof window === 'undefined') { return; } // Guard for SSR.
  const doc = window.document;
  const offset = Math.min(doc.scrollingElement!.scrollTop, 210);
  if (Math.abs(prevOffset - offset) > 5) {
    prevOffset = offset;
    doc.body.setAttribute('style', `--magic-hero-number: ${365 - offset}px`);
  }
  window.requestAnimationFrame(magicHeroNumber);
}
magicHeroNumber();

interface RemarkPage {
  id: string;
  fileAbsolutePath: string;
  html: string;
  frontmatter: {
    title: string;
    description: string;
    author: string;
  }
}

interface LearnPageData {
  pages: {
    edges: ({ node: RemarkPage })[];
  }
}
type Props = {
  data: LearnPageData;
  location: Location;
}

let prev = 0;
function openNav() {
  const old = prev;
  prev = document.scrollingElement!.scrollTop;
  document.getElementsByClassName('side-nav')[0].classList.toggle('side-nav--open');
  scrollTo(old);
}

export default ({ data, location }: Props) => {
  const pages = [];
  let currentPage = location.pathname.split('/').pop();
  let activePage = { title: '404', html: '404' };
  let foundActive = false;

  // For every page,
  for (const { node: page } of data.pages.edges) {

    // If this page does not have a title, skip.
    if (!page.frontmatter.title) { continue; }

    // Generate a slug for this page
    // TODO: We need a more robust slug creation here.
    const slug = page.frontmatter.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z|-]/g, '');

    // If there is no current page slug discovered from the URL, use the first page's.
    if (!currentPage) { currentPage = slug; }

    // Determine if this is the active page, and mark if we've found the active page yet.
    const isActive = slug === currentPage;
    foundActive = foundActive || isActive;
    if (isActive) { activePage = { html: page.html, title: page.frontmatter.title }; }

    // Construct class name for this side nav item.
    const className = `side-nav__item ${!foundActive ? 'side-nav__item--done' : ''} ${isActive ? 'side-nav__item--active' : ''}`;

    // Add the constructed page JSX to the pages list.
    pages.push(
      <li className={className}>
        <Link to={`/learn/${slug}`}>
          {page.frontmatter.title}
        </Link>
      </li>
    );
  }

  return (
    <Layout>
      <div className="hero">
        <h1>{activePage.title}</h1>
        <div className="diagonal-hero-bg">
          <div className="stars">
              <div className="small"/>
              <div className="medium"/>
              <div className="big"/>
            </div>
        </div>
      </div>
      <nav className="side-nav">
        <button className="side-nav__open" onClick={openNav}>Menu</button>
        {/* TODO: Get side nav sections from frontmatter fields. Need a new one. */}
        {/* TODO: H2s should not be in the ULs, but needed to make sticky titles work. Find a new way. */}
        <ul className="side-nav__list">
          <h2 className="side-nav__title">Quick Start</h2>
          {pages.slice(0, 5)}
        </ul>
        <ul className="side-nav__list">
          <h2 className="side-nav__title">Getting Started</h2>
          {pages.slice(5)}
        </ul>
      </nav>
      <article className="article-reader">
        <h1 className="article-reader__headline">{activePage.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: activePage.html }} />
      </article>
    </Layout>
  );
}

export const query = graphql`{
  pages: allMarkdownRemark {
    edges {
      node {
        id,
        fileAbsolutePath,
        html,
        frontmatter {
          title
          description
          author
        }
      }
    }
  }
}`;
