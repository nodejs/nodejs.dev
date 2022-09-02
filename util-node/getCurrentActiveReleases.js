function getCurrentActiveReleases(nodeReleasesData) {
  const activeReleases = nodeReleasesData.nodeReleasesData.filter(
    release => release.status !== 'Pending'
  );

  const activeReleasesWithVersions = activeReleases.map(
    release =>
      nodeReleasesData.nodeReleasesDataDetail.find(releaseDetail =>
        releaseDetail.version.startsWith(release.release)
      ).version
  );

  return activeReleasesWithVersions;
}

module.exports = getCurrentActiveReleases;
