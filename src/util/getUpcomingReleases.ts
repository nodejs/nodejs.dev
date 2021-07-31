import { NodeReleaseData, UpcomingRelease, ReleaseTypes } from '../types';

export const getUpcomingReleases = (
  releaseData: NodeReleaseData[]
): UpcomingRelease[] => {
  const data: UpcomingRelease[] = [];
  releaseData.forEach(release => {
    const upcomingRelease: UpcomingRelease = {
      title: release.release,
      releases: [],
    };
    upcomingRelease.releases.push({
      alreadyReleased: new Date() >= new Date(release.initialRelease),
      releaseDate: release.initialRelease,
      releaseType: ReleaseTypes.current,
    });
    if (release.activeLTSStart)
      upcomingRelease.releases.push({
        alreadyReleased: new Date() >= new Date(release.activeLTSStart),
        releaseDate: release.activeLTSStart,
        releaseType: ReleaseTypes.lts,
      });
    if (release.maintenanceLTSStart)
      upcomingRelease.releases.push({
        alreadyReleased: new Date() >= new Date(release.maintenanceLTSStart),
        releaseDate: release.maintenanceLTSStart,
        releaseType: ReleaseTypes.maintenance,
      });
    upcomingRelease.releases.push({
      alreadyReleased: new Date() >= new Date(release.endOfLife),
      releaseDate: release.endOfLife,
      releaseType: ReleaseTypes.endoflife,
    });
    data.push(upcomingRelease);
  });
  return data;
};
