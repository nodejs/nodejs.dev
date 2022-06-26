function createDocPages(edges) {
  const navigationData = {};
  const docPages = [];

  edges.forEach(({ node }, index) => {
    const {
      fields: { slug },
      frontmatter: { title, section, category: categoryObject },
      parent: { relativePath },
      fileAbsolutePath,
    } = node;

    const categoryName = categoryObject ? categoryObject.name : '';

    let previousNodeData = null;
    const previousNode = index === 0 ? undefined : edges[index - 1].node;
    if (
      previousNode &&
      previousNode.frontmatter.category &&
      previousNode.frontmatter.category.name === categoryName
    ) {
      previousNodeData = {
        slug: previousNode.fields.slug,
        title: previousNode.frontmatter.title,
      };
    }

    let nextNodeData = null;
    const nextNode =
      index === edges.length - 1 ? undefined : edges[index + 1].node;
    if (
      nextNode &&
      nextNode.frontmatter.category &&
      nextNode.frontmatter.category.name === categoryName
    ) {
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
