import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../types';
import Layout from '../components/Layout';
import Article from '../components/Article';
import '../styles/article-reader.scss';
import SideNavBar, { SideNavBarKeys } from '../components/SideNavBar';

const AboutPage = ({ data }: Page): JSX.Element => {
  const { title, description } = data.page.frontmatter;
  const { body } = data.page;
  const { authors } = data.page.fields;
  return (
    <Layout title={title} description={description}>
      <main className="grid-container">
        <SideNavBar pageKey={SideNavBarKeys.about} />
        <Article
          title={title}
          body={body}
          authors={authors}
          editPath="content/about/about.md"
        />
      </main>
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  query {
    page: mdx(fields: { slug: { eq: "about" } }) {
      body
      tableOfContents
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
