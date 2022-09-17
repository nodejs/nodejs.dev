function getCurrentActiveReleases(nodeReleasesData) {
  return nodeReleasesData.nodeReleasesData.filter(
    release => release.status !== 'Pending' && release.status !== 'End-of-life'
  );
}

module.exports = getCurrentActiveReleases;
