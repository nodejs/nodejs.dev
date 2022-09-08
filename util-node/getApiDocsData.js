const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const async = require('async');

const createGitHubHeaders = require('./createGitHubHeaders');
const { createMarkdownParser } = require('./apiDocsTransformUtils');
const { apiReleaseContents } = require('../apiUrls');
const { apiPath } = require('../pathPrefixes');

const ignoredFiles = ['index.md', 'README.md'];

const getFileName = file => file.name.replace('.md', '');

const filterOutInvalidFiles = file =>
  !ignoredFiles.includes(file.name) && file.name.endsWith('.md');

async function getApiDocsData(releaseVersions, callback) {
  // This creates an asynchronous queue that fetches the directory listing of the
  // /doc/api/ directory on the Node.js repository with the contents of a specific version (Git Tag)
  // Then the worker creates a new queue that dispatches a list of files (their metadata and the release version)
  const apiDownloadListQueue = async.queue((fullReleaseVersion, cb) => {
    const pushToDocsQueue = files => {
      const markdownFiles = files.filter(filterOutInvalidFiles);
      const releaseVersion = fullReleaseVersion.split('.')[0];

      const navigationEntry = {
        version: releaseVersion,
        items: [],
      };

      const currentVersionPath = path.resolve(
        `./content${apiPath}${releaseVersion}/`
      );

      // Creates the API version directory if it doesn't exist
      if (!fs.existsSync(currentVersionPath)) {
        fs.mkdirSync(currentVersionPath);
      }

      // Here we create a new queue to parse each one of the Markdown files
      // We first iterate through the contents with mostly Regex and string interpolation instead of AST
      // As we don't want to overcomplicate things. There are definitel drawbacks of using ReGeX
      const apiDocsParser = async.queue((file, dCb) => {
        // eslint-disable-next-line no-console
        console.log(`Parsing: ${file.name}@${releaseVersion}`);

        const parseMarkdownCallback = contents => {
          // We create a Markdown Parser that will be responsible of parsing the file
          // The parser includes utilities to create a Frontmatter, replace the YAML metadata
          // with JSX Components, fix URL links, update the Headings levels and many other small improvements
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

          // Our Navigation Sidebar is generated from within the Markdown Parser
          // And it has a format that matches the <NavigationItem> type
          navigationEntry.items.push(...getNavigationEntries());

          const currentFilePath = path.resolve(
            currentVersionPath,
            // Creates the file path for English version of the file
            `${getFileName(file)}.en.md`
          );

          // Creates the File within the File System
          fs.writeFile(
            currentFilePath,
            resultingContent,
            { encoding: 'utf8' },
            dCb
          );
        };

        fetch(file.download_url)
          .then(response => response.text())
          .then(contents => parseMarkdownCallback(contents));
      }, 8);

      // Add files to be Downloaded and Parsed to Text
      apiDocsParser.push([...markdownFiles]);

      // We finished processing all files for this release
      apiDocsParser.drain(() => {
        const navigationDataPath = path.resolve(
          currentVersionPath,
          'navigation.json'
        );

        fs.writeFile(
          navigationDataPath,
          // Stringifies and Pretty-Prints the JSON
          JSON.stringify(navigationEntry, null, 2),
          cb
        );
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

  // After the whole queue ends we call the callback with our Navigation entries
  apiDownloadListQueue.drain(() => callback());
}

module.exports = getApiDocsData;
