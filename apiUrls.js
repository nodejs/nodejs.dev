module.exports = {
  apiReleaseContents: releaseVersion =>
    `https://api.github.com/repos/nodejs/node/contents/doc/api?ref=${releaseVersion}`,
  nvmTags: 'https://api.github.com/repos/nvm-sh/nvm/tags',
  nodeReleaseSchedule:
    'https://raw.githubusercontent.com/nodejs/Release/main/schedule.json',
  nodeReleaseData: 'https://nodejs.org/dist/index.json',
  nodeBannersData:
    'https://raw.githubusercontent.com/nodejs/nodejs.org/main/site.json',
  jsonLink: (fileName, version) =>
    `https://nodejs.org/docs/latest-${version}.x/api/${fileName}.json`,
};
