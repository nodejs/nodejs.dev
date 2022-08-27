const fetch = require('node-fetch');

const isNvmTag = data => data && typeof data.name === 'string';
const areNvmTags = data => Array.isArray(data) && data.every(isNvmTag);

const getLatestNvmVersion = async () => {
  const nvmTagsResponse = await fetch(
    'https://api.github.com/repos/nvm-sh/nvm/tags'
  );

  const nvmTagsData = await nvmTagsResponse.json();

  if (!areNvmTags(nvmTagsData) || nvmTagsData.length === 0) {
    // GitHub might rate-limit and we don't want to block development because of that
    return { version: 'unknown' };
  }

  const [latestVersion] = nvmTagsData;
  return { version: latestVersion.name };
};

module.exports = getLatestNvmVersion;
