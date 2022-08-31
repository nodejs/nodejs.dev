const { iterateEdges } = require('./createPageUtils');

function createApiPages(pagesEdges, apiTypes) {
  const navigationData = {};
  const apiPages = iterateEdges(pagesEdges);

  apiTypes.forEach(({ slug }) => {
    navigationData[slug] = {
      category: 'api',
      data: [],
    };

    // TODO: Create Proper Navigation Data coming from the ApiDocsTransformUtils
    // navigationData[slug].data = apiPages.map(mapToNavigationData);
  });

  return {
    apiPages,
    navigationData,
  };
}

module.exports = createApiPages;
