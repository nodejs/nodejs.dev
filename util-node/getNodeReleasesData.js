const fetch = require('node-fetch');
const getReleaseStatus = require('./getReleaseStatus');

async function getNodeReleasesData() {
  try {
    const releasesDataDetailURL = 'https://nodejs.org/dist/index.json';
    const releasesDataURL =
      'https://raw.githubusercontent.com/nodejs/Release/main/schedule.json';

    const releasesDataDetailResponse = await fetch(releasesDataDetailURL);
    const releasesDataDetailResult = await releasesDataDetailResponse.json();

    const releasesDataResponse = await fetch(releasesDataURL);
    const releasesDataResult = await releasesDataResponse.json();

    const mappedReleasesDataDetail = releasesDataDetailResult
      .map(release => ({
        ...release,
        lts: release.lts || '',
      }))
      .slice(0, 50);

    const filteredReleasesData = Object.keys(releasesDataResult)
      .filter(key => {
        const release = releasesDataResult[key];
        const end = new Date(release.end);
        return end >= new Date();
      })
      .map(key => {
        const release = releasesDataResult[key];

        return {
          endOfLife: release.end,
          maintenanceLTSStart: release.maintenance || '',
          activeLTSStart: release.lts || '',
          codename: release.codename || '',
          initialRelease: release.start,
          release: key,
          status: getReleaseStatus(release),
        };
      });

    return {
      nodeReleasesDataDetail: mappedReleasesDataDetail,
      nodeReleasesData: filteredReleasesData,
    };
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = getNodeReleasesData;
