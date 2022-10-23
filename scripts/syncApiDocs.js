const getNodeReleasesData = require('../util-node/getNodeReleasesData');
const getCurrentActiveReleases = require('../util-node/getCurrentActiveReleases');
const getApiDocsData = require('../util-node/getApiDocsData');

getNodeReleasesData(nodeReleasesData => {
  const currentActiveReleasesVersions =
    getCurrentActiveReleases(nodeReleasesData);

  const nodeReleases = currentActiveReleasesVersions.reverse();

  getApiDocsData(nodeReleases, () => {
    // eslint-disable-next-line no-console
    console.log('Finished Syncing Pages');
  });
});
