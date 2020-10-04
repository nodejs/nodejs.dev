import React from 'react';

import { NodeReleaseData } from '../../hooks/useReleaseHistory';

interface Props {
  releases: NodeReleaseData[];
}

const DownloadTable = ({ releases }: Props): JSX.Element => (
  <table>
    <thead>
      <tr>
        <td>Release</td>
        <td>Status</td>
        <td>Codename</td>
        <td>Initial Release</td>
        <td>Active LTS Start</td>
        <td>Maintainance LTS Start</td>
        <td>End of Life</td>
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

export default DownloadTable;
