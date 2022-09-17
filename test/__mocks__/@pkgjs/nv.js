function nodeVersions() {
  return Promise.resolve([
    {
      codename: 'v0.8',
      endOfLife: '2014-07-31',
      initialRelease: '2012-06-25',
      isLts: false,
      ltsStart: '',
      maintenanceStart: '',
      fullVersion: 'v0.8',
      status: 'End-of-life',
      version: 'v0.8',
    },
    {
      codename: 'v0.10',
      endOfLife: '9999-01-01',
      initialRelease: '2013-03-11',
      isLts: false,
      ltsStart: '',
      maintenanceStart: '',
      fullVersion: 'v0.10',
      status: 'Current',
      version: 'v0.10',
    },
  ]);
}

module.exports = nodeVersions;
