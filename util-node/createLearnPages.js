const { defaultLanguage } = require('../locales');
const { iterateEdges, mapToNavigationData } = require('./createPageUtils');

function getYamlPageIdentifier(relativePath) {
  // Include optional possible language code file extension suffixes
  // eg.: index.en.md, index.md, index.en.mdx, some-blog-post.md, ...
  return relativePath.includes('/index.')
    ? relativePath.replace(/\/index(\.[a-z]+)?\.(mdx|md)/, '')
    : relativePath.replace(/(\.[a-z]+)?\.(mdx|md)/, '');
}

function createLearnPages(learnEdges, yamlNavigationData) {
  const learnPages = [];
  const navigationData = {};
  // TODO: group locale : pagID edges
  const localeEdgeMap = new Map();

  learnEdges.forEach(edge => {
    const edgeLocale = edge.node.fields.locale;
    if(!localeEdgeMap.has(edgeLocale)) {
      localeEdgeMap.set(edgeLocale, []);
    }
    const localeEdges = localeEdgeMap.get(edgeLocale);
    localeEdgeMap.set(edgeLocale, localeEdges.concat(edge));
  });

  const defaultLocaleEdges = localeEdgeMap.get(defaultLanguage)

  const getLearnEdgeByPageId = pageId => edge =>
    getYamlPageIdentifier(edge.node.parent.relativePath) === pageId;

  // Handles the Navigation Data only of Learn pages
  yamlNavigationData.forEach(({ section, items }) => {
    navigationData[section] = [];

    // This adds the items to the navigation section data based on the order defined within the YAML file
    // If the page doesn't exist it will be set as null and then removed via Array.filter()
    const iteratedPages = iterateEdges(
      items
        // Iterates the items of the section and retrieve their respective edges
        // then we transform them into pages and add to the navigation data
        // since learnPages are language independent we will use default edges
        .map(pageId => defaultLocaleEdges.find(getLearnEdgeByPageId(pageId)))
        .filter(edge => edge && edge.node)
    );

    // TODO: locale based navigation data
    navigationData[section] = iteratedPages.map(mapToNavigationData);

    // Then we push them to the resulting learn pages object
    learnPages.push(...iteratedPages);
  });

  return { learnPages, navigationData };
}

module.exports = createLearnPages;
