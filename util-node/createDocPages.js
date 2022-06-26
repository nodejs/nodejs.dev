function createDocPages(edges) {
  const navigationData = {};
  const docPages = [];

  edges.forEach(({ node }, index) => {
    const {
      fields: { slug, categoryName },
      frontmatter: { title, section },
      parent: { relativePath },
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

    let data;
    if (!navigationData[section]) {
      data = { title, slug, section, category: categoryName };
      navigationData[section] = { data: [data], category: categoryName };
    } else {
      data = { title, slug, section, category: categoryName };
      navigationData[section] = {
        data: [...navigationData[section].data, data],
        category: navigationData[section].category,
      };
    }

    docPages.push({
      slug,
      realPath: fileAbsolutePath || '',
      next: nextNodeData,
      previous: previousNodeData,
      relativePath,
      category: categoryName,
    });
  });

  return docPages.map(page => ({ ...page, navigationData }));
}

module.exports = createDocPages;
