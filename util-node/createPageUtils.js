function createPreviousNextNodeData(edges, index, categoryName) {
  let previousNodeData = null;

  const previousNode = index === 0 ? undefined : edges[index - 1].node;

  if (previousNode && previousNode.fields.categoryName === categoryName) {
    previousNodeData = {
      slug: previousNode.fields.slug,
      title:
        previousNode.frontmatter.displayTitle || previousNode.frontmatter.title,
    };
  }

  let nextNodeData = null;

  const nextNode =
    index === edges.length - 1 ? undefined : edges[index + 1].node;

  if (nextNode && nextNode.fields.categoryName === categoryName) {
    nextNodeData = {
      slug: nextNode.fields.slug,
      title: nextNode.frontmatter.displayTitle || nextNode.frontmatter.title,
    };
  }

  return {
    previousNodeData,
    nextNodeData,
  };
}

function mapToNavigationData(page) {
  return {
    title: page.displayTitle || page.title,
    slug: page.slug,
  };
}

function iterateEdges(edges, extraProperties = () => ({})) {
  function updateMarkdownPage({ node }, index) {
    const {
      fields: { slug, categoryName },
      parent: { relativePath },
      frontmatter: { title, displayTitle },
      fileAbsolutePath,
    } = node;

    const { nextNodeData, previousNodeData } = createPreviousNextNodeData(
      edges,
      index,
      categoryName
    );

    const result = {
      slug,
      title,
      categoryName,
      relativePath,
      next: nextNodeData,
      previous: previousNodeData,
      displayTitle: displayTitle || '',
      realPath: fileAbsolutePath || '',
      id: node.id,
    };

    return { ...result, ...extraProperties(node) };
  }

  return edges.map(updateMarkdownPage);
}

module.exports = {
  createPreviousNextNodeData,
  iterateEdges,
  mapToNavigationData,
};
