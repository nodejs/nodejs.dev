/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const path = require('path');
const fs = require('node:fs/promises');

const getMetaRedirect = require('./redirect');

async function writeRedirectsFile(redirects, folder, pathPrefix) {
  if (!redirects.length) return;

  for (const redirect of redirects) {
    const { fromPath, toPath } = redirect;

    const FILE_PATH = path.join(
      folder,
      fromPath.replace(pathPrefix, ''),
      'index.html'
    );

    try {
      const data = getMetaRedirect(toPath);
      await fs.writeFile(FILE_PATH, data);
    } catch (_) {
      // nothing to see here....
    }
  }
}

exports.onPostBuild = ({ store }) => {
  const { redirects, program, config } = store.getState();

  let pathPrefix = '';
  if (program.prefixPaths) {
    pathPrefix = config.pathPrefix;
  }

  const folder = path.join(program.directory, 'public');
  return writeRedirectsFile(redirects, folder, pathPrefix);
};
