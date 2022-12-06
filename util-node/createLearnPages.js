const { defaultLanguage } = require('../locales');
const { iterateEdges, mapToNavigationData } = require('./createPageUtils');

function getYamlPageIdentifier(relativePath) {
  // Include optional possible language code file extension suffixes
  // eg.: index.en.md, index.md, index.en.mdx, some-blog-post.md, ...
  return relativePath.includes('/index.')
    ? relativePath.replace(/\/index(\.[a-z]+)?\.(mdx|md)/, '')
    : relativePath.replace(/(\.[a-z]+)?\.(mdx|md)/, '');
}

function getIteratedPagesForLocale(
  items,
  localeEdgeMap,
  locale = defaultLanguage
) {
  const getLearnEdgeByPageId = pageId => edge =>
    getYamlPageIdentifier(edge.node.parent.relativePath) === pageId;

  const defaultLocaleEdges = localeEdgeMap.get(locale);
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
  return iteratedPages;
}

function createLearnPages(learnEdges, yamlNavigationData) {
  const learnPages = [];
  const navigationData = {};

  const localeEdgeMap = new Map();

  learnEdges.forEach(edge => {
    const edgeLocale = edge.node.fields.locale;
    if (!localeEdgeMap.has(edgeLocale)) {
      localeEdgeMap.set(edgeLocale, []);
    }
    const localeEdges = localeEdgeMap.get(edgeLocale);
    localeEdgeMap.set(edgeLocale, localeEdges.concat(edge));
  });

  // Handles the Navigation Data only of Learn pages
  yamlNavigationData.forEach(({ section, items }) => {
    const iteratedPages = getIteratedPagesForLocale(
      items,
      localeEdgeMap,
      defaultLanguage
    );

    localeEdgeMap.forEach((_, locale) => {
      if (!navigationData[locale]) {
        navigationData[locale] = {};
      }
      if (!navigationData[locale][section]) {
        navigationData[locale][section] = {};
      }
      const localeIteratedPages = getIteratedPagesForLocale(
        items,
        localeEdgeMap,
        locale
      );
      navigationData[locale][section] =
        localeIteratedPages.map(mapToNavigationData);
    });

    // Then we push them to the resulting learn pages object
    learnPages.push(...iteratedPages);
  });

  return { learnPages, navigationData };
}

module.exports = createLearnPages;
