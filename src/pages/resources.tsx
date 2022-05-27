import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../types';
import Layout from '../components/Layout';
import Article from '../components/Article';
import Footer from '../components/Footer';
import '../styles/article-reader.scss';
import SideNavBar, { SideNavBarKeys } from '../components/SideNavBar';

const ResourcesPage = ({ data }: Page): JSX.Element => {
  const { title, description } = data.page.frontmatter;
  const { body } = data.page;
  const { authors } = data.page.fields;
  return (
    <>
      <Layout title={title} description={description} showFooter={false}>
        <main className="grid-container">
          <SideNavBar pageKey={SideNavBarKeys.resources} />
          <Article
            title={title}
            body={body}
            authors={authors}
            editPath="content/resources/resources.md"
          />
        </main>
      </Layout>
      <Footer />
    </>
  );
};

export default ResourcesPage;

export const query = graphql`
  query {
    page: mdx(fields: { slug: { eq: "resources" } }) {
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
