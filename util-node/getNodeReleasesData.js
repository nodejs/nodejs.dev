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
    const currentReleasesArray = [];

    const getNonEolReleases = key => {
      const release = releasesDataResult[key];
      return new Date(release.end) >= new Date();
    };

    const mapReleaseData = key => {
      const release = releasesDataResult[key];

      currentReleasesArray.push(key);

      return {
        endOfLife: release.end,
        maintenanceLTSStart: release.maintenance || '',
        activeLTSStart: release.lts || '',
        codename: release.codename || '',
        initialRelease: release.start,
        release: key,
        status: getReleaseStatus(release),
      };
    };

    const filteredReleasesData = Object.keys(releasesDataResult)
      .filter(getNonEolReleases)
      .map(mapReleaseData);

    const getReleaseDataFromNonEolReleases = release => {
      if (release && release.version) {
        const majorVersion = release.version.split('.')[0];

        return currentReleasesArray.includes(majorVersion);
      }

      return false;
    };

    const mappedReleasesDataDetail = releasesDataDetailResult
      .filter(getReleaseDataFromNonEolReleases)
      .map(release => ({ ...release, lts: release.lts || '' }))
      .slice(0, 50);

    return {
      nodeReleasesDataDetail: mappedReleasesDataDetail,
      nodeReleasesData: filteredReleasesData,
    };
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = getNodeReleasesData;
