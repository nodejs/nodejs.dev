function createPreviousNextNodeData(edges, index, categoryName) {
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
    previousNodeData,
    nextNodeData,
  };
}

function mapToNavigationData(page) {
  return {
    title: page.title,
    slug: page.slug,
    category: page.category,
  };
}

function iterateEdges(edges) {
  function updateMarkdownPage({ node }, index) {
    const {
      fields: { slug, categoryName, apiTypeName },
      parent: { relativePath },
      frontmatter: { title },
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
      relativePath,
      next: nextNodeData,
      previous: previousNodeData,
      realPath: fileAbsolutePath || '',
      id: node.id,
    };

    if (apiTypeName) {
      result.apiType = apiTypeName;
    }

    if (categoryName) {
      result.category = categoryName;
    }

    return result;
  }

  return edges.map(updateMarkdownPage);
}

module.exports = {
  createPreviousNextNodeData,
  iterateEdges,
  mapToNavigationData,
};
