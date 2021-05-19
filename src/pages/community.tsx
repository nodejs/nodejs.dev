// TODO include into coverage before page release
/* istanbul ignore file */
import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { Page, CommunityNavigationSection } from '../types';
import Layout from '../components/Layout';
import Article from '../components/Article';
import Footer from '../components/Footer';
import NavigationItem from '../components/NavigationItem';

import '../styles/article-reader.scss';
import '../styles/community.scss';

const commNavSections: CommunityNavigationSection[] = [
  {
    title: 'Comms',
    sections: ['Forums', 'Mailing Lists', 'Chats'],
  },
  {
    title: 'Jobs',
    sections: [],
  },
  {
    title: 'Conferences',
    sections: ['Future Conferences', 'Past Conferences'],
  },
  {
    title: 'Community',
    sections: ['User Groups', 'Meet-ups'],
  },
  {
    title: 'News',
    sections: ['Official Publications', 'Community Publications', 'Podcasts'],
  },
  {
    title: 'Education',
    sections: ['Community Resources'],
  },
  {
    title: 'Tooling',
    sections: ['3rd Party Libraries'],
  },
  {
    title: 'Collaboration',
    sections: ['Contributing', 'Reporting Issues'],
  },
];

export default function CommunityPage({ data }: Page): JSX.Element {
  const { title, description } = data.page.frontmatter;
  const { html, tableOfContents } = data.page;
  const { authors } = data.page.fields;

  const [navOpen, setNavOpen] = useState<boolean>(false);
  const navElement = useRef<HTMLElement | null>(null);
  const toggle = (): void => setNavOpen(!navOpen);
  const className = navOpen ? 'side-nav side-nav--open' : 'side-nav';

  return (
    <>
      <Layout title={title} description={description} showFooter={false}>
        <main className="grid-container">
          <nav className={className} ref={navElement}>
            <button type="button" className="side-nav__open" onClick={toggle}>
              Menu
            </button>
            <ul className="community-nav__list">
              {commNavSections.map(({ title: commTitle, sections }) => {
                return (
                  <>
                    <NavigationItem
                      key={commTitle}
                      title={commTitle}
                      isLearn={false}
                      isRead={false}
                      isActive={false}
                      slug={commTitle}
                    />
                    <ul className="community-nav__sub-list">
                      {sections.map(section => {
                        return (
                          <li
                            key={section}
                            className="community-nav__sub-list-item"
                          >
                            <a
                              href={`#${section}`}
                              className="t-body2 community-nav__sub-list-link"
                            >
                              {section}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                );
              })}
            </ul>
          </nav>
          <Article
            title={title}
            html={html}
            tableOfContents={tableOfContents}
            authors={authors}
            editPath="content/community/index.md"
          />
        </main>
      </Layout>
      <Footer />
    </>
  );
}

export const query = graphql`
  query {
    page: markdownRemark(fields: { slug: { eq: "nodejs-community" } }) {
      html
      tableOfContents(absolute: false, pathToSlugField: "frontmatter.path")
      frontmatter {
        title
        description
      }
      fields {
        authors
      }
    }
  }
`;
