function getYamlPageIdentifier(relativePath) {
  // Include optional possible language code file extension suffixes
  // eg.: index.en.md, index.md, index.en.mdx, some-blog-post.md, ...
  return relativePath.includes('/index.')
    ? relativePath.replace(/\/index(\.[a-z]+)?\.(mdx|md)/, '')
    : relativePath.replace(/(\.[a-z]+)?\.(mdx|md)/, '');
}

function iterateEdges(edges) {
  function updateMarkdownPage({ node }, index) {
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

    return {
      slug,
      title,
      relativePath,
      next: nextNodeData,
      previous: previousNodeData,
      realPath: fileAbsolutePath || '',
      category: categoryName,
    };
  }

  return edges.map(updateMarkdownPage);
}

function createMarkdownPages(pagesEdges, learnEdges, yamlNavigationData) {
  const learnPages = [];
  const navigationData = {};

  // Iterates the non-Learn edges and transforms them in Pages
  const markdownPages = iterateEdges(pagesEdges);

  const getLearnEdgeByPageId = pageId => edge =>
    getYamlPageIdentifier(edge.node.parent.relativePath) === pageId;

  // Handles the Navigation Data only of Learn pages
  yamlNavigationData.forEach(({ section, items }) => {
    navigationData[section] = {
      category: 'learn',
      data: [],
    };

    // This adds the items to the navigation section data based on the order defined within the YAML file
    // If the page doesn't exist it will be set as null and then removed via Array.filter()
    navigationData[section].data = iterateEdges(
      items
        // Iterates the items of the section and retrieve their respective edges
        // then we transform them into pages and add to the navigation data
        .map(pageId => learnEdges.find(getLearnEdgeByPageId(pageId)))
        .filter(edge => edge && edge.node)
    );

    // Then we push them to the resulting learn pages object
    learnPages.push(...navigationData[section].data);
  });

  return {
    markdownPages,
    learnPages,
    navigationData,
    firstLearnPage: learnPages[0],
  };
}

module.exports = createMarkdownPages;
