const getNodeReleasesData = require('../util-node/getNodeReleasesData');
const getCurrentActiveReleases = require('../util-node/getCurrentActiveReleases');
const getApiDocsData = require('../util-node/getApiDocsData');

getNodeReleasesData(nodeReleasesData => {
  const currentActiveReleasesVersions =
    getCurrentActiveReleases(nodeReleasesData);

  // For now we're only going to parse the latest Node.js docs
  // As the v14 and v16 docs have some Markdown Errors
  const [latestNodeRelease] = currentActiveReleasesVersions.reverse();

  getApiDocsData([latestNodeRelease], () => {
    // eslint-disable-next-line no-console
    console.log('Finished Syncing Pages');
  });
});
