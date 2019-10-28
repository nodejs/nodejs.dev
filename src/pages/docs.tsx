/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useApiData, useReleaseHistory } from '../hooks';
import { ApiDocsObj, APIResponse, isMethodObj, isEventObj, isClassObj, isModuleObj } from '../hooks/useApiDocs';
import Layout from '../components/layout';
import Header from '../components/ArticleHeader';

import '../styles/article-reader.css';
import '../styles/docs.css';
import { ReleaseData } from '../hooks/useReleaseHistory';

function renderArticleOverview(embedded: boolean, obj: ApiDocsObj, overview: JSX.Element[] = [], depth = 0): JSX.Element[] {
  const children: JSX.Element[] = [];
  if (obj.events) {
    obj.events.map((evt): JSX.Element[] => renderArticleOverview(false, evt, children, depth + 1));
  }
  if (obj.methods) {
    obj.methods.map((method): JSX.Element[] => renderArticleOverview(false, method, children, depth + 1));
  }
  if (obj.properties) {
    obj.properties.filter((o): boolean => o.type !== 'Object').map((prop): JSX.Element[] => renderArticleOverview(false, prop, children, depth + 1));

    obj.properties.filter((o): boolean => o.type === 'Object').map((prop): JSX.Element[] => renderArticleOverview(false, prop, children, depth + 1));
  }
  if (obj.classes) {
    obj.classes.map((klass): JSX.Element[] => renderArticleOverview(false, klass, children, depth + 1));
  }

  overview.push(
    <li className={`api-key__item api-key__item--${obj.type} ${children.length ? 'api-key__item--has-children' : ''}`} key={`${obj.name}-${depth}`}>
      {!embedded && (
        <a href={`#${obj.name}`} className="t-body1">
          {obj.displayName || obj.name}
        </a>
      )}
      {children.length ? <ul className="api-key__section">{children}</ul> : undefined}
    </li>
  );

  return overview;
}

function renderSectionOverview(objects: ApiDocsObj[]): JSX.Element[] {
  return renderArticleOverview(true, {
    // @ts-ignore – Hacky, but required. Render models ftw.
    classes: objects,
    type: '',
    stabilityText: '',
    name: '',
    textRaw: '',
  });
}

function renderRelease(release: ReleaseData | undefined, docs: APIResponse): JSX.Element {
  if (!release) {
    return <article></article>;
  }
  return (
    <article>
      <Header>
        <h1>Node.js {release.version}</h1>
        <h2>Released: {release.date}</h2>
        <table className="version-meta">
          <tbody>
            {release.lts && (
              <tr>
                <td>Is LTS</td>
                <td>{release.lts}</td>
              </tr>
            )}
            {release.npm && (
              <tr>
                <td>NPM Version</td>
                <td>{release.npm}</td>
              </tr>
            )}
            {release.openssl && (
              <tr>
                <td>OpenSSL Version</td>
                <td>{release.openssl}</td>
              </tr>
            )}
            {release.uv && (
              <tr>
                <td>LibUV Version</td>
                <td>{release.uv}</td>
              </tr>
            )}
            {release.v8 && (
              <tr>
                <td>V8 Version</td>
                <td>{release.v8}</td>
              </tr>
            )}
            {release.zlib && (
              <tr>
                <td>ZLib Version</td>
                <td>{release.zlib}</td>
              </tr>
            )}
          </tbody>
        </table>
      </Header>
      <section style={{ width: '100%' }} className="article-reader">
        <h2>Globals</h2>
        {renderSectionOverview(docs.globals)}
        <h2>Methods</h2>
        {renderSectionOverview(docs.methods)}
        <h2>Classes</h2>
        {renderSectionOverview(docs.classes)}
        <h2>Modules</h2>
        {renderSectionOverview(docs.modules)}
      </section>
    </article>
  );
}

function renderArticleSections(pages: ApiDocsObj[], sections: JSX.Element[] = [], depth = 0): JSX.Element[] {
  /* eslint-disable-next-line no-restricted-syntax */
  for (const page of pages) {
    const children = [];

    if (depth === 0) {
      sections.push(<hr key={`${page.name}-div}`} />);
      children.push(
        <h2 className={`api-docs__title api-docs__title--${page.type}`} key={`${page.name}-title}`}>
          {page.displayName || page.name}
        </h2>
      );
    } else if (depth === 1) {
      children.push(
        <h3 className={`api-docs__title api-docs__title--${page.type}`} key={`${page.name}-title}`}>
          {page.displayName || page.name}
        </h3>
      );
    } else if (depth === 2) {
      children.push(
        <h4 className={`api-docs__title api-docs__title--${page.type}`} key={`${page.name}-title}`}>
          {page.displayName || page.name}
        </h4>
      );
    } else if (depth === 3) {
      children.push(
        <h5 className={`api-docs__title api-docs__title--${page.type}`} key={`${page.name}-title}`}>
          {page.displayName || page.name}
        </h5>
      );
    } else if (depth === 4) {
      children.push(
        <h6 className={`api-docs__title api-docs__title--${page.type}`} key={`${page.name}-title}`}>
          {page.displayName || page.name}
        </h6>
      );
    }

    if (isModuleObj(page)) {
      children.push(
        <li id={page.name} key={page.name}>
          Module: ({page.type}) {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    } else if (isMethodObj(page)) {
      children.push(
        <li id={page.name} key={page.name}>
          Method: ({page.type}) {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    } else if (isEventObj(page)) {
      children.push(
        <li id={page.name} key={page.name}>
          Event: ({page.type}) {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    } else if (isClassObj(page)) {
      children.push(
        <li id={page.name} key={page.name}>
          Class: ({page.type}) {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
        </li>
      );
    } else {
      children.push(
        <li id={page.name} key={page.name}>
          Property: ({page.type}) {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
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

    sections.push(
      <section className="api-docs__section" key={`${page.name}-section}`}>
        {children}
      </section>
    );
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
        {renderArticleOverview(false, page)}
        {page.modules && page.modules.map((mod): JSX.Element[] => renderArticleOverview(false, mod, []))}
      </ul>
      {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
      {renderArticleSections([page])}
    </article>
  );
}

function sideBarSection(title: string, section: keyof APIResponse, data: APIResponse, setPage: Function): JSX.Element {
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
              <a href={`/docs/${module.name.toLowerCase()}`} onClick={(): void => setPage(module)} className="t-body2 api-nav__sub-list-link">
                {module.displayName || module.name}
              </a>
            </li>
          )
        )}
      </ul>
    </li>
  );
}

export interface ApiDocsProps {
  '*'?: string;
}

export default function APIDocsPage(props: ApiDocsProps): JSX.Element {
  const title = 'API Docs';
  const description = 'Come learn yourself something.';
  const [versionVal, setVersion] = useState<string | null>(null);
  const [pageVal, setPage] = useState<ApiDocsObj | null>(null);

  // Magical function filters out all major versions less than 6.
  // TODO: Remove the magical number for the major version. Fet from dynamic releases data to filter out EOL'd versions.
  const releases = useReleaseHistory()
    .map(
      (r): ReleaseData => {
        /* eslint-disable-next-line no-param-reassign */
        r.version = r.version.replace(/[^0-9.]/g, '');
        return r;
      }
    )
    .filter((r): boolean => parseInt(r.version, 10) >= 6);

  // eslint-disable-next-line react/destructuring-assignment
  let [urlVersion, urlPage] = (props['*'] || '').split('/').map((s: string): string | undefined => s && s.toLowerCase());

  if ((!urlPage && urlVersion && urlVersion !== 'latest') || (urlVersion && urlVersion.match(/\d/))) {
    urlPage = urlVersion;
    urlVersion = undefined;
  }

  const version = versionVal || urlVersion || (releases[0] && releases[0].version) || null;

  const apiData = useApiData(version);

  let page = pageVal;
  if (!page && urlPage && apiData) {
    const objs = [...apiData.classes, ...apiData.globals, ...apiData.methods, ...apiData.miscs, ...apiData.modules];
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of objs) {
      if (obj.name.toLowerCase() === urlPage.toLowerCase()) {
        page = obj;
        break;
      }
    }
  }

  window.history.pushState(null, 'Node.js Docs', `/docs${version ? `/${version}` : ''}${page ? `/${page.name.toLowerCase()}` : ''}${window.location.hash}`);

  const release = releases.find((r): boolean => r.version === version);

  return (
    <main>
      <Layout title={title} description={description}>
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
                  (r): JSX.Element => (
                    <option value={r.version} key={r.version} selected={version === r.version}>
                      {r.version}
                    </option>
                  )
                )}
              </select>
            </li>
            <li className="api-nav__list-item">
              <a href={`/docs/${version}`} className="t-body2 api-nav__sub-list-link">
                Home
              </a>
            </li>
            {sideBarSection('Globals', 'globals', apiData, setPage)}
            {sideBarSection('Methods', 'methods', apiData, setPage)}
            {sideBarSection('Misc', 'miscs', apiData, setPage)}
            {sideBarSection('Modules', 'modules', apiData, setPage)}
            {sideBarSection('Classes', 'classes', apiData, setPage)}
          </ul>
        </nav>
        {page ? renderArticle(page) : renderRelease(release || releases[0], apiData)}
      </Layout>
    </main>
  );
}
