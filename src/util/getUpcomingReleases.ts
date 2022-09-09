import { NodeReleaseData, UpcomingRelease, ReleaseTypes } from '../types';

export const getUpcomingReleases = (
  releaseData: NodeReleaseData[]
): UpcomingRelease[] => {
  const data: UpcomingRelease[] = [];

  releaseData.forEach(release => {
    const upcomingRelease: UpcomingRelease = {
      title: release.version,
      releases: [],
    };

    upcomingRelease.releases.push({
      alreadyReleased: new Date() >= new Date(release.initialRelease),
      releaseDate: release.initialRelease,
      releaseType: ReleaseTypes.current,
    });

    if (release.ltsStart) {
      upcomingRelease.releases.push({
        alreadyReleased: new Date() >= new Date(release.ltsStart),
        releaseDate: release.ltsStart,
        releaseType: ReleaseTypes.lts,
      });
    }

    if (release.maintenanceStart) {
      upcomingRelease.releases.push({
        alreadyReleased: new Date() >= new Date(release.maintenanceStart),
        releaseDate: release.maintenanceStart,
        releaseType: ReleaseTypes.maintenance,
      });
    }

    upcomingRelease.releases.push({
      alreadyReleased: new Date() >= new Date(release.endOfLife),
      releaseDate: release.endOfLife,
      releaseType: ReleaseTypes.endoflife,
    });

    data.push(upcomingRelease);
  });

  return data;
};
