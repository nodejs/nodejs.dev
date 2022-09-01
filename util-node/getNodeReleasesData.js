const fetch = require('node-fetch');
const async = require('async');
const getReleaseStatus = require('./getReleaseStatus');
const { nodeReleaseData, nodeReleaseSchedule } = require('../apiUrls');

function getNodeReleasesData(nodeReleasesDataCallback) {
  const fetchNodeReleaseSchedule = callback => {
    fetch(nodeReleaseSchedule)
      .then(response => response.json())
      .then(releaseSchedule => callback(null, releaseSchedule));
  };

  const fetchNodeReleaseDetail = callback => {
    fetch(nodeReleaseData)
      .then(response => response.json())
      .then(releaseDetails => callback(null, releaseDetails));
  };

  const parseReleaseData = (_, results) => {
    const { releaseSchedule, releaseDetails } = results;

    const currentReleasesArray = [];

    const getNonEolReleases = key =>
      new Date(releaseSchedule[key].end) >= new Date();

    const mapReleaseData = key => {
      const release = releaseSchedule[key];

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

    const filteredReleasesData = Object.keys(releaseSchedule)
      .filter(getNonEolReleases)
      .map(mapReleaseData);

    const getReleaseDataFromNonEolReleases = release => {
      if (release && release.version) {
        const majorVersion = release.version.split('.')[0];

        return currentReleasesArray.includes(majorVersion);
      }

      return false;
    };

    const mappedReleasesDataDetail = releaseDetails
      .filter(getReleaseDataFromNonEolReleases)
      .map(release => ({ ...release, lts: release.lts || '' }))
      .slice(0, 50);

    nodeReleasesDataCallback({
      nodeReleasesDataDetail: mappedReleasesDataDetail,
      nodeReleasesData: filteredReleasesData,
    });
  };

  async.parallel(
    {
      releaseSchedule: fetchNodeReleaseSchedule,
      releaseDetails: fetchNodeReleaseDetail,
    },
    parseReleaseData
  );
}

module.exports = getNodeReleasesData;
