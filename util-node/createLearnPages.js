const { defaultLanguage } = require('../locales');
const { iterateEdges, mapToNavigationData } = require('./createPageUtils');

function getYamlPageIdentifier(relativePath) {
  // Include optional possible language code file extension suffixes
  // eg.: index.en.md, index.md, index.en.mdx, some-blog-post.md, ...
  return relativePath.includes('/index.')
    ? relativePath.replace(/\/index(\.[a-z]+)?\.(mdx|md)/, '')
    : relativePath.replace(/(\.[a-z]+)?\.(mdx|md)/, '');
}

function getEdgesToLocaleMap(edges) {
  const mapEdgesToLocale = new Map();
  edges.forEach(edge => {
    const { locale } = edge.node.fields;

    if (!mapEdgesToLocale.has(locale)) {
      mapEdgesToLocale.set(locale, []);
    }

    const localeEdges = mapEdgesToLocale.get(locale);
    localeEdges.push(edge);
    mapEdgesToLocale.set(locale, localeEdges);
  });
  return mapEdgesToLocale;
}

const getLearnEdgeByPageId = pageId => edge =>
  getYamlPageIdentifier(edge.node.parent.relativePath) === pageId;

const getIteratedPagesForYaml = (yamlNavigation, edges) => {
  const iteratedPagesForSection = {};
  yamlNavigation.forEach(({ section, items }) => {
    iteratedPagesForSection[section] = [];

    // This adds the items to the navigation section data based on the order defined within the YAML file
    // If the page doesn't exist it will be set as null and then removed via Array.filter()
    const iteratedPages = iterateEdges(
      items
        // Iterates the items of the section and retrieve their respective edges
        // then we transform them into pages and add to the navigation data
        // since learnPages are language independent we will use default edges
        .map(pageId => edges.find(getLearnEdgeByPageId(pageId)))
        .filter(edge => edge && edge.node)
    );

    iteratedPagesForSection[section] = iteratedPages;
  });
  return iteratedPagesForSection;
};

function getNavigationData(yamlNavigation, edges) {
  const navigationData = {};
  const iteratedPageForYaml = getIteratedPagesForYaml(yamlNavigation, edges);
  Object.entries(iteratedPageForYaml).forEach(([section, iteratedPages]) => {
    navigationData[section] = iteratedPages.map(mapToNavigationData);
  });
  return navigationData;
}

function getLearnPages(yamlNavigation, edges) {
  const learnPages = [];
  const iteratedPageForYaml = getIteratedPagesForYaml(yamlNavigation, edges);
  Object.values(iteratedPageForYaml).forEach(iteratedPages => {
    learnPages.push(...iteratedPages);
  });
  return learnPages;
}

function createLearnPages(learnEdges, yamlNavigationData) {
  const mapEdgesToLocale = getEdgesToLocaleMap(learnEdges);
  const learnPages = getLearnPages(
    yamlNavigationData,
    mapEdgesToLocale.get(defaultLanguage)
  );

  const navigationData = {};

  mapEdgesToLocale.forEach((edges, locale) => {
    navigationData[locale] = getNavigationData(yamlNavigationData, edges);
  });

  return { learnPages, navigationData };
}

module.exports = createLearnPages;
