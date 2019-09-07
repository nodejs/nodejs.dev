import React, { useState } from 'react';
import { useApiData, useReleaseHistory } from '../hooks';
import { ApiDocsObj, APIResponse } from '../hooks/useApiDocs';
import Layout from '../components/layout';

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
          {sideBarSection('Modules', 'modules', apiData, setPage)}
        </ul>
      </nav>
      <article style={{ width: '100%' }} className="article-reader">
        {page && page.desc && (
          <p dangerouslySetInnerHTML={{ __html: page.desc }} />
        )}
      </article>
    </Layout>
  );
};
