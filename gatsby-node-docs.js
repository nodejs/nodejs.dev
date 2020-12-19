exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const docsTemplate = require.resolve(`./src/templates/docs.tsx`);

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            excerpt
            fileAbsolutePath
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      // path: node.frontmatter.slug,
      path: 'test',
      component: docsTemplate,
      context: {
        // additional data can be passed via context
        // slug: node.frontmatter.slug,
        excerpt,
      },
    });
  });
};
