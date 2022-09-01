const fetch = require('node-fetch');
const async = require('async');
const { createFileNodeFromBuffer } = require('gatsby-source-filesystem');

const createGitHubHeaders = require('./createGitHubHeaders');
const { createMarkdownParser } = require('./apiDocsTransformUtils');
const { apiReleaseContents } = require('../apiUrls');
const { apiPath } = require('../pathPrefixes');

const ignoredFiles = ['index.md', 'README.md'];

const getFileName = file => file.name.replace('.md', '');

const filterOutInvalidFiles = file =>
  !ignoredFiles.includes(file.name) && file.name.endsWith('.md');

async function getApiDocsData(releaseVersions, gatsbyApis, callback) {
  const navigationEntries = [];

  const apiDownloadListQueue = async.queue((fullReleaseVersion, cb) => {
    const pushToDocsQueue = files => {
      const markdownFiles = files.filter(filterOutInvalidFiles);
      const releaseVersion = fullReleaseVersion.split('.')[0];

      const navigationEntry = {
        version: releaseVersion,
        items: [],
      };

      const apiDocsParser = async.queue((file, dCb) => {
        const parseMarkdownCallback = contents => {
          gatsbyApis.docsTimer.setStatus(
            `Parsing API ${file.name}@${fullReleaseVersion}`
          );

          const { parseMarkdown, getNavigationEntries } = createMarkdownParser(
            contents,
            {
              name: getFileName(file),
              version: releaseVersion,
              fullVersion: fullReleaseVersion,
              downloadUrl: file.download_url,
            }
          );

          const resultingContent = parseMarkdown();

          navigationEntry.items.push(...getNavigationEntries());

          createFileNodeFromBuffer({
            buffer: Buffer.from(resultingContent),
            cache: gatsbyApis.cache,
            createNode: gatsbyApis.createNode,
            name: `${apiPath}${releaseVersion}/${getFileName(file)}`,
            createNodeId: gatsbyApis.createNodeId,
            ext: '.md',
          }).then(() => dCb());
        };

        fetch(file.download_url)
          .then(response => response.text())
          .then(contents => parseMarkdownCallback(contents));
      }, 8);

      // Add files to be Downloaded and Parsed to Text
      apiDocsParser.push([...markdownFiles]);

      // We finished processing all files for this release
      apiDocsParser.drain(() => {
        navigationEntries.push(navigationEntry);

        cb();
      });
    };

    // This fetches a JSON containing the metadata of the files within the API Folder
    // @see https://docs.github.com/en/rest/repos/contents#get-repository-content
    fetch(apiReleaseContents(fullReleaseVersion), createGitHubHeaders())
      .then(response => response.json())
      .then(files => pushToDocsQueue(files));
  }, 2);

  // Retrieves all the Lists of the Documentation files for that Node.js version
  apiDownloadListQueue.push(...releaseVersions);

  apiDownloadListQueue.drain(() => callback({ navigationEntries }));
}

module.exports = getApiDocsData;
