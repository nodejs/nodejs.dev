import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NodeReleaseData } from '../../../types';
import styles from './index.module.scss';

interface Props {
  nodeReleasesData: NodeReleaseData[];
}

const DownloadTable = ({ nodeReleasesData }: Props): JSX.Element => (
  <div className={styles.downloadTableContainer}>
    <table>
      <thead>
        <tr>
          <th>
            <FormattedMessage id="components.downloadTable.header.release" />
          </th>
          <th>
            <FormattedMessage id="components.downloadTable.header.status" />
          </th>
          <th>
            <FormattedMessage id="components.downloadTable.header.codename" />
          </th>
          <th>
            <FormattedMessage id="components.downloadTable.header.initialRelease" />
          </th>
          <th>
            <FormattedMessage id="components.downloadTable.header.ltsStarts" />
          </th>
          <th>
            <FormattedMessage id="components.downloadTable.header.maintenanceStart" />
          </th>
          <th>
            <FormattedMessage id="components.downloadTable.header.endOfLife" />
          </th>
        </tr>
      </thead>
      <tbody>
        {nodeReleasesData.map(
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
                  {codename ? (
                    <a href={codenameReleaseLink}>{codename}</a>
                  ) : null}
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
  </div>
);

export default DownloadTable;
