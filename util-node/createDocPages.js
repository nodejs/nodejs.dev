function createDocPages(edges) {
  const navigationData = {};
  const docPages = [];

  edges.forEach(({ node }, index) => {
    const {
      fields: { slug },
      frontmatter: { title, section, category },
      parent: { relativePath },
    } = node;

    let previousNodeData = null;
    const previousNode = index === 0 ? undefined : edges[index - 1].node;
    if (previousNode) {
      previousNodeData = {
        slug: previousNode.fields.slug,
        title: previousNode.frontmatter.title,
      };
    }

    let nextNodeData = null;
    const nextNode =
      index === edges.length - 1 ? undefined : edges[index + 1].node;
    if (nextNode) {
      nextNodeData = {
        slug: nextNode.fields.slug,
        title: nextNode.frontmatter.title,
      };
    }

    let data;
    if (!navigationData[section]) {
      data = { title, slug, section, category };
      navigationData[section] = { data: [data], category };
    } else {
      data = { title, slug, section, category };
      navigationData[section] = {
        data: [...navigationData[section].data, data],
        category: navigationData[section].category,
      };
    }

    docPages.push({
      slug,
      next: nextNodeData,
      previous: previousNodeData,
      relativePath,
      category,
    });
  });

  return docPages.map(page => ({ ...page, navigationData }));
}

module.exports = createDocPages;
