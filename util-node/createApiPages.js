const fs = require('fs');
const path = require('path');

const safeJSON = require('./safeJSON');
const { iterateEdges, mapToNavigationData } = require('./createPageUtils');
const { apiPath } = require('../pathPrefixes');

function createApiPages(apiEdges, apiTypes, nodeReleases) {
  const navigationData = {};

  const apiPages = iterateEdges(apiEdges, node => ({
    version: node.frontmatter.version,
  }));

  const apiDocsPath = path.resolve(__dirname, `../content${apiPath}`);

  const majorNodeReleases = [
    // Gets all the major releae versions as Array [v18, v16, ...]
    ...new Set(nodeReleases.map(({ version }) => version)),
  ];

  const navigationEntries = [];

  majorNodeReleases.forEach(version => {
    const navigationFilePath = `${apiDocsPath}/${version}/navigation.json`;

    if (fs.existsSync(navigationFilePath)) {
      // Fetches the respective NavigationData for each major release
      // If there's no file we ignore then, as we don't necessarily have all these versions indexed and parsed
      // Check the `sync-api` script on package.json
      const navigationFile = fs.readFileSync(navigationFilePath, {
        encoding: 'utf8',
      });

      navigationEntries.push(safeJSON.parse(navigationFile));
    }
  });

  navigationEntries.forEach(entry => {
    navigationData[entry.version] = {};

    apiTypes.forEach(({ slug, name }) => {
      const entries = entry.items
        .filter(i => i.type === name)
        .map(item => ({ ...item, category: 'api' }))
        .map(mapToNavigationData);

      // There might be small chances of duplication of entries, so we attempt
      // to remove all the possible duplicates from the Navigation
      // And then it sorts by the title of the entry
      navigationData[entry.version][slug] = [
        ...new Map(entries.map(v => [v.slug, v])).values(),
      ].sort((a, b) => a.title.localeCompare(b.title));
    });
  });

  // Get the Paths for the Latest API version
  const { items, version } = navigationEntries[0];

  const defaultNavigationRedirects = items
    .filter(entry => entry.type === 'module')
    .map(({ name }) => ({ from: `${name}/`, to: `${version}/${name}/` }));

  return {
    apiPages,
    navigationData,
    defaultNavigationRedirects,
    latestVersion: version,
  };
}

module.exports = createApiPages;
