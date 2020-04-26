/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useApiData, useReleaseHistory } from '../hooks';
import {
  ApiDocsObj,
  APIResponse,
  isMethodObj,
  isEventObj,
  isClassObj,
  isModuleObj,
} from '../hooks/useApiDocs';
import Layout from '../components/layout';

import '../styles/article-reader.scss';
import '../styles/docs.scss';
import Footer from '../components/footer';

function renderArticleOverview(
  obj: ApiDocsObj,
  overview: JSX.Element[] = []
): JSX.Element[] {
  const children: JSX.Element[] = [];
  if (obj.events) {
    obj.events.map((evt): JSX.Element[] =>
      renderArticleOverview(evt, children)
    );
  }
  if (obj.methods) {
    obj.methods.map((method): JSX.Element[] =>
      renderArticleOverview(method, children)
    );
  }
  if (obj.properties) {
    obj.properties
      .filter((o): boolean => o.type !== 'Object')
      .map((prop): JSX.Element[] => renderArticleOverview(prop, children));

    obj.properties
      .filter((o): boolean => o.type === 'Object')
      .map((prop): JSX.Element[] => renderArticleOverview(prop, children));
  }
  if (obj.classes) {
    obj.classes.map((klass): JSX.Element[] =>
      renderArticleOverview(klass, children)
    );
  }

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
  /* eslint-disable-next-line no-restricted-syntax */
  for (const page of pages) {
    const children = [];

    if (depth === 0) {
      sections.push(<hr />);
      children.push(
        <h2 className={`api-docs__title api-docs__title--${page.type}`}>
          {page.displayName || page.name}
        </h2>
      );
    } else if (depth === 1) {
      children.push(
        <h3 className={`api-docs__title api-docs__title--${page.type}`}>
          {page.displayName || page.name}
        </h3>
      );
    } else if (depth === 2) {
      children.push(
        <h4 className={`api-docs__title api-docs__title--${page.type}`}>
          {page.displayName || page.name}
        </h4>
      );
    } else if (depth === 3) {
      children.push(
        <h5 className={`api-docs__title api-docs__title--${page.type}`}>
          {page.displayName || page.name}
        </h5>
      );
    } else if (depth === 4) {
      children.push(
        <h6 className={`api-docs__title api-docs__title--${page.type}`}>
          {page.displayName || page.name}
        </h6>
      );
    }

    if (isModuleObj(page)) {
      children.push(
        <li id={page.name}>
          Module: ({page.type}){' '}
          {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    } else if (isMethodObj(page)) {
      children.push(
        <li id={page.name}>
          Method: ({page.type}){' '}
          {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    } else if (isEventObj(page)) {
      children.push(
        <li id={page.name}>
          Event: ({page.type}){' '}
          {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    } else if (isClassObj(page)) {
      children.push(
        <li id={page.name}>
          Class: ({page.type}){' '}
          {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    } else {
      children.push(
        <li id={page.name}>
          Property: ({page.type}){' '}
          {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    }

    if (page.events) {
      renderArticleSections(page.events, children, depth + 1);
    }
    if (page.methods) {
      renderArticleSections(page.methods, children, depth + 1);
    }
    if (page.properties) {
      renderArticleSections(page.properties, children, depth + 1);
    }
    if (page.classes) {
      renderArticleSections(page.classes, children, depth + 1);
    }
    if (page.modules) {
      renderArticleSections(page.modules, children, depth + 1);
    }

    sections.push(<section className="api-docs__section">{children}</section>);
  }

  return sections;
}

function renderArticle(page: ApiDocsObj | null): JSX.Element {
  if (!page) {
    return <article>No Page Found</article>;
  }

  return (
    <article style={{ width: '100%' }} className="article-reader">
      <h1>{page.displayName || page.name}</h1>
      <ul className="api-key">
        {renderArticleOverview(page)}
        {page.modules &&
          page.modules.map((mod): JSX.Element[] =>
            renderArticleOverview(mod, [])
          )}
      </ul>
      {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
      {renderArticleSections([page])}
    </article>
  );
}

function sideBarSection(
  title: string,
  section: keyof APIResponse,
  data: APIResponse,
  setPage: Function
): JSX.Element {
  return (
    <li className="api-nav__list-item">
      <h2 className="t-body2 api-nav__list-title">
        <i className="material-icons">offline_bolt</i>
        {title}
      </h2>
      <ul className="api-nav__sub-list">
        {(data[section] as ApiDocsObj[]).map(
          (module: ApiDocsObj): JSX.Element => (
            <li key={module.name} className="api-nav__sub-list-item">
              <a
                href={`#temporary_path_for_${module.name}`}
                onClick={(): void => setPage(module)}
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
}

export default function APIDocsPage(): JSX.Element {
  const title = 'API Docs';
  const description = 'Come learn yourself something.';
  const [version, setVersion] = useState<string | null>(null);
  const [page, setPage] = useState<ApiDocsObj | null>(null);

  // Magical function filters out all major versions less than 6.
  // TODO: Remove the magical number for the major version. Fet from dynamic releases data to filter out EOL'd versions.
  const releases = useReleaseHistory().filter(
    (r): boolean => parseInt(r.version.slice(1), 10) >= 6
  );
  const apiData = useApiData(
    version || (releases[0] && releases[0].version) || null
  );

  return (
    <React.Fragment>
      <main>
        <Layout title={title} description={description} showFooter={false}>
          <nav className="api-nav">
            <ul className="api-nav__list">
              <li className="api-nav__list-item">
                <select
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
              {sideBarSection('Globals', 'globals', apiData, setPage)}
              {sideBarSection('Methods', 'methods', apiData, setPage)}
              {sideBarSection('Misc', 'miscs', apiData, setPage)}
              {sideBarSection('Modules', 'modules', apiData, setPage)}
              {sideBarSection('Classes', 'classes', apiData, setPage)}
            </ul>
          </nav>
          {renderArticle(page)}
        </Layout>
      </main>
      <Footer />
    </React.Fragment>
  );
}
