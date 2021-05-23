import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../types';
import Layout from '../components/Layout';
import Article from '../components/Article';
import Footer from '../components/Footer';
import '../styles/article-reader.scss';
import DownloadTable from '../components/DownloadReleases/DownloadTable';
import { getStaticReleaseData } from '../hooks/useReleaseHistory';

export default function ReleasesPage({ data }: Page): JSX.Element {
  const { title, description } = data.page.frontmatter;
  const { html, tableOfContents } = data.page;
  const { authors } = data.page.fields;
  const releases = getStaticReleaseData();

  return (
    <>
      <Layout title={title} description={description} showFooter={false}>
        <main className="centered-container">
          <Article
            title={title}
            html={html}
            tableOfContents={tableOfContents}
            authors={authors}
            editPath="content/about/releases.md"
          >
            <DownloadTable releases={releases} />
          </Article>
        </main>
      </Layout>
      <Footer />
    </>
  );
}

export const query = graphql`
  query {
    page: markdownRemark(fields: { slug: { eq: "releases" } }) {
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
