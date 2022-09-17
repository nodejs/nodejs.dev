import React, { ChangeEvent } from 'react';

import { NodeReleaseData } from '../../../../types';
import { apiPath } from '../../../../../pathPrefixes';
import { useLocalizedPath } from '../../../../hooks/useLocalizedPath';
import styles from './index.module.scss';

interface Props {
  releases: NodeReleaseData[];
  selectedRelease: string;
  apiAvailableVersions: string[];
  currentPage: string;
}

const VersionSelector = ({
  releases,
  selectedRelease,
  apiAvailableVersions,
  currentPage,
}: Props) => {
  const localizedPath = useLocalizedPath();

  const redirectToRelease = (event: ChangeEvent<HTMLSelectElement>) => {
    const version = event.target.value;

    const redirectUrl = apiAvailableVersions.includes(version)
      ? localizedPath(`${apiPath}${version}/${currentPage}`)
      : `https://nodejs.org/docs/latest-${version}.x/api/index.html`;

    window.location.href = redirectUrl;
  };

  return (
    <label htmlFor="versionSelector" className={styles.versionSelector}>
      <span>Version</span>
      <select
        id="versionSelector"
        onChange={redirectToRelease}
        value={selectedRelease}
      >
        {releases
          .filter(release => release.status !== 'Pending')
          .map(release => (
            <option key={release.version} value={release.version}>
              {release.fullVersion}
            </option>
          ))}
      </select>
    </label>
  );
};

export default VersionSelector;
