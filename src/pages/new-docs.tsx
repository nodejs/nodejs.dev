import { graphql } from 'gatsby';
import React from 'react';
import dompurify from 'dompurify';
import Layout from '../components/Layout';

import '../styles/article-reader.scss';
import '../styles/learn.scss';
import Footer from '../components/Footer';

const sanitizer = dompurify.sanitize;
interface Props {
  data: any;
  pageContext: any;
}
const DocsLayout = ({ data }: Props): React.ReactNode => (
  <>
    <main className="grid-container">
      {console.log(typeof data)}
      <p
        dangerouslySetInnerHTML={{
          __html: sanitizer(data.doc.edges[0].node.html),
        }}
      />
    </main>
    <Footer />
  </>
);
export default DocsLayout;

export const query = graphql`
  {
    doc: allMarkdownRemark {
      edges {
        node {
          fileAbsolutePath

          html
        }
      }
    }
    allFile(
      filter: {
        absolutePath: { eq: "node_modules/node-i18n/content/v12.x/en-US/doc/" }
      }
    ) {
      edges {
        node {
          id
          absolutePath
        }
      }
    }
  }
`;
