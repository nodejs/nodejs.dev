import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../../types';
import Layout from '../../components/Layout';
import Article from '../../components/Article';
import '../../styles/article-reader.scss';
import SideNavBar, { SideNavBarKeys } from '../../components/SideNavBar';

const PackageManagerPage = ({ data }: Page): JSX.Element => {
  const { title, description } = data.page.frontmatter;
  const { body, tableOfContents } = data.page;
  const { authors } = data.page.fields;
  return (
    <Layout title={title} description={description}>
      <main className="grid-container">
        <SideNavBar pageKey={SideNavBarKeys.packageManager} />
        <Article
          title={title}
          body={body}
          tableOfContents={tableOfContents}
          authors={authors}
          editPath="content/download/package-manager.md"
        />
      </main>
    </Layout>
  );
};

export default PackageManagerPage;

export const query = graphql`
  query ($locale: String!) {
    page: mdx(
      fields: {
        slug: { eq: "installing-nodejs-via-package-manager" }
        locale: { eq: $locale }
      }
    ) {
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
