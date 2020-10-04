import { graphql } from 'gatsby';
import React from 'react';
// import Article from '../components/Article';
import Layout from '../components/Layout';
// import Navigation from '../containers/Navigation';
// import { LearnPageContext, LearnPageData } from '../types';

import '../styles/article-reader.scss';
import '../styles/learn.scss';
import Footer from '../components/Footer';

interface Props {
  data: any;
  pageContext: any;
}
const DocsLayout = ({ data }: Props): React.ReactNode => (
  <>
    <main className="grid-container">
      <div>test</div>
      <div>{data.doc.edges[0].node.internal.content}</div>
      {console.log('data', data.doc.edges[0].node.internal.content)}
      {/* <Layout title={title} description={description} showFooter={false}>
        <Navigation
          currentSlug={slug}
          label="Secondary"
          sections={navigationData}
        />
        <Article
          title={title}
          html={html}
          tableOfContents={tableOfContents}
          next={next}
          authors={authors}
          previous={previous}
          relativePath={relativePath}
        />
      </Layout> */}
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
          internal {
            content
          }
        }
      }
    }
  }
`;
