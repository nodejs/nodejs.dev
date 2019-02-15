exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // If this is the learn page, accept all following paths.
  console.log(page.path);
  if (!!~page.path.indexOf('/learn')) {
    deletePage(page);
    createPage({
      ...page,
      path: '/'
      
    });
    createPage({
      ...page,
      matchPath: "/learn/*",
    });
  }
}