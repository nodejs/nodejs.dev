const { iterateEdges, mapToNavigationData } = require('./createPageUtils');

function createApiPages(pagesEdges, apiTypes, apiNavigationEntries) {
  const apiPages = iterateEdges(pagesEdges);
  const navigationData = {};

  const { items, version } =
    apiNavigationEntries[apiNavigationEntries.length - 1];

  const defaultNavigationRedirects = items
    .filter(entry => entry.type === 'module')
    .map(({ name }) => ({ from: `${name}/`, to: `${version}/${name}/` }));

  apiNavigationEntries.forEach(entry => {
    navigationData[entry.version] = {};

    apiTypes.forEach(({ slug, name }) => {
      const entries = entry.items
        .filter(i => i.type === name)
        .map(item => ({ ...item, category: 'api' }))
        .map(mapToNavigationData);

      navigationData[entry.version][slug] = {
        category: 'api',
        // There might be small chances of duplication of entries, so we attempt
        // to remove all the possible duplicates from the Navigation
        // And then it sorts by the title of the entry
        data: [...new Map(entries.map(v => [v.slug, v])).values()].sort(
          (a, b) => a.title.localeCompare(b.title)
        ),
      };
    });
  });

  return {
    apiPages,
    navigationData,
    defaultNavigationRedirects,
    latestVersion: version,
  };
}

module.exports = createApiPages;
