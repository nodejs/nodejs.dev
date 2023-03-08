const fs = require('fs');
const path = require('path');
const async = require('async');
const cliProgress = require('cli-progress');

const safeJSON = require('./safeJSON');
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
    'Syncing API || {bar} {percentage}% || Remaining: {remaining} || Processing: {started}',
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
  const getAllApiVersions = (releaseData, cb) => {
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

      const processMarkdownFile = (file, dCb) => {
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

          const parseMarkdownPromise = parseMarkdown();

          // eslint-disable-next-line no-console
          parseMarkdownPromise.catch(console.error);

          parseMarkdownPromise.then(resultingContent => {
            // Our Navigation Sidebar is generated from within the Markdown Parser
            // And it has a format that matches the <NavigationItem> type
            navigationEntry.items.push(...getNavigationEntries());

            const currentFilePath = path.resolve(
              currentVersionPath,
              // Creates the file path for English version of the file
              `${getFileName(file)}.en.md`
            );

            fs.writeFile(currentFilePath, resultingContent, () => {
              remainingFilesToParse -= 1;

              progressBar.update({ remaining: remainingFilesToParse });

              dCb();
            });
          });
        };

        fetch(file.download_url)
          .then(response => response.text())
          .then(parseMarkdownCallback)
          .catch(() => dCb());
      };

      const writeNavigationAfterSuccess = () => {
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
          safeJSON.toString(sortedNavigationEntry, null, 2),
          cb
        );
      };

      // This creates an asynchronous iteration stack that applies the callback (2nd argument) on all
      // the markdown files (1st argument) and then once all are processed it writes the navigation
      // index for the respective version of the API docs on the 3rd argument.
      async.each(
        markdownFiles,
        processMarkdownFile,
        writeNavigationAfterSuccess
      );
    };

    // This fetches a JSON containing the metadata of the files within the API Folder
    // @see https://docs.github.com/en/rest/repos/contents#get-repository-content
    fetch(apiReleaseContents(releaseData.fullVersion), createGitHubHeaders())
      .then(response => response.json())
      .then(files => (Array.isArray(files) ? files : []))
      .then(pushToDocsQueue)
      .catch(cb);
  };

  progressBar.start(releaseVersions.length, 0, {
    remaining: 0,
    started: 'N/A',
  });

  async.each(releaseVersions, getAllApiVersions, () => {
    progressBar.update({ started: 'N/A' });
    progressBar.stop();

    callback();
  });
}

module.exports = getApiDocsData;
