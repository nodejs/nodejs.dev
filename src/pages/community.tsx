import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../types';
import Layout from '../components/Layout';
import Article from '../components/Article';
import Footer from '../components/Footer';

import '../styles/article-reader.scss';
import '../styles/community.scss';
import AboutPageSideNavBar, {
  AboutPageKeys,
} from '../components/AboutPageSideNavBar';

export default function CommunityPage({ data }: Page): JSX.Element {
  const { title, description } = data.page.frontmatter;
  const { html, tableOfContents } = data.page;
  const { authors } = data.page.fields;

  return (
    <>
      <Layout title={title} description={description} showFooter={false}>
        <main className="grid-container">
          <AboutPageSideNavBar pageKey={AboutPageKeys.community} />
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
