function getPaginationPath(pagePath, nodeName) {
  return page => {
    const nodePath = nodeName ? `${pagePath}${nodeName}/` : pagePath;

    return page === 1 ? nodePath : `${nodePath}page/${page}/`;
  };
}

module.exports = getPaginationPath;
