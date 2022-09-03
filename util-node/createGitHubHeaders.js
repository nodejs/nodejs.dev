function createGitHubHeaders() {
  const authorizationToken = process.env.GITHUB_TOKEN || '';

  if (authorizationToken) {
    return { headers: { Authorization: `token ${authorizationToken}` } };
  }

  return {};
}

module.exports = createGitHubHeaders;
