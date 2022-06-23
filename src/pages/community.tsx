import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../types';
import Layout from '../components/Layout';
import Article from '../components/Article';
import Footer from '../components/Footer';

import '../styles/article-reader.scss';
import '../styles/community.scss';
import SideNavBar, { SideNavBarKeys } from '../components/SideNavBar';

const CommunityPage = ({ data }: Page): JSX.Element => {
  const { title, description } = data.page.frontmatter;
  const { body, tableOfContents } = data.page;
  const { authors } = data.page.fields;

  return (
    <Layout title={title} description={description}>
      <main className="grid-container">
        <SideNavBar pageKey={SideNavBarKeys.community} />
        <Article
          title={title}
          body={body}
          tableOfContents={tableOfContents}
          authors={authors}
          editPath="content/community/index.md"
        />
      </main>
    </Layout>
  );
};

export default CommunityPage;

export const query = graphql`
  query {
    page: mdx(fields: { slug: { eq: "nodejs-community" } }) {
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
