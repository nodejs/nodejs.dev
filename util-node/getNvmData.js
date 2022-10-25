const createGitHubHeaders = require('./createGitHubHeaders');
const { nvmTags } = require('../apiUrls');

const isNvmTag = data => data && typeof data.name === 'string';
const areNvmTags = data => Array.isArray(data) && data.every(isNvmTag);

function getLatestNvmVersion() {
  const parseNvmVersions = nvmTagsData => {
    if (!areNvmTags(nvmTagsData) || nvmTagsData.length === 0) {
      // GitHub might rate-limit and we don't want to block development because of that
      return { version: 'unknown' };
    }

    return { version: nvmTagsData[0].name };
  };

  return fetch(nvmTags, createGitHubHeaders())
    .then(response => response.json())
    .then(parseNvmVersions);
}

module.exports = getLatestNvmVersion;
