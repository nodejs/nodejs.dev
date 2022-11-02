function getCurrentActiveReleases(nodeReleasesData) {
  return nodeReleasesData.nodeReleasesData.filter(
    release =>
      release.status !== 'Pending' &&
      release.status !== 'End-of-life' &&
      // We don't want to support anything before v16
      // TODO: Remove once v14 reaches EOL
      Number(release.version.replace('v', '')) > 14
  );
}

module.exports = getCurrentActiveReleases;
