const { iterateEdges, mapToNavigationData } = require('./createPageUtils');

function createApiPages(pagesEdges, apiTypes) {
  const navigationData = {};
  const apiPages = iterateEdges(pagesEdges);

  apiTypes.forEach(({ name, slug }) => {
    navigationData[slug] = {
      category: 'api',
      data: [],
    };

    // navigationData[slug].data = apiPages.map(mapToNavigationData);
  });

  return {
    apiPages,
    navigationData,
  };
}

module.exports = createApiPages;
