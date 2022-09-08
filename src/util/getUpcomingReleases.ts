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
      releaseDate: new Date(release.initialRelease).toDateString(),
      releaseType: ReleaseTypes.current,
    });

    if (release.ltsStart) {
      upcomingRelease.releases.push({
        alreadyReleased: new Date() >= new Date(release.ltsStart),
        releaseDate: new Date(release.ltsStart).toDateString(),
        releaseType: ReleaseTypes.lts,
      });
    }

    if (release.maintenanceStart) {
      upcomingRelease.releases.push({
        alreadyReleased: new Date() >= new Date(release.maintenanceStart),
        releaseDate: new Date(release.maintenanceStart).toDateString(),
        releaseType: ReleaseTypes.maintenance,
      });
    }

    upcomingRelease.releases.push({
      alreadyReleased: new Date() >= new Date(release.endOfLife),
      releaseDate: new Date(release.endOfLife).toDateString(),
      releaseType: ReleaseTypes.endoflife,
    });

    data.push(upcomingRelease);
  });

  return data;
};
