import React from 'react';
<<<<<<< HEAD

import { NodeReleaseData } from '../../hooks/useReleaseHistory';
import './DownloadTable.scss';

interface Props {
  releases: NodeReleaseData[];
}

const DownloadTable = ({ releases }: Props): JSX.Element => (
  <table className="downloads-table">
    <thead>
      <tr>
        <th>Release</th>
        <th>Status</th>
        <th>Codename</th>
        <th>Initial Release</th>
        <th>Active LTS Start</th>
        <th>Maintainance LTS Start</th>
        <th>End of Life</th>
      </tr>
    </thead>
    <tbody>
      {releases.map(
        ({
          release,
          status,
          codename,
          initialRelease,
          activeLTSStart,
          maintenanceLTSStart,
          endOfLife,
        }: NodeReleaseData): JSX.Element => {
          // Check if release is pending or not
          const isPending = status === 'Pending';
          // Download hyperlink for release
          const releaseDownloadLink = `https://nodejs.org/download/release/latest-${release}.x/`;
          // Download hyperlink for codename
          const codenameReleaseLink = `https://nodejs.org/download/release/latest-${codename.toLowerCase()}/`;

          return (
            <tr key={release}>
              <td>
                {isPending ? (
                  release
                ) : (
                  <a href={releaseDownloadLink}>{release}</a>
                )}
              </td>
              <td>{status || ''}</td>
              <td>
                {codename ? <a href={codenameReleaseLink}>{codename}</a> : null}
              </td>
              <td>{initialRelease}</td>
              <td>{activeLTSStart}</td>
              <td>{maintenanceLTSStart}</td>
              <td>{endOfLife}</td>
            </tr>
          );
        }
      )}
    </tbody>
  </table>
);
=======
import { ReleaseData } from '../../hooks/useReleaseHistory';

interface Props {
  releases: ReleaseData[];
}

const DownloadTable = ({ releases }: Props): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <td>Version</td>
          <td>LTS</td>
          <td>Date</td>
          <td>V8</td>
          <td>NPM</td>
          <td>ABI</td>
          <td>SHASUM</td>
        </tr>
      </thead>
      <tbody>
        {releases.map(
          ({ version, date, npm, v8, lts }: ReleaseData): JSX.Element => {
            const majorVersion = version.substring(1).split('.')[0];

            return (
              <tr key={version}>
                <td>{version}</td>
                <td>{lts || ''}</td>
                <td>{date}</td>
                <td>{v8}</td>
                <td>{npm}</td>
                <td>ABI?</td>
                <td>
                  <a
                    href={`https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V${majorVersion}.md#${version.substring(
                      1
                    )}`}
                  >
                    Changelog
                  </a>
                </td>
                <td>
                  <a href={`https://nodejs.org/download/release/${version}/`}>
                    Download
                  </a>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};
>>>>>>> feat(releases-page): Restore code from #547

export default DownloadTable;
