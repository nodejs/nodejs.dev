const fetch = require('node-fetch');
const { createFileNodeFromBuffer } = require('gatsby-source-filesystem');

const createGitHubHeaders = require('./createGitHubHeaders');
const { createMarkdownParser } = require('./apiDocsTransformUtils');
const { apiPath } = require('../pathPrefixes');

const ignoredFiles = ['index.md', 'README.md'];

const getFileName = file => file.name.replace('.md', '');

const filterOutInvalidFiles = file =>
  !ignoredFiles.includes(file.name) && file.name.endsWith('.md');

async function getApiDocsData(releaseVersions, gatsbyApis) {
  // Retrieves all the Lists of the Documentation files for that Node.js version
  const requestPromises = releaseVersions.map(releaseVersion => {
    const endpointUrl = `https://api.github.com/repos/nodejs/node/contents/doc/api?ref=${releaseVersion}`;

    return fetch(endpointUrl, createGitHubHeaders()).then(r => r.json());
  });

  // Execute the Requests and fetches data from GitHub
  const apiDocsReleases = await Promise.all(requestPromises);

  const navigationEntries = [];

  // Iterates on each file, and gets only the Markdown files
  // Then we return a Promise with the createRemoteFileNode
  // And thgen `gatsby-node` will execute them all
  await Promise.all(
    apiDocsReleases.map(async (apiDocsFiles, index) => {
      const markdownFiles = apiDocsFiles.filter(filterOutInvalidFiles);
      const fullReleaseVersion = releaseVersions[index];
      const releaseVersion = fullReleaseVersion.split('.')[0];

      const navigationEntry = {
        version: releaseVersion,
        items: [],
      };

      const entries = await Promise.all(
        markdownFiles.map(async file => {
          const markdownFile = await fetch(file.download_url).then(r =>
            r.text()
          );

          const { parseMarkdown, getNavigationEntries } = createMarkdownParser(
            markdownFile,
            {
              name: getFileName(file),
              version: releaseVersion,
              fullVersion: fullReleaseVersion,
              downloadUrl: file.download_url,
            }
          );

          const resultingContent = parseMarkdown();

          navigationEntry.items.push(...getNavigationEntries());

          return createFileNodeFromBuffer({
            buffer: Buffer.from(resultingContent),
            cache: gatsbyApis.cache,
            createNode: gatsbyApis.createNode,
            name: `${apiPath}${releaseVersion}/${getFileName(file)}`,
            createNodeId: gatsbyApis.createNodeId,
            ext: '.md',
          });
        })
      );

      navigationEntries.push(navigationEntry);

      return entries;
    })
  );

  return { navigationEntries };
}

module.exports = getApiDocsData;
