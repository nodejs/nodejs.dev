const { iterateEdges } = require('./createPageUtils');

function paginateBlogEdges(array, pageSize) {
  return array.reduce((acc, val, i) => {
    const idx = Math.floor(i / pageSize);
    const page = acc[idx] || (acc[idx] = []);

    page.push(val);

    return acc;
  }, []);
}

function createMarkdownPages(blogEdges) {
  const blogPages = iterateEdges(blogEdges, node => {
    const {
      fields: { readingTime, date },
    } = node;

    return { readingTime, date };
  });

  const blogPosts = blogEdges.map(({ node }) => ({
    node: { frontmatter: node.frontmatter, fields: node.fields },
  }));

  const getBlogPostsByCategory = cat =>
    cat && cat.length
      ? blogPosts.filter(({ node }) => node.fields.categoryName === cat)
      : blogPosts;

  const getPaginatedPosts = category =>
    paginateBlogEdges(getBlogPostsByCategory(category), 6);

  return {
    blogPages,
    blogPosts,
    getPaginatedPosts,
    getBlogPostsByCategory,
  };
}

module.exports = createMarkdownPages;
