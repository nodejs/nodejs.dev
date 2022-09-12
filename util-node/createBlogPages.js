const { iterateEdges } = require('./createPageUtils');

function createMarkdownPages(blogEdges) {
  const blogPages = iterateEdges(blogEdges, node => {
    const {
      fields: { readingTime, date },
    } = node;

    return { readingTime, date };
  });

  return { blogPages };
}

module.exports = createMarkdownPages;
