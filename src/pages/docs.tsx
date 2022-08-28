// @TODO: Refactor this page to be compiled on gatsby-node instead of using React Hooks
/* istanbul ignore file */
/* eslint-disable react/no-danger, jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby';
import DOMPurify from 'isomorphic-dompurify';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { useApiData } from '../hooks';
import { ApiDocsObj, APIResponse } from '../hooks/useApiDocs';
import { NodeReleaseDataDetail } from '../types';
import Layout from '../components/Layout';

import '../styles/docs.scss';

type NodeReleaseVersion = Pick<NodeReleaseDataDetail, 'version'>;

interface NodeReleases {
  nodeReleases: {
    nodeReleasesVersion: NodeReleaseVersion[];
  };
}

interface Props {
  location: Location;
  data: NodeReleases;
}

const API_DOCS_OBJ_KEYS = ['events', 'methods', 'properties', 'classes'];
const DOCUMENT_ELEMENT_TYPES = ['module', 'event', 'method', 'class'];
const sanitizer = DOMPurify.sanitize;

function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getHeadingForPage(page: ApiDocsObj, depth = 0): JSX.Element {
  const HeaderName = `h${Math.min(depth + 2, 6)}`;
  return React.createElement(
    HeaderName,
    {
      key: `${page.name}-heading`,
      className: `api-docs__title api-docs__title--${page.type}`,
    },
    page.displayName || page.name
  );
}

function getListItemForPage(page: ApiDocsObj): JSX.Element {
  return (
    <li key={`${page.name}-list`} id={page.name}>
      {DOCUMENT_ELEMENT_TYPES.includes(page.type)
        ? capitalizeFirstLetter(page.type)
        : 'Property'}
      : ({page.type})
      {page.desc && (
        <p dangerouslySetInnerHTML={{ __html: sanitizer(page.desc) }} />
      )}
    </li>
  );
}

function renderArticleOverview(
  obj: ApiDocsObj,
  overview: JSX.Element[] = []
): JSX.Element[] {
  const children: JSX.Element[] = [];

  function prepareArticleOverviewForApiDocObjKey(key: string): void {
    if (obj[key]) {
      obj[key]
        .filter(function removeObjectTypeForProperties(property: ApiDocsObj) {
          return key === 'properties' && property.type !== 'Object';
        })
        .map((docObject: ApiDocsObj) =>
          renderArticleOverview(docObject, children)
        );
    }
  }

  API_DOCS_OBJ_KEYS.map(prepareArticleOverviewForApiDocObjKey);

  overview.push(
    <li
      className={`api-key__item api-key__item--${obj.type} ${
        children.length ? 'api-key__item--has-children' : ''
      }`}
      key={obj.name}
    >
      <a href={`#${obj.name}`} className="t-body1">
        {obj.displayName || obj.name}
      </a>
      {children.length ? (
        <ul className="api-key__section">{children}</ul>
      ) : undefined}
    </li>
  );

  return overview;
}

function renderArticleSections(
  pages: ApiDocsObj[],
  sections: JSX.Element[] = [],
  depth = 0
): JSX.Element[] {
  pages.forEach((page, index) => {
    const children: JSX.Element[] = [];

    const prepareArticleSections = () => {
      API_DOCS_OBJ_KEYS.forEach((key: string) => {
        if (page[key]) {
          renderArticleSections(page[key], children, depth + 1);
        }
      });
    };

    if (depth === 0) {
      sections.push(<hr key={`${page.name}-hr`} />);
    }

    children.push(getHeadingForPage(page, depth));

    children.push(getListItemForPage(page));

    prepareArticleSections();

    const keyName = `${page.name}-${page.type}-${index}`;

    sections.push(
      <section key={keyName} className="api-docs__section">
        {children}
      </section>
    );
  });

  return sections;
}

const renderArticle = (page: ApiDocsObj): JSX.Element => (
  <article style={{ width: '100%' }} className="article-reader">
    <h1>{page.displayName || page.name}</h1>
    <ul className="api-key">
      {renderArticleOverview(page)}
      {page.modules &&
        page.modules.map((mod): JSX.Element[] =>
          renderArticleOverview(mod, [])
        )}
    </ul>
    {page.desc && (
      <p dangerouslySetInnerHTML={{ __html: sanitizer(page.desc) }} />
    )}

    {renderArticleSections([page])}
  </article>
);

const sideBarSection = (
  title: string,
  section: keyof APIResponse,
  data: APIResponse
): JSX.Element => (
  <li className="api-nav__list-item">
    <h2 className="t-body2 api-nav__list-title">
      <OfflineBoltIcon />
      {title}
    </h2>
    <ul className="api-nav__sub-list">
      {(data[section] as ApiDocsObj[]).map(
        (module: ApiDocsObj): JSX.Element => (
          <li key={module.name} className="api-nav__sub-list-item">
            <a
              href={`#temporary_path_for_${module.name}`}
              className="t-body2 api-nav__sub-list-link"
            >
              {module.displayName || module.name}
            </a>
          </li>
        )
      )}
    </ul>
  </li>
);

const APIDocsPage = ({
  location,
  data: { nodeReleases },
}: Props): JSX.Element => {
  const title = 'API Docs';
  const description = 'Come learn yourself something.';
  const [version, setVersion] = useState<string | null>(null);
  const [page, setPage] = useState<ApiDocsObj | null>(null);
  const { nodeReleasesVersion } = nodeReleases;

  // Magical function filters out all major versions less than 6.
  // TODO: Remove the magical number for the major version. Fet from dynamic releases data to filter out EOL'd versions.
  const releases = nodeReleasesVersion.filter(
    (r): boolean => parseInt(r.version.slice(1), 10) >= 6
  );

  const currentVersionSelected =
    version || (releases[0] && releases[0].version) || null;

  const apiData = useApiData(currentVersionSelected);

  useEffect(() => {
    // run this every time the page loads. If there is no hash, return page back to default
    if (!location.hash) {
      setPage(null);
    }
  }, [location.hash]);

  useEffect(() => {
    const findModuleByHash = (hash: string): ApiDocsObj | undefined => {
      const hashPrefix = '#temporary_path_for_';
      const moduleName = decodeURI(hash.replace(hashPrefix, ''));
      let matchingModule;

      Object.keys(apiData).forEach(section => {
        const match = apiData[section].find(
          (item: ApiDocsObj) => item.name === moduleName
        );
        if (match !== undefined) {
          matchingModule = match;
        }
      });

      return matchingModule;
    };

    const handleHashChange = (): void => {
      const docsPage = findModuleByHash(location.hash);
      setPage(docsPage || null);
    };

    window.addEventListener('hashchange', handleHashChange, true);

    handleHashChange();

    return (): void => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location.hash, apiData]);

  return (
    <Layout title={title} description={description}>
      <main className="grid-container">
        <nav aria-label="Secondary" className="api-nav">
          <ul className="api-nav__list">
            <li className="api-nav__list-item">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="sr-only" htmlFor="api-nav__version__select-id">
                <FormattedMessage id="pages.docs.apiVersion.select" />
              </label>
              <select
                id="api-nav__version__select-id"
                className="api-nav__version"
                onChange={(e): void => {
                  setPage(null);
                  setVersion(e.target.value);
                }}
              >
                {releases.map(
                  (release): JSX.Element => (
                    <option value={release.version} key={release.version}>
                      {release.version}
                    </option>
                  )
                )}
              </select>
            </li>
            {sideBarSection('Globals', 'globals', apiData)}
            {sideBarSection('Methods', 'methods', apiData)}
            {sideBarSection('Misc', 'miscs', apiData)}
            {sideBarSection('Modules', 'modules', apiData)}
            {sideBarSection('Classes', 'classes', apiData)}
          </ul>
        </nav>
        {page && renderArticle(page)}
      </main>
    </Layout>
  );
};

export default APIDocsPage;

export const query = graphql`
  query {
    nodeReleases {
      nodeReleasesVersion: nodeReleasesDataDetail {
        version
      }
    }
  }
`;
