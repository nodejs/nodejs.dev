const { iterateEdges, mapToNavigationData } = require('./createPageUtils');

function createApiPages(pagesEdges, apiTypesNavigationData) {
  const navigationData = {};
  const apiPages = iterateEdges(pagesEdges);

  apiTypesNavigationData.forEach(({ name, slug }) => {
    navigationData[slug] = {
      category: 'api',
      data: [],
    };

    const filterByApiType = page => page.apiType === name;

    navigationData[slug].data = apiPages
      .filter(filterByApiType)
      .map(mapToNavigationData);
  });

  return {
    apiPages,
    navigationData,
  };
}

module.exports = createApiPages;
