import React from 'react';
import UpcomingReleasesItem from '../UpcomingReleasesItem';
import { UpcomingReleaseData } from '../../../../types';
import styles from './index.module.scss';

type Props = {
  releases: UpcomingReleaseData[];
};

const UpcomingReleasesPanel = ({ releases }: Props): JSX.Element => (
  <div className={styles.upcomingReleasesPanel}>
    {releases.map(release => (
      <UpcomingReleasesItem
        key={release.releaseType}
        releaseDate={release.releaseDate}
        releaseType={release.releaseType}
        alreadyReleased={release.alreadyReleased}
      />
    ))}
  </div>
);
export default UpcomingReleasesPanel;
