import React from 'react';
import { graphql } from 'gatsby';
import Article from '../sections/Article';
import Layout from '../layouts/default';
import { ApiComponents, CommonComponents } from '../components';
import { getApiComponents } from '../components/ApiComponents';
import ApiNavigation from '../navigations/api';
import { replaceDataTagFromString } from '../util/replaceDataTag';
import type {
  ApiTemplateData,
  ApiTemplateContext,
  TableOfContentsItem,
} from '../types';
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
    Metadata: getApiComponents({ fullVersion }),
  };

  return (
    <Layout title={`${displayTitle} | Node.js ${version} API`}>
      <main className={styles.apiContainer}>
        <ApiNavigation sections={navigationData} currentSlug={slug}>
          <ApiComponents.VersionSelector
            releases={nodeReleasesData}
            selectedRelease={version}
            apiAvailableVersions={apiAvailableVersions}
            currentPage={title}
          />
        </ApiNavigation>
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
          <CommonComponents.SectionTitle
            path={['home', 'documentation', version, title]}
          />
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
