import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Layout from '../components/Layout';

interface Props {
  data: {
    mdx: {
      body: string;
      title: string;
      slug: string;
    };
  };
}

const Api = ({ data: { mdx } }: Props): JSX.Element => (
  <Layout title="Blogs at Nodejs">
    <main className="grid-container">
      <div></div>
      <Article title={mdx.title} body={mdx.body} authors={[]} />
    </main>
  </Layout>
);

export default Api;

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;
