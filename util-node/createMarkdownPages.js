function getYamlPageIdentifier(relativePath) {
  // This attempts to include optional possible language code file extension suffixes
  // eg.: index.en.md, index.md, index.en.mdx, some-blog-post.md, ...
  return relativePath.endsWith('/index.')
    ? relativePath.replace(/\/index(\.[a-z]+)?\.(mdx|md)/, '')
    : relativePath.replace(/(\.[a-z]+)?\.(mdx|md)/, '');
}

function createLearnPages(edges, yamlNavigationData) {
  const navigationData = {};
  const markdownPages = [];

  // Handles the parsing of all Markdown Pages
  edges.forEach(({ node }, index) => {
    const {
      fields: { slug, categoryName },
      parent: { relativePath },
      frontmatter: { title },
      fileAbsolutePath,
    } = node;

    let previousNodeData = null;

    const previousNode = index === 0 ? undefined : edges[index - 1].node;

    if (previousNode && previousNode.fields.categoryName === categoryName) {
      previousNodeData = {
        slug: previousNode.fields.slug,
        title: previousNode.frontmatter.title,
      };
    }

    let nextNodeData = null;

    const nextNode =
      index === edges.length - 1 ? undefined : edges[index + 1].node;

    if (nextNode && nextNode.fields.categoryName === categoryName) {
      nextNodeData = {
        slug: nextNode.fields.slug,
        title: nextNode.frontmatter.title,
      };
    }

    markdownPages.push({
      slug,
      title,
      realPath: fileAbsolutePath || '',
      next: nextNodeData,
      previous: previousNodeData,
      relativePath,
      category: categoryName,
    });
  });

  // We collect all pages that have category set to Learn
  // As we want to build a navigation data for learn
  // Then we get their unique identifiers based on the relativePath
  // To match the ones defined on `src/data/learn.yaml`
  const learnPages = markdownPages
    .filter(page => page.category === 'learn')
    .reduce((acc, page) => {
      const pageId = getYamlPageIdentifier(page.relativePath);

      return { ...acc, [pageId]: page };
    }, {});

  // Handles the Navigation Data only of Learn pages
  yamlNavigationData.forEach(({ section, items }) => {
    navigationData[section] = {
      category: 'learn',
      data: [],
    };

    // This adds the items to the navigation section data based on the order defined within the YAML file
    // If the page doesn't exist it will be set as null and then removed via Array.filter()
    navigationData[section].data = items
      .map(pageId => learnPages[pageId] || null)
      .filter(page => page !== null);
  });

  return { markdownPages, navigationData };
}

module.exports = createLearnPages;
