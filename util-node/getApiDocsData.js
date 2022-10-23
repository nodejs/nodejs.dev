const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const async = require('async');
const cliProgress = require('cli-progress');

const createGitHubHeaders = require('./createGitHubHeaders');
const { createMarkdownParser } = require('./apiDocsTransformUtils');
const { apiReleaseContents } = require('../apiUrls');
const { apiPath } = require('../pathPrefixes');

const ignoredFiles = ['index.md', 'README.md'];

const getFileName = file => file.name.replace('.md', '');

const filterOutInvalidFiles = file =>
  !ignoredFiles.includes(file.name) && file.name.endsWith('.md');

const progressBarOptions = {
  format:
    'Syncing API || {bar} {percentage}% || Remaining: {remaining} || Processing: {started} || Finished: {finished}',
};

async function getApiDocsData(releaseVersions, callback) {
  const progressBar = new cliProgress.SingleBar(
    progressBarOptions,
    cliProgress.Presets.shades_classic
  );

  let remainingFilesToParse = 0;

  // This creates an asynchronous queue that fetches the directory listing of the
  // /doc/api/ directory on the Node.js repository with the contents of a specific version (Git Tag)
  // Then the worker creates a new queue that dispatches a list of files (their metadata and the release version)
  const apiDownloadListQueue = async.queue((releaseData, cb) => {
    const pushToDocsQueue = files => {
      const markdownFiles = files.filter(filterOutInvalidFiles);

      const navigationEntry = {
        version: releaseData.version,
        items: [],
      };

      const currentVersionPath = path.resolve(
        __dirname,
        `../content${apiPath}${releaseData.version}/`
      );

      // Creates the API version directory if it doesn't exist
      if (!fs.existsSync(currentVersionPath)) {
        fs.mkdirSync(currentVersionPath);
      }

      // Here we create a new queue to parse each one of the Markdown files
      // We first iterate through the contents with mostly Regex and string interpolation instead of AST
      // As we don't want to overcomplicate things. There are definitel drawbacks of using ReGeX
      const apiDocsParser = async.queue((file, dCb) => {
        remainingFilesToParse += 1;

        progressBar.update({
          remaining: remainingFilesToParse,
          started: `${file.name}@${releaseData.version}`,
        });

        const parseMarkdownCallback = contents => {
          // We create a Markdown Parser that will be responsible of parsing the file
          // The parser includes utilities to create a Frontmatter, replace the YAML metadata
          // with JSX Components, fix URL links, update the Headings levels and many other small improvements
          const { parseMarkdown, getNavigationEntries } = createMarkdownParser(
            contents,
            {
              name: getFileName(file),
              version: releaseData.version,
              fullVersion: releaseData.fullVersion,
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
          return fsPromises.writeFile(currentFilePath, resultingContent, {
            encoding: 'utf8',
          });
        };

        const finishedItemCallback = () => {
          remainingFilesToParse -= 1;

          progressBar.update({
            remaining: remainingFilesToParse,
            finished: `${file.name}@${releaseData.version}`,
          });

          dCb();
        };

        fetch(file.download_url)
          .then(response => response.text())
          .then(parseMarkdownCallback)
          .finally(finishedItemCallback);
      }, 8);

      // Add files to be Downloaded and Parsed to Text
      apiDocsParser.push([...markdownFiles]);

      // We finished processing all files for this release
      apiDocsParser.drain(() => {
        const navigationDataPath = path.resolve(
          currentVersionPath,
          'navigation.json'
        );

        const sortedNavigationEntry = {
          ...navigationEntry,
          // Sorts the items alphabetically to avoid on every run having a different order
          // of the items, so that we keep consistency
          items: navigationEntry.items.sort((a, b) =>
            a.slug.localeCompare(b.slug)
          ),
        };

        progressBar.increment();

        fs.writeFile(
          navigationDataPath,
          // Stringifies and Pretty-Prints the JSON
          JSON.stringify(sortedNavigationEntry, null, 2),
          cb
        );
      });
    };

    // This fetches a JSON containing the metadata of the files within the API Folder
    // @see https://docs.github.com/en/rest/repos/contents#get-repository-content
    fetch(apiReleaseContents(releaseData.fullVersion), createGitHubHeaders())
      .then(response => response.json())
      .then(files => (Array.isArray(files) ? files : []))
      .then(pushToDocsQueue)
      .catch(cb);
  }, 2);

  progressBar.start(releaseVersions.length, 0, {
    remaining: 0,
    started: 'N/A',
    finished: 'N/A',
  });

  // Retrieves all the Lists of the Documentation files for that Node.js version
  apiDownloadListQueue.push([...releaseVersions]);

  // After the whole queue ends we call the callback with our Navigation entries
  apiDownloadListQueue.drain(() => {
    progressBar.stop();

    callback();
  });
}

module.exports = getApiDocsData;
