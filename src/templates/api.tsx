import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Layout from '../components/Layout';
import { getApiComponents, Components } from '../components/ApiComponents';
import DataTag from '../components/DataTag';
import Navigation from '../containers/Navigation';
import {
  ApiTemplateData,
  ApiTemplateContext,
  TableOfContentsItem,
} from '../types';
import SectionTitle from '../components/SectionTitle';
import { replaceDataTagFromString } from '../util/replaceDataTag';
import styles from '../styles/templates/api.module.scss';

interface Props {
  data: ApiTemplateData;
  pageContext: ApiTemplateContext;
}

const filterTableOfContentsFromDataTag = (
  item: TableOfContentsItem
): TableOfContentsItem => ({
  title: item.title ? replaceDataTagFromString(item.title) : item.title,
  url: item.url ? replaceDataTagFromString(item.url) : item.url,
  items: item.items ? item.items.map(filterTableOfContentsFromDataTag) : [],
});

const Api = ({
  data: {
    mdx: {
      frontmatter: { title, displayTitle, version },
      body,
      tableOfContents,
    },
  },
  pageContext: {
    slug,
    next,
    previous,
    navigationData,
    nodeReleases: { nodeReleasesData, apiAvailableVersions },
  },
}: Props): JSX.Element => {
  const currentRelease = nodeReleasesData.find(r => r.version === version);
  const fullVersion = currentRelease ? currentRelease.fullVersion : version;

  const filteredTableOfContets =
    tableOfContents.items?.map(filterTableOfContentsFromDataTag) || [];

  const components = {
    DataTag,
    Metadata: getApiComponents({ fullVersion }),
    a: Components.ApiLink,
    h3: Components.H3,
    h4: Components.H4,
    h5: Components.H5,
  };

  return (
    <Layout title={`${displayTitle} | Node.js ${version} API`}>
      <main className={styles.apiContainer}>
        <Navigation
          currentSlug={slug}
          label="Secondary"
          sections={navigationData}
          category="api"
          isApiDocs
        >
          <Components.VersionSelector
            releases={nodeReleasesData}
            selectedRelease={version}
            apiAvailableVersions={apiAvailableVersions}
            currentPage={title}
          />
        </Navigation>
        <Article
          title={displayTitle}
          tableOfContents={filteredTableOfContets}
          body={body}
          next={next}
          previous={previous}
          absolutePath={`https://github.com/nodejs/node/edit/main/doc/api/${title}.md`}
          authors={[]}
          extraComponents={components}
          childrenPosition="before"
        >
          <SectionTitle path={['home', 'documentation', version, title]} />
        </Article>
      </main>
    </Layout>
  );
};

export default Api;

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug }, categoryName: { eq: "api" } }) {
      body
      tableOfContents
      frontmatter {
        title
        displayTitle
        version
      }
      fields {
        slug
      }
    }
  }
`;
