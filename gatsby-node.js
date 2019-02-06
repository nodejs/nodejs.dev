exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // If this is the learn page, accept all following paths.
  if (page.path.match(/^\/learn/)) {
    page.matchPath = "/learn/*";

    // Update the page.
    createPage(page)
  }
}