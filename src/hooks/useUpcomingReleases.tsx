import { useEffect, useState } from 'react';
import { useReleaseData } from './useReleaseHistory';

export type ReleaseTypes = 'current' | 'lts' | 'maintenance' | 'endoflife';

export interface UpcomingReleaseData {
  releaseDate: string;
  releaseType: ReleaseTypes;
  alreadyReleased: boolean;
}

export interface UpcomingRelease {
  title: string;
  releases: UpcomingReleaseData[];
}

export const RELEASE_TYPES: { [key in ReleaseTypes]: string } = {
  current: 'Current',
  lts: 'LTS',
  maintenance: 'Maintenance Release',
  endoflife: 'End-of-life Release',
};

export type UpcomingReleasesData = UpcomingRelease[];

export function useUpcomingReleases(): UpcomingReleasesData {
  const releaseData = useReleaseData();
  const [upcomingReleases, setUpcomingReleases] =
    useState<UpcomingReleasesData>([]);
  useEffect((): void => {
    const data: UpcomingReleasesData = [];
    releaseData.forEach(release => {
      const upcomingRelease: UpcomingRelease = {
        title: release.release,
        releases: [],
      };
      upcomingRelease.releases.push({
        alreadyReleased: new Date() >= new Date(release.initialRelease),
        releaseDate: release.initialRelease,
        releaseType: 'current',
      });
      if (release.activeLTSStart)
        upcomingRelease.releases.push({
          alreadyReleased: new Date() >= new Date(release.activeLTSStart),
          releaseDate: release.activeLTSStart,
          releaseType: 'lts',
        });
      if (release.maintenanceLTSStart)
        upcomingRelease.releases.push({
          alreadyReleased: new Date() >= new Date(release.maintenanceLTSStart),
          releaseDate: release.maintenanceLTSStart,
          releaseType: 'maintenance',
        });
      upcomingRelease.releases.push({
        alreadyReleased: new Date() >= new Date(release.endOfLife),
        releaseDate: release.endOfLife,
        releaseType: 'endoflife',
      });
      data.push(upcomingRelease);
    });
    setUpcomingReleases(data);
  }, [releaseData]);

  return upcomingReleases;
}
