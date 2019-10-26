import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { ContentPageData } from '../types';
import AuthorsList from './authors-list';
import EditLink from './edit-link';

const query = graphql`
  query DemoTabsContent {
    content: markdownRemark(
      frontmatter: {
        title: { eq: "Installing via Package Manager" }
        section: { eq: "Content" }
      }
    ) {
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
      parent {
        ... on File {
          relativePath
        }
      }
    }
  }
`;

const DemoTabs = (): JSX.Element => (
  <StaticQuery
    query={query}
    render={({
      content: {
        // frontmatter: { title, description },
        parent: { relativePath } = { relativePath: '' },
        html,
        tableOfContents,
        fields: { authors },
      },
    }: ContentPageData) => (
      <article className="article-reader">
        {/* <h1 className="article-reader__headline">{title}</h1> */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <AuthorsList authors={authors} />
        {relativePath && <EditLink relativePath={relativePath} />}
      </article>
    )}
  ></StaticQuery>
);

export default DemoTabs;
