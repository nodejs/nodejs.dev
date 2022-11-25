const nodeVersions = require('@pkgjs/nv');
const path = require('path');
const async = require('async');
const fs = require('fs');
const getReleaseStatus = require('./getReleaseStatus');
const { nodeReleaseSchedule } = require('../apiUrls');
const { apiPath } = require('../pathPrefixes');

const apiDocsDirectory = path.resolve(__dirname, `../content${apiPath}`);

const availableApiVersions = fs
  .readdirSync(apiDocsDirectory, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

function getNodeReleasesData(nodeReleasesDataCallback) {
  const fetchNodeReleaseSchedule = callback => {
    fetch(nodeReleaseSchedule)
      .then(response => response.json())
      .then(releaseSchedule => callback(null, releaseSchedule));
  };

  const fetchNodeReleaseDetail = callback => {
    nodeVersions(['supported']).then(response => callback(null, response));
  };

  const formateReleaseDate = date =>
    date ? new Date(date).toISOString().split('T')[0] : '';

  const parseReleaseData = (_, results) => {
    const { releaseSchedule, releaseDetails } = results;

    const isReleaseCurrentlyLTS = release =>
      (new Date(release.lts) <= new Date() &&
        new Date(release.maintenance) >= new Date()) ||
      (getReleaseStatus(release) === 'Maintenance LTS' &&
        formateReleaseDate(release.end) >=
          new Date().toISOString().split('T')[0]);

    const mapReleaseData = key => {
      const release = releaseSchedule[key];

      return {
        fullVersion: key,
        version: key,
        codename: release.codename || key,
        isLts: release.lts
          ? isReleaseCurrentlyLTS(release)
          : getReleaseStatus(release) === 'Maintenance LTS' &&
            formateReleaseDate(release.end) >=
              new Date().toISOString().split('T')[0],
        status: getReleaseStatus(release),
        initialRelease: formateReleaseDate(release.start),
        ltsStart: formateReleaseDate(release.lts),
        maintenanceStart: formateReleaseDate(release.maintenance),
        endOfLife: formateReleaseDate(release.end),
      };
    };

    const mappedReleasesData = releaseDetails.map(release => ({
      fullVersion: `v${release.version}`,
      version: release.versionName,
      codename: release.codename,
      isLts: isReleaseCurrentlyLTS(release),
      status: getReleaseStatus(release),
      initialRelease: formateReleaseDate(release.start),
      ltsStart: formateReleaseDate(release.lts),
      maintenanceStart: formateReleaseDate(release.maintenance),
      endOfLife: formateReleaseDate(release.end),
    }));

    const removeDuplicatedScheduleEntries = version =>
      mappedReleasesData.every(entry => entry.version !== version);

    const filteredReleasesData = Object.keys(releaseSchedule)
      .filter(removeDuplicatedScheduleEntries)
      .map(mapReleaseData);

    mappedReleasesData.push(...filteredReleasesData);

    const sortedReleasesByRelease = mappedReleasesData.sort(
      (a, b) => new Date(a.initialRelease) - new Date(b.initialRelease)
    );

    sortedReleasesByRelease.reverse();

    nodeReleasesDataCallback({
      nodeReleasesData: sortedReleasesByRelease,
      apiAvailableVersions: availableApiVersions,
    });
  };

  const asyncTasks = {
    releaseSchedule: fetchNodeReleaseSchedule,
    releaseDetails: fetchNodeReleaseDetail,
  };

  // This creates a parallel worker pool with 2 workers that asynchronously fetches the different
  // API requests. And then it works towards parsing the data on `parseReleaseData`
  // When the data gets parsed, it gets returned as a callback to the `getNodeReleasesData` function
  async.parallel(asyncTasks, parseReleaseData, 2);
}

module.exports = getNodeReleasesData;
