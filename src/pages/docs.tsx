import React, { useState } from 'react';
import { useApiData, useReleaseHistory } from '../hooks';
import { ApiDocsObj, APIResponse, isModuleObj } from '../hooks/useApiDocs';
import Layout from '../components/layout';

function renderArticleOverview(obj: ApiDocsObj, overview: JSX.Element[] = []) {
  const children: JSX.Element[] = [];
  if (obj.events) {
    obj.events.map(evt => renderArticleOverview(evt, children));
  }
  if (obj.methods) {
    obj.methods.map(method => renderArticleOverview(method, children));
  }
  if (obj.properties) {
    obj.properties
      .filter(o => o.type !== 'Object')
      .map(prop => renderArticleOverview(prop, children));

    obj.properties
      .filter(o => o.type === 'Object')
      .map(prop => renderArticleOverview(prop, children));
  }
  if (obj.classes) {
    obj.classes.map(klass => renderArticleOverview(klass, children));
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
      ) : (
        undefined
      )}
    </li>
  );

  return overview;
}

function renderArticle(page: ApiDocsObj | null) {
  if (!page) {
    return <article>No Page Found</article>;
  }

  return (
    <article style={{ width: '100%' }} className="article-reader">
      <h1>{page.displayName || page.name}</h1>
      <ul className="api-key">
        {renderArticleOverview(page)}
        {page.modules &&
          page.modules.map(mod => renderArticleOverview(mod, []))}
      </ul>
      {page.desc && <p dangerouslySetInnerHTML={{ __html: page.desc }} />}
    </article>
  );
}

function sideBarSection(
  title: string,
  section: keyof APIResponse,
  data: APIResponse,
  setPage: Function
) {
  return (
    <li>
      <h2>{title}</h2>
      <ul>
        {data[section].map(module => (
          <li key={module.name}>
            <a href="#" onClick={() => setPage(module)}>
              {module.displayName || module.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default () => {
  const title = 'API Docs';
  const description = 'Come learn yourself something.';
  const [version, setVersion] = useState<string | null>(null);
  const [page, setPage] = useState<ApiDocsObj | null>(null);

  // Magical function filters out all major versions less than 6.
  // TODO: Remove the magical number for the major version. Fet from dynamic releases data to filter out EOL'd versions.
  const releases = useReleaseHistory().filter(
    r => parseInt(r.version.slice(1), 10) >= 6
  );
  const apiData = useApiData(
    version || (releases[0] && releases[0].version) || null
  );

  return (
    <Layout title={title} description={description}>
      <nav>
        <ul>
          <li>
            <select
              onChange={e => {
                setPage(null);
                setVersion(e.target.value);
              }}
            >
              {releases.map(release => (
                <option value={release.version} key={release.version}>
                  {release.version}
                </option>
              ))}
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
  );
};
